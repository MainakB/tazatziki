import { Options } from "@wdio/types";
import { LocatorTypes, WAITCONDITIONS } from "./exportTypes";

export type ElementFinder = any;

export type LocatorObject = {
  locatorType: LocatorTypes;
  locatorValue: string | Function;
};

export type IWaitCondition = {
  waitConditionTime?: number;
  waitCondition?: WAITCONDITIONS;
  oElementText?: string;
};

export interface IPageObject {
  pageObject: string | string[] | ElementFinder | ElementFinder[];
  replaceText?: string | number | (string | number)[] | object;
  jsArg?: any;
}

export interface IAutoScroll extends IWaitCondition {
  element: WebdriverIO.Element;
  autoScrollType?: string;
}

export interface IEvaluateWait extends IWaitCondition {
  element: ElementFinder;
}

export interface IFindElement
  extends IPageObject,
    Omit<IAutoScroll, "element"> {
  //   elementDetails?: LocatorObject;
  //   checkForJsError?: boolean;
}

export interface IGetElementExpectedCondition extends IAutoScroll {
  elementDetails: LocatorObject;
}

interface IAction extends IPageObject {
  autoScrollType?: string;
  waitConditionTime?: number;
}

export type IClick = IAction;

export interface IEnterText extends IAction {
  inputText: string;
  clickBeforeTextInput?: boolean;
}

type ILocatorError = {
  [key: string]: object;
};

export interface ReturnElementType {
  element: WebdriverIO.Element | null;
  err: ILocatorError;
  locatorType: string | null;
  locatorValue: string | null;
  name: string | null;
}

export type IAppConstants = {
  WAITCONDITIONTIMEOUTACTIONS: number;
  STEPTIMEOUTWAITTIME: number;
  RECOVERYWAITTIME: number;
  LOGTYPE: Options.WebDriverLogTypes;
  DEFAULTBROWSER: string;
  STEPDEFPATH: string[];
};

export type IWriteToDirectory = {
  directoryPath: string;
  data: string;
  fileName: string;
};

export type ICheckFileExists = {
  filePath: string;
  pathInCwd?: boolean;
  timerInMs?: number;
};

export interface IRuntimeParameters {
  browser?: string;
  browserVersion?: string;
}

export interface ICucumberOptsParams {
  require?: string[];
  backtrace?: boolean;
  requireModule?: (string | never)[];
  dryRun?: boolean;
  failFast?: boolean;
  snippets?: boolean;
  source?: boolean;
  strict?: boolean;
  tagExpression?: string;
  timeout?: number;
  ignoreUndefinedDefinitions?: boolean;
}

export type IRequestLocalChromeVersion = {
  host: string;
  port: number;
  path: string;
  requestType: string;
};

export enum LOGTYPESLIST {
  TRACE = "trace",
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  SILENT = "silent",
}
