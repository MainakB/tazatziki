import cucumberJson from "wdio-cucumberjs-json-reporter";
import * as fs from "fs";
import * as path from "path";
import { setValue, getValue } from "@wdio/shared-store-service";

import { LocatorsCache } from "../services/LocatorsCache";
import { StepDurationCalculator } from "../services/StepDurationCalculator";
import { CdnFileMerger } from "../services/CdnFileMerger";
import { CucumberLoggerService } from "./CucumberLoggerService";
import { RuntimeConfigs } from "../services/RuntimeConfigs";

const { generate } = require("multiple-cucumber-html-reporter");

const dir: string = `${process.cwd()}/Reports`;

// =====
// Hooks
// =====
// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
// it and to build services around it. You can either apply a single function or an array of
// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
// resolved to continue.

export const hooks = {
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */
  beforeSession: function (
    _config: any,
    _capabilities: any,
    _specs: any,
    _cid: any
  ) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    this.suites = RuntimeConfigs.getInstance().getSuites();
  },

  /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step             step data
   * @param {IPickle}            scenario         scenario pickle
   * @param {Object}             result           results object containing scenario results
   * @param {boolean}            result.passed    true if scenario has passed
   * @param {string}             result.error     error stack if scenario failed
   * @param {number}             result.duration  duration of scenario in milliseconds
   * @param {Object}             context          Cucumber World object
   */
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
  },

  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: [
    async function (_config: WebdriverIO.Config, _capabilities: any) {
      console.log(
        "Bekfore shared service ",
        LocatorsCache.getInstance().getCachedLocators(),
        JSON.stringify(LocatorsCache.getInstance().getCachedLocators())
      );

      await setValue(
        "locatorsCache",
        JSON.stringify(LocatorsCache.getInstance().getCachedLocators())
      );

      console.log("SAfter set", await getValue("locatorsCache"));
    },
  ],

  // LocatorsCache.getInstance();

  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (_cid, _caps, _specs, _args, _execArgv) {},

  /**
   * Gets executed just after a worker process has exited.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {Number} exitCode 0 - success, 1 - fail
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {Number} retries  number of retries used
   */
  // onWorkerEnd: function (cid, exitCode, specs, retries) {},

  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {},

  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {},

  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // beforeFeature: function (uri, feature) {},

  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {Object}                 context  Cucumber World object
   */
  // beforeScenario: function (world, context) {},

  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {Object}             context  Cucumber World object
   */
  beforeStep: function (_step: any, _scenario: any, _context: any) {
    StepDurationCalculator.getInstance().setDateTime();
  },

  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {Object}                 result           results object containing scenario results
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {Object}                 context          Cucumber World object
   */
  // afterScenario: function (world, result, context) {},

  /**
   *
   * Runs after a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // afterFeature: function (uri, feature) {},

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {},

  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {},

  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {},

  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: function (
    _exitCode: any,
    _config: any,
    _capabilities: any,
    _results: any
  ) {
    // Generate the report when it all tests are done
    generate({
      // Required
      // This part needs to be the same path where you store the JSON files
      // default = '.tmp/json/'
      jsonDir: "Reports/json-output-folder/",
      reportPath: "Reports/report/",
      saveCollectedJSON: true,
      displayDuration: true,
      // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
      customData: {
        title: "Service info",
        data: [
          { label: "Project", value: "Custom project" },
          { label: "Release", value: "1.2.3" },
          { label: "Cycle", value: "B11221.34321" },
          {
            label: "Execution Start Time",
            value: "Nov 19th 2017, 02:31 PM EST",
          },
          { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
        ],
      },
    });
    const oldPath = path.resolve(
      process.cwd(),
      "Reports/report/merged-output.json"
    );
    const newPath = path.resolve(process.cwd(), "Reports/results.json");
    fs.renameSync(oldPath, newPath);
    CdnFileMerger();
  },
};
