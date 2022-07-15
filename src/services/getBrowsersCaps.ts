import * as browserCaps from "../types/browsers-capabilities";
import { RuntimeConfigs } from "../services";

const runtimeConfigs = RuntimeConfigs.getInstance();

// const setChromeVersion = async () => {
//   const browserVersion = await Utils.getInstance().getInstalledChromeVersion();
//   console.log("Found installed chrome version is ", browserVersion);
//   runtimeConfigs.setBrowserVersion(browserVersion);
//   return browserVersion;
// };

const getCaps = async (option: string) => {
  switch (option.toLowerCase()) {
    // case "chrome-beta":
    //   return setParallelBrowserCount(browserCaps.chromeBetaCapabilities);
    // case "chrome-canary":
    //   return setParallelBrowserCount(browserCaps.chromeCanaryCapabilities);
    // case "chrome-dev":
    //   return setParallelBrowserCount(browserCaps.chromeDevCapabilities);
    case "chrome-latest":
    case "chrome":
      return browserCaps.chromeDefaultCapabilities;
    //   return setParallelBrowserCount(browserCaps.chromeDefaultCapabilities);
    case "edge":
    case "msedge":
    case "microsoftedge":
      return browserCaps.msEdgeDefaultCapabilities;
    case "firefox":
      return browserCaps.firefoxDefaultCapabilities;
    case "safari":
      return browserCaps.safariDefaultCapabilities;
    default:
      throw new Error(
        `Terminating test.Incorrect browser stack. Allowed values are (chrome, edge, msedge, safari, firefox) while passed value is ${option}.`
      );
  }
};

export const multiCapabilities = async () => {
  const browser = runtimeConfigs.getBrowser();
  let browserCapsList = [];
  let valSent: string | string[] = "";

  if (
    browser.indexOf(",") > -1 ||
    (browser.startsWith("[") && browser.endsWith("]"))
  ) {
    valSent = (browser as string).replace("[", "");
    valSent = valSent.replace("]", "");
    valSent = valSent.slice(0, browser.length);
    if (browser.indexOf(",") > -1) {
      valSent = valSent.split(",");
    } else {
      valSent = new Array(valSent);
    }
  } else {
    valSent = new Array(browser as string);
  }

  // const valSent = browser.indexOf(',') > -1 ? browser.replace('[').slice(0, browser.length).split(',') : new Array(browser);
  // const valSent = Array.isArray(browser) ? browser : new Array(browser.split(','));
  // for (let i = 0; i < valSent.length; i++) {
  //   const cap = await getCaps(valSent[i]);
  //   console.log("caop received is", cap);
  //   browserCapsList.push(cap);
  // }
  browserCapsList = await Promise.all(
    valSent.map(async (browserVal) => await getCaps(browserVal))
  ).then((caps) => caps);
  runtimeConfigs.setBrowserCaps(browserCapsList);
};

// const setParallelBrowserCount = (cap: any) => {
//   if (process.env.maxInstances && !isNaN(Number(process.env.maxInstances))) {
//     cap.shardTestFiles = true;
//     cap.maxInstances = Number(process.env.maxInstances);
//   }
//   setProxyForNonVm(cap);
//   return cap;
// };

// const setProxyForNonVm = (cap: any) => {
//   if (
//     process.env.JENKINS_CI &&
//     ((process.env.PLATFORM &&
//       !process.env.PLATFORM.toLowerCase().includes("vm")) ||
//       (process.env.PLATFORMCREDENTIALS &&
//         !process.env.PLATFORMCREDENTIALS.toLowerCase().includes("vm")))
//   ) {
//     if (process.env.BROWSERNAME!.includes("chrome")) {
//       cap["goog:chromeOptions"].args.push("--proxy-server=10.229.23.252:3128");
//     }
//     if (process.env.BROWSERNAME!.includes("edge")) {
//       cap["ms:edgeOptions"].args.push("--proxy-server=10.229.23.252:3128");
//     }
//   }
// };
