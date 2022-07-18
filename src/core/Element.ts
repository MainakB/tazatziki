import {ExceptionHandler} from './ExceptionHandler';
import {
  IAutoScroll,
  LocatorObject,
  IFindElement,
  IGetElementExpectedCondition,
  Types,
  ReturnElementType,
} from '../types';
import {
  getStoredObjectsJSFiles,
  shouldAutoScroll,
  CircularLinkedList,
  isElementFinder,
  halvedWaitConditionTime,
  logMultiLocatorTries,
  setTimedOutStatus,
  Utils,
} from '../lib';
// import { Assertion } from "./Assertions";

import {StepDurationCalculator, Logger} from '../services';

import {GLOBALFLAGS} from '../constants';
import {ExplicitWaits} from './ExplicitWaits';

export class Element extends ExceptionHandler {
  private static _instance: Element;

  private fileName: string;

  private utils: Utils;
  // Assertion: Assertion;

  private constructor() {
    super();
    this.fileName = 'core.Element';
    this.utils = Utils.getInstance();
  }

  static getInstance() {
    if (!Element._instance) {
      Element._instance = new Element();
    }
    return Element._instance;
  }

  private async toLocatorDetails(args: IFindElement): Promise<LocatorObject[]> {
    Logger.log(`${this.fileName}.toLocatorDetails : Get stored object details.`);
    const locatorObjectRetrieved: LocatorObject[] = await getStoredObjectsJSFiles(args);
    if (!locatorObjectRetrieved) {
      throw new Error('Please provide valid element details');
    }
    Logger.log(`${this.fileName}.toLocatorDetails : Returning stored object details.`);
    return locatorObjectRetrieved;
  }

  async getElementObject(locatorType: string, locatorValue: string | Function): Promise<WebdriverIO.Element> {
    Logger.log(`${this.fileName}.getElementObject : Get element object.`);
    switch (locatorType) {
      case Types.LocatorTypes.ID:
        return $(`#${locatorValue}`);
      case Types.LocatorTypes.NAME:
        return $(`*[name="${locatorValue as string}"]`);
      case Types.LocatorTypes.CLASSNAME:
        return $(`.${locatorValue as string}`);
      case Types.LocatorTypes.XPATH:
      case Types.LocatorTypes.TAGNAME:
      case Types.LocatorTypes.CSS:
        return $(locatorValue as string);
      case Types.LocatorTypes.LINKTEXT:
        return $(`=${locatorValue as string}`);
      case Types.LocatorTypes.PARTIALLINKTEXT:
        return $(`*=${locatorValue as string}`);
      case Types.LocatorTypes.BUTTONTEXT:
        return $(`button=${locatorValue as string}`);
      case Types.LocatorTypes.PARTIALBUTTONTEXT:
        return $(`button*=${locatorValue as string}`);
      case Types.LocatorTypes.DEEPCSS:
        return $(`>>>${locatorValue as string}`);
      // case Types.LocatorTypes.JS:
      //   return $(locatorValue as Function);
      default:
        return $(locatorValue as string);
    }
  }

  async checkState(fn: any, msg: string) {
    Logger.log(`${this.fileName}.checkState : Check state of an object as per tghe wait condition retrieved.`);
    await setTimedOutStatus();
    const bool = await StepDurationCalculator.getInstance().getStopStep();
    if (bool) {
      throw new Error(`WaitTimedOut_${msg}`);
    }
    const waitValue = await fn();
    if (waitValue) {
      return true;
    } 
      return false;
    
  }

  /**
   * @description Perform auto scrolls
   */
  async autoScroll(params: IAutoScroll) {
    const self: this = this;
    const loggerPrefix = `${self.fileName}.autoScroll :`;
    Logger.log(`${loggerPrefix} Perform auto scroll`);

    const waitConditionTimeCalculated = (() => params.waitCondition === Types.WAITCONDITIONS.PRESENCEOF
        ? params.waitConditionTime || GLOBALFLAGS.WAITCONDITIONTIMEOUTACTIONS
        : (() => params.waitConditionTime || ~~(GLOBALFLAGS.WAITCONDITIONTIMEOUTACTIONS / 2))())();
    try {
      const waitConditionReturnedForScroll = await ExplicitWaits.getWaitConditions({
        ...params,
        waitConditionTime: waitConditionTimeCalculated,
        waitCondition: Types.WAITCONDITIONS.PRESENCEOF,
      });

      Logger.log(`${loggerPrefix} Check for presence of element ${waitConditionReturnedForScroll[1]}`);
      await browser.waitUntil(
        // waitConditionReturnedForScroll[0],
        async () => {
          const returnedState = await self.checkState(
            waitConditionReturnedForScroll[0],
            waitConditionReturnedForScroll[2]
          );
          return returnedState;
        },
        {
          timeout: waitConditionReturnedForScroll[1],
          timeoutMsg: waitConditionReturnedForScroll[2],
        }
      );

      if (params.autoScrollType === 'center') {
        Logger.log(`${loggerPrefix} Scroll type is Center scroll.`);
        await browser.execute('arguments[0].scrollIntoView({block: "center", inline: "nearest"})', params.element);
      } else {
        Logger.log(`${loggerPrefix} Scroll type is Bottom scroll.`);
        await browser.execute('arguments[0].scrollIntoView(false)', params.element);
      }

      Logger.log(`${loggerPrefix} Scrolled to element of current context`);
      return true;
    } catch (ex) {
      Logger.log(`${loggerPrefix} Auto Scroll failed because of - ${(<Error>ex).message}`);
      return super.catchException(ex, async () =>
        self.autoScroll({
          ...params,
          waitConditionTime: halvedWaitConditionTime(waitConditionTimeCalculated),
        })
      );
    }
  }

  async findElement(args: IFindElement): Promise<WebdriverIO.Element> {
    const self: this = this;
    const configStepTimeOut: number = (browser.config as WebdriverIO.Config).cucumberOpts?.timeout!;
    args = {
      ...args,
      waitConditionTime:
        (args.waitConditionTime && args.waitConditionTime < configStepTimeOut ? args.waitConditionTime : null) ||
        GLOBALFLAGS.WAITCONDITIONTIMEOUTACTIONS,
    };

    await StepDurationCalculator.getInstance().setActionWaitConditionTime(args.waitConditionTime || 0);

    let returnedElem;
    try {
      const loggerPrefix = `${self.fileName}.findElement :`;

      let returnElement: ReturnElementType = {
        element: null,
        err: {},
        locatorType: null,
        locatorValue: null,
        name: null,
      };
      if (isElementFinder(args.pageObject)) {
        return args.pageObject;
      }

      const elementObjectList: LocatorObject[] = await self.toLocatorDetails(args);

      const elementObjectLinkedList = new CircularLinkedList();
      for (const elementObject of elementObjectList) {
        elementObjectLinkedList.append(elementObject);
      }
      let current = elementObjectLinkedList.getHead();

      self.enteredDateTime = new Date();

      while (current.next) {
        const {locatorType} = current.element;
        const {locatorValue} = current.element;

        const locatorToCheck: WebdriverIO.Element = await self.getElementObject(locatorType, locatorValue);

        returnedElem = await self.getElementByExpectedCondition({
          element: locatorToCheck,
          elementDetails: current.element,
          // waitConditionTime: args.waitConditionTime,
          waitConditionTime: 3000,
          waitCondition: args.waitCondition,
          oElementText: 'oElementText',
        });

        if (returnedElem.element) {
          returnElement = {
            ...returnElement,
            element: returnedElem.element,
            locatorType,
            locatorValue: locatorValue as string,
            name: args.pageObject,
          };
          break;
        } else {
          returnElement.element = returnedElem.element;
          returnElement.err = {
            ...returnElement.err,
            [this.utils.crypt(locatorValue as string, locatorType)]: {
              locatorValue,
              locatorType,
              errMessage: returnedElem.err.message,
            },
          };

          if (returnedElem.err.message.includes('WaitTimedOut_')) {
            break;
          }
          current = current.next;
        }
      }
      if (!returnElement.element) {
        throw Error(
          `${loggerPrefix} Find element failed with error ${JSON.stringify(Object.values(returnElement.err), null, 4)}`
        );
      }

      if (Object.values(returnElement.err).length) logMultiLocatorTries(returnElement, loggerPrefix);

      return returnElement.element;
    } catch (ex) {
      return super.catchException(ex, async () =>
        self.findElement({
          ...args,
          waitConditionTime: halvedWaitConditionTime(args.waitConditionTime!),
        })
      );
    }
  }

  /**
   *
   * Provides an Element based on the expected condition provided by user.
   * @private getElementByExpectedCondition
   * @param {ElementFinder} element
   * @param {(string | locatorDetails)} elementDetails
   * @param {number} [oTimeWait]
   * @param {ElementExpectedCondition} [oElementExpectedCondition] Expected condition to check on the element
   * @param {string} [oElementText] expected Text for expected condition textToBePresentInElementValue and textToBePresentInElement
   * @returns {Promise<ElementFinder>}
   */

  private async getElementByExpectedCondition(args: IGetElementExpectedCondition): Promise<
    | {
        element: WebdriverIO.Element;
        err: any;
      }
    | {
        element: null;
        err: any;
      }
  > {
    const loggerPrefix = `${this.fileName}.getElementByExpectedCondition :`;
    const self: this = this;
    try {
      const {element, waitCondition} = args;

      const shouldScrollAuto = shouldAutoScroll(waitCondition!);
      if (shouldScrollAuto) {
        await self.autoScroll(args);
      }

      if (waitCondition !== Types.WAITCONDITIONS.PRESENCEOF) {
        const waitConditionReturned = await ExplicitWaits.getWaitConditions(args);

        await browser.waitUntil(
          // waitConditionReturned[0],
          async () => {
            const returnState = await self.checkState(waitConditionReturned[0], waitConditionReturned[2]);
            return returnState;
          },
          {
            timeout: waitConditionReturned[1],
            timeoutMsg: waitConditionReturned[2],
          }
        );
      }

      Logger.log(`${loggerPrefix} Wait condition passed`);
      return {element, err: null};
    } catch (err) {
      Logger.log(`${loggerPrefix} Wait condition not passed`);
      return {element: null, err};
    }
  }
}

/**
 * An expectation for waiting and returning an element that is present on the DOM of a page and visible
 * @method getVisibleElement
 * @param elementDetails {string | locatorDetails}
 * @param oTextToReplace {string} Optional text to replace for dynamic locator
 * @param oTimeWait {number} Optional element time wait
 * @returns {Promise<ElementFinder | ElementFinder[]>}
 */
//   async getVisibleElement(
//     elementDetails: string | locatorDetails,
//     oTextToReplace?: string | object,
//     oTimeWait?: number
//   ): Promise<ElementFinder | ElementFinder[]> {
//     let self: this = this;
//     if (!elementDetails) {
//       throw new Error("Please provide Element Details");
//     }
//     try {
//       if (oTimeWait === undefined || oTimeWait === 0) {
//         let config = await browser.config;
//         oTimeWait = (await config["elementTimeWait"]) || self.waitTime;
//       }
//       let element: ElementFinder = await self.findElement(
//         elementDetails,
//         oTextToReplace
//       );
//       await browser.waitUntil(EC.visibilityOf(element), {
//         timeout: oTimeWait,
//       });
//       let elementSize = await element.getWebElement().getSize();
//       if (elementSize.width > 0 && elementSize.height > 0) {
//         return element;
//       } else
//         throw new Error("Element not found with the provided element details");
//     } catch (ex) {
//       return super.catchException(
//         ex,
//         async () =>
//           await self.getVisibleElement(
//             elementDetails,
//             oTextToReplace,
//             oTimeWait
//           )
//       );
//     }
//   }

//   elementDetails: string | locatorDetails | ILocators,
//   oTextToReplace?: string | object,
//   oTimeWait?: number,
//   oElementExpectedCondition?: ElementExpectedCondition,
//   oElementText?: string

/**
 * An expectation to wait and return the element if it is visible on DOM
 * @param elementDetails {string | locatorDetails}
 * @param oTextToReplace {string | object} Optional text  or object with key and value to replace for dynamic locator
 * @param oTimeWait {number} Optional element time wait
 * @param {ElementExpectedCondition} [oElementExpectedCondition] Expected condition to check on the element
 * @param {string} [oElementText] expected Text for expected condition textToBePresentInElementValue and textToBePresentInElement
 * @returns {Promise<ElementFinder | ElementFinder[]>}
 */
//   async getElement(args: FindElement): Promise<ElementFinder> {
//     let self: this = this;

//     let element: WebdriverIO.Element = await self.findElement(args);
//     try {
//       if (!oTimeWait || oTimeWait === 0) {
//         let config = await browser.config;
//         oTimeWait = (await config["elementTimeWait"]) || self.waitTime;
//       }
//       await self.getElementByExpectedCondition(
//         element,
//         elementDetails,
//         oTimeWait,
//         oElementExpectedCondition,
//         oElementText
//       );
//       return element;
//     } catch (exception) {
//       return super.catchException(
//         exception,
//         async () =>
//           await self.getElement(
//             elementDetails,
//             oTextToReplace,
//             oTimeWait,
//             oElementExpectedCondition,
//             oElementText
//           )
//       );
//     }
//   }

/**
 * An expectation to wait and return the elements matching locator if it is visible on DOM
 * @method getElements
 * @param elementDetails {string | locatorDetails}
 * @param oTextToReplace {string} Optional text to replace for dynamic locator
 * @param oTimeWait {number} Optional element time wait
 * @param {ElementExpectedCondition} [oElementExpectedCondition] Expected condition to check on the element
 * @param {string} [oElementText] expected Text for expected condition textToBePresentInElementValue and textToBePresentInElement
 * @returns {Promise<ElementFinder | ElementFinder[]>}
 */
//   async getElements(
//     elementDetails: string | locatorDetails,
//     oTextToReplace?: string | object,
//     oTimeWait?: number,
//     oElementExpectedCondition?: ElementExpectedCondition,
//     oElementText?: string
//   ): Promise<ElementFinder[]> {
//     let self: this = this,
//       elementsMetEC: ElementFinder[] = [],
//       elementsNotMetECcount: number = 0;
//     if (!elementDetails) {
//       throw new Error("Please provide Element Details");
//     }
//     let elements: ElementFinder[] = await self.findElements(
//       elementDetails,
//       oTextToReplace
//     );
//     try {
//       if (!oTimeWait || oTimeWait === 0) {
//         let config = await browser.config;
//         oTimeWait = (await config["elementTimeWait"]) || self.waitTime;
//       }
//       for (let index = 0; index < elements.length; index++) {
//         try {
//           await self.getElementByExpectedCondition(
//             elements[index],
//             elementDetails,
//             oTimeWait,
//             oElementExpectedCondition,
//             oElementText
//           );
//           elementsMetEC.push(elements[index]);
//         } catch (ex) {
//           self.Logger.logMessage(ex);
//           elementsNotMetECcount += 1;
//         }
//       }
//       if (elementsNotMetECcount > 0)
//         self.Logger.logMessage(
//           "There are " +
//             elementsNotMetECcount +
//             " elements that didn't meet the expected condition"
//         );
//       return elementsMetEC;
//     } catch (ex) {
//       return super.catchException(
//         ex,
//         async () =>
//           await self.getElements(
//             elementDetails,
//             oTextToReplace,
//             oTimeWait,
//             oElementExpectedCondition,
//             oElementText
//           )
//       );
//     }
//   }
