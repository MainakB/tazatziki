import * as browserCaps from "../types/browsers-capabilities";
import { RuntimeConfigs } from "../services";
import { Utils } from "../lib";
const { getInstalledChromeVersion } = Utils.getInstance();
const runtimeConfigs = RuntimeConfigs.getInstance();

const setChromeVersion = async () => {
  const browserVersion = await getInstalledChromeVersion();
  runtimeConfigs.setBrowserVersion(browserVersion);
};
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
      await setChromeVersion();
      return browserCaps.chromeDefaultCapabilities;
    //   return setParallelBrowserCount(browserCaps.chromeDefaultCapabilities);
    // case "edge":
    //   return setParallelBrowserCount(browserCaps.microsoftEdgeCapabilities);
    // case "internet explorer":
    //   return setParallelBrowserCount(browserCaps.internetExplorerCapabilities);
    default:
      Logger.info("Terminating test.Incorrect browser stack");
      break;
  }
  return new Error("Terminating test.Incorrect browser stack");
};

export const multiCapabilities = async () => {
  const browser = runtimeConfigs.getBrowser();

  //   process.env.BROWSERNAME!;
  const browserCapsList = [];
  const valSent = Array.isArray(browser) ? browser : new Array(browser);
  for (const browserVal of valSent) {
    const cap = await getCaps(browserVal);
    browserCapsList.push(cap);
  }
  //   return Promise.all(valSent.map((browserVal) => getCaps(browserVal))).then(
  //     (caps) => caps
  //   );
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
