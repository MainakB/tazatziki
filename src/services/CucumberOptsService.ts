// import { GLOBALFLAGS } from "../constants";
// import { ICucumberOptsParams } from "../types";

// export class CucumberOptsService {
//   static _instance: CucumberOptsService;

//   private browser: string[] | string = GLOBALFLAGS.DEFAULTBROWSER;
//   private browserVersion: string = "";
//   private browserCaps: any[] = [];

//   private constructor(args?: ICucumberOptsParams) {
//     this.browser = args?.browser ?? this.browser;
//     this.browserVersion = args?.browserVersion ?? this.browserVersion;
//   }

//   static getInstance(browser?: string[] | string, browserVersion?: string) {
//     if (!CucumberOptsService._instance) {
//       if (browser) {
//         CucumberOptsService._instance = new CucumberOptsService({
//           browser,
//           browserVersion,
//         });
//       } else {
//         CucumberOptsService._instance = new CucumberOptsService();
//       }
//     }
//     return CucumberOptsService._instance;
//   }
//   getBrowser(): string | string[] {
//     return this.browser;
//   }

//   getBrowserVersion(): string {
//     return this.browserVersion;
//   }

//   setBrowserVersion(browserVersion: string) {
//     this.browserVersion = browserVersion;
//   }

//   setBrowserCaps(browserCaps: any[]) {
//     this.browserCaps = browserCaps;
//   }

//   getBrowserCaps(): any[] {
//     return this.browserCaps;
//   }
// }
