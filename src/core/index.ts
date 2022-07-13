// import { Action } from "./PageActions";
// import { Element } from "./Element";
// // import { Assertion } from "./Assertion";
// // import { Wait } from "./Wait";
// // import * as fs from "fs";
// // import path = require("path");

// class Utility {
//   Element: Element;
//   Action: Action;
//   //   Assertion: Assertion;
//   //   Wait: Wait;
//   //   Logger: any;
//   constructor() {
//     // this.Logger = require("../Logger");
//     this.Element = Element.getInstance();
//     // this.Assertion = new Assertion();
//     // this.Assertion.Element = this.Element;
//     // this.Element.Assertion = this.Assertion;
//     this.Action = new Action();
//     this.Action.Element = this.Element;
//     // this.Action.Assertion = this.Assertion;
//     // this.Wait = new Wait();
//     // this.Wait.Element = this.Element;
//     // this.Wait.Assertion = this.Assertion;
//     // this.Wait.Action = this.Action;
//   }
// }
// export const CoreUtility = new Utility();

export * from "./Assertions";
export * from "./PageActions";
export * from "./Element";
