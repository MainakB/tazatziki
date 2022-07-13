import { GLOBALFLAGS } from "../constants";

export class ExceptionHandler {
  enteredDateTime: Date = new Date();
  enteredTime: number = 0;
  maxWaitTime: number = 0;
  flagAttempted = false;
  private fileNameEx: string = "src.core.ExceptionHandler";
  constructor() {}

  async catchException(exception: any, callback?: any): Promise<any> {
    let self: this = this,
      cbReturnVal: Array<any> = [];
    let logPrefix = `${self.fileNameEx}.catchException :`;

    if (exception.name === "stale element reference") {
      Logger.log(`${logPrefix} Stale Element Reference Exception found.`);
      if (callback) {
        cbReturnVal = await self.retryFunction(callback);
        if (cbReturnVal[0]) return cbReturnVal[1];
      }
    } else if (exception.name === "invalid element state") {
      Logger.log(`${logPrefix} Invalid Element State Exception found.`);
      if (callback) {
        cbReturnVal = await self.retryFunction(callback);
        if (cbReturnVal[0]) return cbReturnVal[1];
      }
    } else if (exception.name === "element click intercepted") {
      Logger.log(`${logPrefix} Element Click Intercepted Exception found.`);
      if (callback) {
        cbReturnVal = await self.retryFunction(callback);
        if (cbReturnVal[0]) return cbReturnVal[1];
      }
    } else if (exception.name === "element not interactable") {
      Logger.log(`${logPrefix} Element Not Interactable Exception found.`);
      if (callback) {
        cbReturnVal = await self.retryFunction(callback);
        if (cbReturnVal[0]) return cbReturnVal[1];
      }
    } else {
      if (exception.name === "invalid selector") {
        Logger.log(`${logPrefix} Invalid Selector Exception found.`);
        if (callback) {
          cbReturnVal = await self.retryFunction(callback);
          if (cbReturnVal[0]) return cbReturnVal[1];
        }
      }
    }
    const log = {
      exception: exception.name,
      description: exception.message,
      stacktrace: exception.stack,
    };
    Logger.log(
      `${logPrefix} Exception details -> ${JSON.stringify(log, null, 4)}`
    );
    self.flagAttempted = false;
    throw exception;
  }
  async retryFunction(callback: any): Promise<any> {
    let self: this = this;
    let logPrefix = `${self.fileNameEx}.retryFunction :`;
    let recoverytime: number,
      cbReturnVal: Array<any> = [];

    recoverytime = GLOBALFLAGS.RECOVERYWAITTIME || 40000;

    if (!self.flagAttempted) {
      self.flagAttempted = true;
      self.enteredDateTime = new Date();
      //Entered time
      self.enteredTime = self.enteredDateTime.getTime();
      self.enteredDateTime.setMilliseconds(
        self.enteredDateTime.getMilliseconds() + recoverytime
      );
      //Max time
      self.maxWaitTime = self.enteredDateTime.getTime();
      Logger.log(
        `${logPrefix} Trying to recover the exception in ${recoverytime}ms`
      );
    } else {
      //Updating entered time
      self.enteredTime = new Date().getTime();
    }
    let distance = self.maxWaitTime - self.enteredTime;
    if (distance > 0) {
      let returnvalue = await callback();
      cbReturnVal[0] = true;
      cbReturnVal[1] = returnvalue;
      self.flagAttempted = false;
      return cbReturnVal;
    } else {
      cbReturnVal[0] = false;
      Logger.log(
        `${logPrefix} Failed to recover the exception in ${recoverytime}ms`
      );
      return cbReturnVal;
    }
  }
}
