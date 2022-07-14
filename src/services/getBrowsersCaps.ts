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
  switch (option) {
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
    // case "edge":
    //   return setParallelBrowserCount(browserCaps.microsoftEdgeCapabilities);
    case "safariDefaultCapabilities":
      return browserCaps.safariDefaultCapabilities;
    default:
      Logger.info("Terminating test.Incorrect browser stack");
      break;
  }
  return new Error("Terminating test.Incorrect browser stack");
};

export const multiCapabilities = async () => {
  const browser = runtimeConfigs.getBrowser();

  //   process.env.BROWSERNAME!;
  let browserCapsList = [];
  const valSent = Array.isArray(browser) ? browser : new Array(browser);
  // for (let i = 0; i < valSent.length; i++) {
  //   const cap = await getCaps(valSent[i]);
  //   console.log("caop received is", cap);
  //   browserCapsList.push(cap);
  // }
  browserCapsList = await Promise.all(
    valSent.map(async (browserVal) => await getCaps(browserVal))
  ).then((caps) => caps);
  console.log("set browser cap is", browserCapsList);
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
