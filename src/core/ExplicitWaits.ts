/* eslint no-useless-constructor: "warn" */
import * as EC from 'wdio-wait-for';
import {GLOBALFLAGS} from '../constants';
import {Types, IEvaluateWait} from '../types';
import {Logger} from '../services';

const filePath = 'src.core.ExplicitWaits';

export class ExplicitWaits {
  private constructor(private name: string) {}

  public static VISIBILITYOF = new ExplicitWaits(Types.WAITCONDITIONS.VISIBILITYOF);

  public static PRESENCEOF = new ExplicitWaits(Types.WAITCONDITIONS.PRESENCEOF);

  public static ELEMENTTOBEENABLED = new ExplicitWaits(Types.WAITCONDITIONS.ELEMENTTOBEENABLED);

  public static TEXTTOBEPRESENTINELEMENT = new ExplicitWaits(Types.WAITCONDITIONS.TEXTTOBEPRESENTINELEMENT);

  public static TEXTTOBEPRESENTINELEMENTVALUE = new ExplicitWaits(Types.WAITCONDITIONS.TEXTTOBEPRESENTINELEMENTVALUE);

  public static ELEMENTTOBECLICKABLE = new ExplicitWaits(Types.WAITCONDITIONS.ELEMENTTOBECLICKABLE);

  public static URLCONTAINS = new ExplicitWaits(Types.WAITCONDITIONS.URLCONTAINS);

  public static URLIS = new ExplicitWaits(Types.WAITCONDITIONS.URLIS);

  public static ALERTISPRESENT = new ExplicitWaits(Types.WAITCONDITIONS.ALERTISPRESENT);

  public static TITLECONTAINS = new ExplicitWaits(Types.WAITCONDITIONS.TITLECONTAINS);

  public static TITLEIS = new ExplicitWaits(Types.WAITCONDITIONS.TITLEIS);

  public static STALENESSOF = new ExplicitWaits(Types.WAITCONDITIONS.STALENESSOF);

  public static ELEMENTTOBESELECTED = new ExplicitWaits(Types.WAITCONDITIONS.ELEMENTTOBESELECTED);

  public static ABSENCEOF = new ExplicitWaits(Types.WAITCONDITIONS.ABSENCEOF);

  public static TEXTNOTPRESENTINELEMENT = new ExplicitWaits(Types.WAITCONDITIONS.TEXTNOTPRESENTINELEMENT);

  public static TEXTNOTPRESENTINELEMENTVALUE = new ExplicitWaits(Types.WAITCONDITIONS.TEXTNOTPRESENTINELEMENTVALUE);

  public static ELEMENTNOTCLICKABLE = new ExplicitWaits(Types.WAITCONDITIONS.ELEMENTNOTCLICKABLE);

  public static URLDOESNOTCONTAIN = new ExplicitWaits(Types.WAITCONDITIONS.URLDOESNOTCONTAIN);

  public static URLISNOT = new ExplicitWaits(Types.WAITCONDITIONS.URLISNOT);

  public static ALERTISNOTPRESENT = new ExplicitWaits(Types.WAITCONDITIONS.ALERTISNOTPRESENT);

  public static TITLEDOESNOTCONTAIN = new ExplicitWaits(Types.WAITCONDITIONS.TITLEDOESNOTCONTAIN);

  public static TITLEISNOT = new ExplicitWaits(Types.WAITCONDITIONS.TITLEISNOT);

  public static NOTSTALENESSOF = new ExplicitWaits(Types.WAITCONDITIONS.NOTSTALENESSOF);

  public static ELEMENTNOTSELECTED = new ExplicitWaits(Types.WAITCONDITIONS.ELEMENTNOTSELECTED);

  public static INVISIBILITYOF = new ExplicitWaits(Types.WAITCONDITIONS.INVISIBILITYOF);

  public static AND = new ExplicitWaits(Types.WAITCONDITIONS.AND);

  public static getWaitConditions(params: IEvaluateWait): Promise<any[]> {
    const {waitCondition} = params;
    Logger.log(`${filePath}.getWaitConditions : Evaluate Wait condition for ${waitCondition}`);

    if (ExplicitWaits.VISIBILITYOF.is(waitCondition!)) return ExplicitWaits.VISIBILITYOF.returnWait(params);
    if (ExplicitWaits.PRESENCEOF.is(waitCondition!)) return ExplicitWaits.PRESENCEOF.returnWait(params);
    if (ExplicitWaits.ELEMENTTOBEENABLED.is(waitCondition!)) return ExplicitWaits.ELEMENTTOBEENABLED.returnWait(params);
    if (ExplicitWaits.TEXTTOBEPRESENTINELEMENT.is(waitCondition!))
      return ExplicitWaits.TEXTTOBEPRESENTINELEMENT.returnWait(params);
    if (ExplicitWaits.TEXTTOBEPRESENTINELEMENTVALUE.is(waitCondition!))
      return ExplicitWaits.TEXTTOBEPRESENTINELEMENTVALUE.returnWait(params);
    if (ExplicitWaits.ELEMENTTOBECLICKABLE.is(waitCondition!))
      return ExplicitWaits.ELEMENTTOBECLICKABLE.returnWait(params);
    if (ExplicitWaits.URLCONTAINS.is(waitCondition!)) return ExplicitWaits.VISIBILITYOF.returnWait(params);
    if (ExplicitWaits.URLIS.is(waitCondition!)) return ExplicitWaits.URLIS.returnWait(params);
    if (ExplicitWaits.ALERTISPRESENT.is(waitCondition!)) return ExplicitWaits.ALERTISPRESENT.returnWait(params);
    if (ExplicitWaits.TITLECONTAINS.is(waitCondition!)) return ExplicitWaits.TITLECONTAINS.returnWait(params);
    if (ExplicitWaits.TITLEIS.is(waitCondition!)) return ExplicitWaits.TITLEIS.returnWait(params);
    if (ExplicitWaits.STALENESSOF.is(waitCondition!)) return ExplicitWaits.STALENESSOF.returnWait(params);
    if (ExplicitWaits.ELEMENTTOBESELECTED.is(waitCondition!))
      return ExplicitWaits.ELEMENTTOBESELECTED.returnWait(params);
    if (ExplicitWaits.ABSENCEOF.is(waitCondition!)) return ExplicitWaits.ABSENCEOF.returnWait(params);
    if (ExplicitWaits.TEXTNOTPRESENTINELEMENT.is(waitCondition!))
      return ExplicitWaits.TEXTNOTPRESENTINELEMENT.returnWait(params);
    if (ExplicitWaits.TEXTNOTPRESENTINELEMENTVALUE.is(waitCondition!))
      return ExplicitWaits.TEXTNOTPRESENTINELEMENTVALUE.returnWait(params);
    if (ExplicitWaits.ELEMENTNOTCLICKABLE.is(waitCondition!))
      return ExplicitWaits.ELEMENTNOTCLICKABLE.returnWait(params);
    if (ExplicitWaits.URLDOESNOTCONTAIN.is(waitCondition!)) return ExplicitWaits.URLDOESNOTCONTAIN.returnWait(params);
    if (ExplicitWaits.URLISNOT.is(waitCondition!)) return ExplicitWaits.URLISNOT.returnWait(params);
    if (ExplicitWaits.ALERTISNOTPRESENT.is(waitCondition!)) return ExplicitWaits.ALERTISNOTPRESENT.returnWait(params);
    if (ExplicitWaits.TITLEDOESNOTCONTAIN.is(waitCondition!))
      return ExplicitWaits.TITLEDOESNOTCONTAIN.returnWait(params);
    if (ExplicitWaits.TITLEISNOT.is(waitCondition!)) return ExplicitWaits.TITLEISNOT.returnWait(params);
    if (ExplicitWaits.NOTSTALENESSOF.is(waitCondition!)) return ExplicitWaits.NOTSTALENESSOF.returnWait(params);
    if (ExplicitWaits.ELEMENTNOTSELECTED.is(waitCondition!)) return ExplicitWaits.ELEMENTNOTSELECTED.returnWait(params);
    if (ExplicitWaits.INVISIBILITYOF.is(waitCondition!)) return ExplicitWaits.INVISIBILITYOF.returnWait(params);

    throw new Error(`Unknown wait condition ${waitCondition}`);
  }

  public toString(): string {
    return this.name;
  }

  public is(value: string | string[]): boolean {
    return this.name === value;
  }

  public async returnWait(params: IEvaluateWait): Promise<any[]> {
    const {element, oElementText} = params;
    const waitConditionTime = params.waitConditionTime || GLOBALFLAGS.WAITCONDITIONTIMEOUTACTIONS;
    Logger.log(`${filePath}.returnWait: Evaluate Wait condition - ${this.name} for ${element}`);
    let returnValue: any[];

    switch (this.name) {
      case Types.WAITCONDITIONS.VISIBILITYOF:
        returnValue = [EC.visibilityOf(element), waitConditionTime, `Expected element not visible in the page.`];
        break;
      case Types.WAITCONDITIONS.INVISIBILITYOF:
        returnValue = [EC.invisibilityOf(element), waitConditionTime, `Expected element not invisible in the page.`];
        break;
      case Types.WAITCONDITIONS.PRESENCEOF:
        returnValue = [EC.presenceOf(element), waitConditionTime, `Expected element not present in the page.`];
        break;
      case Types.WAITCONDITIONS.ELEMENTTOBEENABLED:
        returnValue = [EC.elementToBeEnabled(element), waitConditionTime, `Expected element not enabled in the page.`];
        break;
      case Types.WAITCONDITIONS.TEXTTOBEPRESENTINELEMENT:
        returnValue = [
          EC.textToBePresentInElement(element, oElementText!),
          waitConditionTime,
          `Expected text ${oElementText} not present`,
        ];
        break;
      case Types.WAITCONDITIONS.TEXTTOBEPRESENTINELEMENTVALUE:
        returnValue = [
          EC.textToBePresentInElementValue(element, oElementText!),
          waitConditionTime,
          `Expected text ${oElementText} not present`,
        ];
        break;
      case Types.WAITCONDITIONS.ELEMENTTOBECLICKABLE:
        returnValue = [EC.elementToBeClickable(element), waitConditionTime, `Element not clickable`];
        break;
      case Types.WAITCONDITIONS.URLCONTAINS:
        returnValue = [EC.urlContains(element), waitConditionTime, `Expected Url not loaded`];
        break;
      case Types.WAITCONDITIONS.URLIS:
        returnValue = [EC.urlIs(element), waitConditionTime, `Expected Url not loaded`];
        break;
      case Types.WAITCONDITIONS.ALERTISPRESENT:
        returnValue = [EC.alertIsPresent(), waitConditionTime, `Expected Alert not present`];
        break;
      case Types.WAITCONDITIONS.TITLECONTAINS:
        returnValue = [
          EC.titleContains(element),
          waitConditionTime,
          `Title does not contain the expected value - ${element}`,
        ];
        break;
      case Types.WAITCONDITIONS.TITLEIS:
        returnValue = [EC.titleIs(element), waitConditionTime, `Title is not the expected value - ${element}`];
        break;
      case Types.WAITCONDITIONS.STALENESSOF:
        returnValue = [EC.stalenessOf(element), waitConditionTime, `Staleness of element is false`];
        break;
      case Types.WAITCONDITIONS.ELEMENTTOBESELECTED:
        returnValue = [EC.elementToBeSelected(element), waitConditionTime, `Element is not selected`];
        break;
      case Types.WAITCONDITIONS.ABSENCEOF:
        returnValue = [EC.not(EC.presenceOf(element)), waitConditionTime, `Expected element  present in the page.`];
        break;
      case Types.WAITCONDITIONS.TEXTNOTPRESENTINELEMENT:
        returnValue = [
          EC.not(EC.textToBePresentInElement(element, oElementText!)),
          waitConditionTime,
          `Unexpected text ${oElementText} present`,
        ];
        break;
      case Types.WAITCONDITIONS.TEXTNOTPRESENTINELEMENTVALUE:
        returnValue = [
          EC.not(EC.textToBePresentInElementValue(element, oElementText!)),
          waitConditionTime,
          `Unexpected text ${oElementText}  present`,
        ];
        break;
      case Types.WAITCONDITIONS.ELEMENTNOTCLICKABLE:
        returnValue = [EC.not(EC.elementToBeClickable(element)), waitConditionTime, `Element is clickable`];
        break;
      case Types.WAITCONDITIONS.URLDOESNOTCONTAIN:
        returnValue = [EC.not(EC.urlContains(oElementText!)), waitConditionTime, `Unexpected Url loaded`];
        break;
      case Types.WAITCONDITIONS.URLISNOT:
        returnValue = [EC.not(EC.urlIs(oElementText!)), waitConditionTime, `Unexpected Url loaded`];
        break;
      case Types.WAITCONDITIONS.ALERTISNOTPRESENT:
        returnValue = [EC.not(EC.alertIsPresent()), waitConditionTime, `Unexpected Alert present`];
        break;
      case Types.WAITCONDITIONS.TITLEDOESNOTCONTAIN:
        returnValue = [
          EC.not(EC.titleContains(oElementText!)),
          waitConditionTime,
          `Title contains the unexpected value - ${oElementText}`,
        ];
        break;
      case Types.WAITCONDITIONS.TITLEISNOT:
        returnValue = [
          EC.not(EC.titleIs(oElementText!)),
          waitConditionTime,
          `Title is the unexpected value - ${oElementText}`,
        ];
        break;
      case Types.WAITCONDITIONS.NOTSTALENESSOF:
        returnValue = [EC.not(EC.stalenessOf(element)), waitConditionTime, `Staleness of element is true`];
        break;
      case Types.WAITCONDITIONS.ELEMENTNOTSELECTED:
        returnValue = [EC.not(EC.elementToBeSelected(element)), waitConditionTime, `Element is selected`];
        break;
      default:
        returnValue = [EC.presenceOf(element), waitConditionTime, `Expected element not present in the page.`];
    }
    return returnValue;
  }
}
