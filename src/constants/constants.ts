import { IAppConstants, LOGTYPESLIST } from "../types";

export const GLOBALFLAGS: IAppConstants = {
  WAITCONDITIONTIMEOUTACTIONS: 90000,
  STEPTIMEOUTWAITTIME: 30000,
  RECOVERYWAITTIME: 80000,
  LOGTYPE: LOGTYPESLIST.TRACE,
  DEFAULTBROWSER: "chrome",
  STEPDEFPATH: [
    "src/services/**/step-definitions/**/*.ts",
    // "node_modules/@kaniamb/tzatziki-bl/src/services/**/step-definitions/**/*.ts",
    "../tzatziki-bl/src/services/**/step-definitions/**/*.ts",
  ],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
};
