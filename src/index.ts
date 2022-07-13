// import { Logger } from "./services";
// import Launcher from "@wdio/cli";
// import {}
// export * from "./core";
// export * from "./types/exportTypes";
// export { Logger, Launcher };

import { Action, Element } from "./core";
import { Logger, TestRunner, RuntimeConfigs } from "./services";
import { Utils } from "./lib";

// import { Assertion } from "./Assertion";
// import { Wait } from "./Wait";
// import * as fs from "fs";
// import path = require("path");

class Utility {
  Element: Element;
  Action: Action;
  Logger: any;
  Util: Utils;
  TestRunner: TestRunner;
  //   resolveMultipleModuleSuites: Function;
  //   Assertion: Assertion;
  //   Wait: Wait;
  //   Logger: any;
  constructor() {
    this.Logger = Logger;
    this.Element = Element.getInstance();
    // this.Assertion = new Assertion();
    // this.Assertion.Element = this.Element;
    // this.Element.Assertion = this.Assertion;
    this.Action = new Action();
    this.Action.Element = this.Element;
    // this.Action.Assertion = this.Assertion;
    // this.Wait = new Wait();
    // this.Wait.Element = this.Element;
    // this.Wait.Assertion = this.Assertion;
    // this.Wait.Action = this.Action;
    this.Util = Utils.getInstance();
    this.TestRunner = TestRunner.getInstance();
  }
}
const Tzatziki = new Utility();
export { Tzatziki, RuntimeConfigs };
