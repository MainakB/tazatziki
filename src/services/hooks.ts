// import {
//   Status,
//   AfterStep,
//   BeforeAll,
//   ITestStepHookParameter,
// } from "@cucumber/cucumber";
// import cucumberJson from "wdio-cucumberjs-json-reporter";
// import * as fs from "fs";
// import { CucumberLoggerService } from "./CucumberLoggerService";

// const dir: string = `${process.cwd()}/Reports`;

// BeforeAll(() => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
// });

// AfterStep(async function (scenarioResult: ITestStepHookParameter) {
//   const cucumberLoggerInstance = CucumberLoggerService.getInstance();
//   if (scenarioResult.result.status === Status.FAILED) {
//     const stream: string = await browser.takeScreenshot();
//     await cucumberJson.attach(stream, "image/png");
//   }

//   if (cucumberLoggerInstance.getMessage() !== null) {
//     await cucumberJson.attach(cucumberLoggerInstance.getMessage()!);
//     await cucumberLoggerInstance.setMessage(null);
//   }
//   return scenarioResult.result.status;
// });

import cucumberJson from "wdio-cucumberjs-json-reporter";
import * as fs from "fs";
import { CucumberLoggerService } from "./CucumberLoggerService";

const dir: string = `${process.cwd()}/Reports`;

export const hooks = {
  beforeSession: function (
    _config: any,
    _capabilities: any,
    _specs: any,
    _cid: any
  ) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },

  afterStep: async function (
    _step: any,
    _scenario: any,
    result: any,
    _context: Object
  ) {
    const cucumberLoggerInstance = CucumberLoggerService.getInstance();
    if (!result.passed) {
      const stream: string = await browser.takeScreenshot();
      await cucumberJson.attach(stream, "image/png");
    }

    if (cucumberLoggerInstance.getMessage() !== null) {
      await cucumberJson.attach(cucumberLoggerInstance.getMessage()!);
      await cucumberLoggerInstance.setMessage(null);
    }
    // return scenarioResult.result.status;
  },
};
