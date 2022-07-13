import {
  ElementFinder,
  ILocators,
  WAITCONDITIONS,
  LocatorObject,
  ReturnElementType,
} from "../types";

import {
  LocatorsCache,
  CucumberLoggerService,
  StepDurationCalculator,
} from "../services";
import { Utils } from "./Utils";

const filePath = `src.lib.helper`;
const { convertToCamelcase, distance } = Utils.getInstance();
/**
 * Verifies attribute's value contains expected text
 * @method verifyAttrContains
 * @param elementDetails {ElementFinder} KeyName or type locatorDetails or an element object
 * @param attribute {string} attribute to be verfied on
 * @param expectedValue {string} value to be verified with
 * @param isWaitCall {boolean} is it being called from wait functions- then don't print the negative log
 * @return {Promise<boolean>} Promise<boolean>
 */
// export async function verifyAttrContains(
//   targetElement: ElementFinder,
//   attribute: string,
//   expectedValue: string,
//   isWaitCall: boolean
// ): Promise<boolean> {
//   let self = this;
//   if (!expectedValue && expectedValue != "") {
//     throw new Error("Please provide proper value of the attribute");
//   }
//   if (!attribute) {
//     throw new Error("Please provide attribute name to get value of it");
//   }
//   let attrValue: string = await targetElement.getAttribute(attribute);
//   let isContains: boolean = attrValue.includes(expectedValue);
//   if (isContains)
//     LoggerObject.logMessage(
//       "Attribute " +
//         attribute +
//         "'s value is '" +
//         attrValue +
//         "', contains expected text '" +
//         expectedValue +
//         "'"
//     );
//   else if (!isContains && !isWaitCall)
//     LoggerObject.logMessage(
//       "Attribute " +
//         attribute +
//         "'s value is '" +
//         attrValue +
//         "', doesn't contain expected text '" +
//         expectedValue +
//         "'"
//     );
//   return isContains;
// }

// /**
//  * Verifies attribute's value has expected text
//  * @method verifyAttrEquals
//  * @param elementDetails {ElementFinder} KeyName or type locatorDetails or an element object
//  * @param attribute {string} attribute to be verfied on
//  * @param expectedValue {string} value to be verified with
//  * @param isWaitCall {boolean} is it being called from wait functions- then don't print the negative log
//  * @return {Promise<boolean>} Promise<boolean>
//  */
// export async function verifyAttrEquals(
//   targetElement: ElementFinder,
//   attribute: string,
//   expectedValue: string,
//   isWaitCall: boolean
// ): Promise<boolean> {
//   let self = this;
//   if (!expectedValue && expectedValue != "") {
//     throw new Error("Please provide proper value of the attribute");
//   }
//   if (!attribute) {
//     throw new Error("Please provide attribute name to get value of it");
//   }
//   let attrValue: string = await targetElement.getAttribute(attribute);
//   let isEqual: boolean = attrValue === expectedValue;
//   if (isEqual)
//     LoggerObject.logMessage(
//       "Attribute " + attribute + "'s value is '" + attrValue + "' as expected"
//     );
//   else if (!isEqual && !isWaitCall)
//     LoggerObject.logMessage(
//       "Attribute " +
//         attribute +
//         "'s value is '" +
//         attrValue +
//         "', but expected '" +
//         expectedValue +
//         "'"
//     );
//   return isEqual;
// }

// /**
//  * Verifies whether the element is currently Present
//  * @method verifyElementPresent
//  * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
//  * @returns {Promise<boolean>} whether the element is currently present or not
//  */
// export async function verifyElementPresent(
//   ElementObject: Element,
//   elementDetails: string | locatorDetails | ElementFinder
// ): Promise<boolean> {
//   let element: ElementFinder;
//   if (isElementFinder(elementDetails)) element = elementDetails;
//   else element = await ElementObject.findElement(elementDetails);
//   return element.isExisting(element);
// }

// export function isElementFinder(arg) {
//   if (
//     !arg ||
//     typeof arg == "string" ||
//     (typeof arg == "object" && arg.locatorType && arg.locatorValue)
//   )
//     return false;
//   return true;
// }

const isStringArray = (arr: string[] | ElementFinder[]) =>
  arr.every((value) => typeof value === "string");

export function isElementFinder(
  arg: string | string[] | ElementFinder | ElementFinder[]
): boolean {
  if (
    !arg ||
    typeof arg === "string" ||
    (Array.isArray(arg) && isStringArray(arg))
  )
    return false;
  return true;
}

/** **********************************************************************************************
 *  @Description : Based on the value passed , return the stored page object
 *  @params : {pageObj} value passed
 *  @returns:  return the stored page object
 ************************************************************************************************ */
let findStoredObject = (obj: string): ILocators | null => {
  Logger.log(
    `${filePath}.findStoredObject : Look up for object post camelcasing in element repos - "${obj}"`
  );

  const found = LocatorsCache.getInstance().cachedLocators.get(obj);
  const log = found
    ? `Found Object - ${JSON.stringify(found, null, 4)}`
    : "No entry found in the locators repo";
  Logger.log(`${filePath}.findStoredObject : ${log}`);
  return found ? { ...found } : null;
};

/** **********************************************************************************************
 * @Description : Replace values as passed in placeolder fields in locators
 *********************************************************************************************** */
export const replaceTextsInLocators = (
  locatorString: string,
  replaceText: (string | number)[] | string | number | object
) => {
  Logger.log(
    `${filePath}.replaceTextsInLocators : Replace text in locator - ${locatorString} with - ${replaceText}`
  );
  let locatorModified = locatorString;
  if (typeof replaceText === "string" || typeof replaceText === "number") {
    Logger.log(
      `${filePath}.replaceTextsInLocators : Replace text in locator fir replace text type - ${typeof replaceText}`
    );
    locatorModified = locatorString.replace("replaceText", String(replaceText));
  } else if (typeof replaceText === "object" && !Array.isArray(replaceText)) {
    Logger.log(
      `${filePath}.replaceTextsInLocators : Replace text in locator fir replace text type - Object`
    );
    Object.keys(replaceText).forEach((key: string) => {
      locatorModified = locatorModified.replace(key, (replaceText as any)[key]);
    });
  } else if (Array.isArray(replaceText)) {
    Logger.log(
      `${filePath}.replaceTextsInLocators : Replace text in locator fir replace text type - Array`
    );
    for (let i = 0; i < replaceText.length; i++) {
      locatorModified = locatorModified.replace("replaceText", () =>
        String(replaceText[i])
      );
    }
  }
  Logger.log(
    `${filePath}.replaceTextsInLocators : Replaced text. Modified locator - ${locatorModified}`
  );
  return locatorModified;
};

/** **********************************************************************************************
 *  @Description : Based on the value passed , return the stored page object
 *  @params : {pageObj} value passed
 *  @returns:  return the stored page object
 *********************************************************************************************** */
export const getStoredObjectsJSFiles = (args: any): LocatorObject[] => {
  Logger.log(
    `${filePath}.getStoredObjectsJSFiles : Passed object before resolving duplication, if any - "${args.pageObject}"`
  );
  Logger.log(
    `${filePath}.getStoredObjectsJSFiles : Passed object before camelcasing - "${args.pageObject}"`
  );
  const obj = convertToCamelcase(args.pageObject as string);
  let foundObject: ILocators | null = findStoredObject(obj);

  if (foundObject && foundObject.locator && foundObject.locator.length) {
    for (let locatorObj of foundObject.locator) {
      if (args.replaceText) {
        locatorObj.locatorValue = replaceTextsInLocators(
          locatorObj.locatorValue as string,
          args.replaceText
        );
      }
    }
  } else {
    foundObject = {
      locator: args.pageObject,
      description: "using xpath directly as passed",
    };
  }
  return foundObject.locator;
};

export const shouldAutoScroll = (waitCondition: WAITCONDITIONS) => {
  Logger.log(
    `${filePath}.shouldAutoScroll : Check if auto scroll when wait condition is ${waitCondition}`
  );
  const waitConditionsToScroll = [
    WAITCONDITIONS.PRESENCEOF,
    WAITCONDITIONS.ELEMENTTOBECLICKABLE,
    WAITCONDITIONS.ELEMENTTOBESELECTED,
    WAITCONDITIONS.TEXTNOTPRESENTINELEMENT,
    WAITCONDITIONS.TEXTTOBEPRESENTINELEMENTVALUE,
    WAITCONDITIONS.VISIBILITYOF,
    WAITCONDITIONS.ELEMENTTOBEENABLED,
  ];
  const shouldAutoScrollToObj =
    waitConditionsToScroll.includes(waitCondition) || false;
  Logger.log(
    `${filePath}.shouldAutoScroll : Should auto scroll result - ${shouldAutoScrollToObj}`
  );
  return shouldAutoScrollToObj;
};

export const halvedWaitConditionTime = (time: number) =>
  time ? time / 2 : time;

export const logMultiLocatorTries = (
  elementMetadata: ReturnElementType,
  logName: string
) => {
  const workingLocator = JSON.stringify(
    {
      locatorName: elementMetadata.name,
      locatorType: elementMetadata.locatorType,
      locatorValue: elementMetadata.locatorValue,
    },
    null,
    4
  );

  const logMessage = `${logName} Step auto corrected : \n Worked locator details : ${workingLocator}\nFailed locator details : ${JSON.stringify(
    Object.values(elementMetadata.err),
    null,
    4
  )} `;
  CucumberLoggerService.getInstance().setMessage(logMessage);
  Logger.log(`${filePath}.logMultiLocatorTries : ${logMessage}`);
};

export const logLocatorsOnTimeout = (
  elementMetadata: ReturnElementType,
  logName: string
) => {
  const logMessage = `${logName} Step timeout. \nFailed locator details : ${JSON.stringify(
    Object.values(elementMetadata.err),
    null,
    4
  )} `;
  CucumberLoggerService.getInstance().setMessage(logMessage);
  Logger.log(`${filePath}.logMultiLocatorTries : ${logMessage}`);
};

export const setTimedOutStatus = () => {
  const configStepTimeOut: number = (browser.config as WebdriverIO.Config)[
    "cucumberOpts"
  ]!["timeout"] as number;
  const startTime = StepDurationCalculator.getInstance()
    .getDateTime()
    .getTime();

  const maxWaitTimeInstance = StepDurationCalculator.getInstance();
  maxWaitTimeInstance.setActionDateTime();
  const maxWaitTime = maxWaitTimeInstance.getActionDateTime().getTime();

  let stepDistance = distance(maxWaitTime, startTime, configStepTimeOut);
  let actionDistance = distance(
    maxWaitTime,
    startTime,
    StepDurationCalculator.getInstance().getActionWaitConditionTime()
  );
  Logger.log(
    `${filePath}.setTimedOutStatus : Step and action distances are ${stepDistance}ms and ${actionDistance}ms respectively.`
  );
  if (actionDistance <= 0 || stepDistance <= 10000) {
    Logger.log(
      `${filePath}.setTimedOutStatus : Stopping step as the time distances are to expire ${JSON.stringify(
        { actionDistance, stepDistance },
        null,
        4
      )}`
    );
    StepDurationCalculator.getInstance().setStopStep(true);
  } else {
    StepDurationCalculator.getInstance().setStopStep(false);
  }
};

// export const setTimedOutStatus = () => {
