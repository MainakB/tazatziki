import { IAppConstants, LOGTYPESLIST } from "../types";

export const GLOBALFLAGS: IAppConstants = {
  WAITCONDITIONTIMEOUTACTIONS: 90000,
  STEPTIMEOUTWAITTIME: 30000,
  RECOVERYWAITTIME: 80000,
  LOGTYPE: LOGTYPESLIST.TRACE,
  DEFAULTBROWSER: "chrome",
  // Level of logging verbosity: trace | debug | info | warn | error | silent
};
