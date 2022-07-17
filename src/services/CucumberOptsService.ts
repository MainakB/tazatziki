import { GLOBALFLAGS } from "../constants";
import { ICucumberOptsParams } from "../types";

// cucumberOpts: {
//     // <string[]> (file/dir) require files before executing features
//     require: [
//       GLOBALFLAGS.STEPDEFPATH,
//       // "src/services/Reporter.ts",
//       // "customers/generic/step-definitions/**/*.ts",
//     ],
//     // <boolean> show full backtrace for errors
//     backtrace: false,
//     // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
//     requireModule: [],
//     // <boolean> invoke formatters without executing steps
//     dryRun: false,
//     // <boolean> abort the run on first failure
//     failFast: false,
//     // <boolean> hide step definition snippets for pending steps
//     snippets: true,
//     // <boolean> hide source uris
//     source: true,
//     // <boolean> fail if there are any undefined or pending steps
//     strict: false,
//     // <string> (expression) only execute the features or scenarios with tags matching the expression
//     tagExpression: "",
//     // <number> timeout for step definitions
//     timeout: GLOBALFLAGS.STEPTIMEOUTWAITTIME,
//     // <boolean> Enable this config to treat undefined definitions as warnings.
//     ignoreUndefinedDefinitions: false,
//   },
export class CucumberOptsService {
  static _instance: CucumberOptsService;
  private require = [GLOBALFLAGS.STEPDEFPATH];
  private backtrace = false;
  private requireModule = [];

  private dryRun = false;

  private failFast = false;

  private snippets = true;

  private source = true;

  private strict = false;

  private tagExpression = "";

  private timeout = GLOBALFLAGS.STEPTIMEOUTWAITTIME;

  private ignoreUndefinedDefinitions = false;

  private constructor(args?: ICucumberOptsParams) {
    this.require = args?.require ?? this.require;
    this.backtrace = args?.backtrace ?? this.backtrace;
    this.requireModule = (args?.requireModule ?? this.requireModule) as [];
    this.dryRun = args?.dryRun ?? this.dryRun;
    this.failFast = args?.failFast ?? this.failFast;
    this.snippets = args?.snippets ?? this.snippets;
    this.source = args?.source ?? this.source;
    this.strict = args?.strict ?? this.strict;
    this.tagExpression = args?.tagExpression ?? this.tagExpression;
    this.timeout = args?.timeout ?? this.timeout;
    this.ignoreUndefinedDefinitions =
      args?.ignoreUndefinedDefinitions ?? this.ignoreUndefinedDefinitions;
  }

  static getInstance(args?: ICucumberOptsParams) {
    if (!CucumberOptsService._instance) {
      if (args && Object.keys(args).length) {
        CucumberOptsService._instance = new CucumberOptsService(args);
      } else {
        CucumberOptsService._instance = new CucumberOptsService();
      }
    }
    return CucumberOptsService._instance;
  }
}
