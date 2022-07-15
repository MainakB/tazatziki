import * as fs from "fs";
import * as path from "path";
import * as ChromeLauncher from "chrome-launcher";
import * as http from "http";
import { Logger } from "../services/Logger";

import {
  IWriteToDirectory,
  ICheckFileExists,
  IRequestLocalChromeVersion,
} from "../types";

export class Utils {
  private static _instance: Utils;
  private constructor() {}

  static getInstance() {
    if (!Utils._instance) {
      Utils._instance = new Utils();
    }
    return Utils._instance;
  }

  /** *******************************************************************************************
   *@description : This function returns the POSIX format path
   ********************************************************************************************* */
  getPOSIXFormatPath(pathString: string): string {
    return pathString.replace(/\\/g, "/");
  }

  /************************************************************************************************
   * @Description : Check if the environment is for headless execution
   *********************************************************************************************** */
  ifEnvElse(name: string, onExist: Function, onUndefined: Function): any {
    const value = process.env[name];
    if (value) {
      return onExist();
    }
    return onUndefined();
  }

  /** *******************************************************************************************
   *@description : This function returns the default download directory as set in chrome options
   ********************************************************************************************* */
  getDefaultDownloadDirectory() {
    const basePath = `${process.cwd()}\\Reports`;
    const posixBasePath = this.getPOSIXFormatPath(basePath);
    this.ifEnvElse(
      "JENKINS_CI",
      () => posixBasePath,
      () => basePath
    );
  }

  /** **********************************************************************************************
   * @Description : This method resolves directory/file path based on the OS being used
   *********************************************************************************************** */
  resolveCrossPlatformPaths(windowsPatternPath: string, isCwd = true) {
    const basePath = isCwd
      ? `${process.cwd()}\\${windowsPatternPath}`
      : windowsPatternPath;
    const macLinBasePath = this.getPOSIXFormatPath(basePath);
    return this.ifEnvElse(
      "JENKINS_CI",
      () => macLinBasePath,
      () => (process.platform === "win32" ? basePath : macLinBasePath)
    );
  }

  async checkIfFileExists(params: ICheckFileExists) {
    try {
      const fullPath = params.pathInCwd
        ? this.resolveCrossPlatformPaths(params.filePath)
        : this.resolveCrossPlatformPaths(params.filePath, false);

      let isFilePresent = false;

      const check = async (fullPath: string) => {
        return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile();
      };

      if (params.timerInMs) {
        const startTime = Date.now();
        while (Date.now() - startTime < params.timerInMs) {
          isFilePresent = await check(fullPath);
        }
      } else {
        isFilePresent = await check(fullPath);
      }
      if (!isFilePresent)
        Logger.log(
          `src.lib.Utils.checkIfFileExists : Status of presence of file is ${isFilePresent} in path ${fullPath}`
        );
      return isFilePresent;
    } catch (err: any) {
      Logger.log(
        `src.lib.Utils.checkIfFileExists : Error checking if file exists - ${err.message}`
      );
      throw err;
    }
  }

  moveFile(params: { src: string; dest: string }) {
    fs.rename(params.src, params.dest, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  getMp4File(dir: string) {
    let mp4Files: any[] = [];
    fs.readdirSync(dir).forEach((file: string) => {
      let fullPath = path.join(dir, file);
      if (!fs.lstatSync(fullPath).isDirectory() && fullPath.includes(".mp4")) {
        mp4Files.push(fullPath);
      }
    });
    return mp4Files;
  }

  /** **********************************************************************************************
   *  @Description : Converst string to camelcase
   *  @params : {string} value passed
   *  @returns:  string
   *********************************************************************************************** */
  convertToCamelcase(str: string): string {
    // Check if already camelcased or a string in all lowercase
    if (str.match(/^[a-zA-Z0-9][A-Za-z0-9]*$/) === null) {
      return str
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
          idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
        )
        .replace(/\s+/g, "");
    }
    return str;
  }

  /** **********************************************************************************************
   * @Description : This function travereses a directory and add files to a set
   *********************************************************************************************** */
  traverseDir(dir: string): Set<any> {
    const allPropsFile = new Set();
    let fullPath;
    fs.readdirSync(dir).forEach((file: string) => {
      fullPath = path.join(dir, file);
      fs.lstatSync(fullPath).isDirectory()
        ? this.traverseDir(fullPath)
        : !fullPath.includes("index") && allPropsFile.add(fullPath);
    });
    return allPropsFile;
  }

  convertMapToObj(map: any) {
    const obj = {} as any;
    for (const [k, v] of map) obj[k] = v;
    return obj;
  }

  distance(max: number, start: number, addTime: number) {
    return start + addTime - max;
  }

  crypt(text: string, salt: string) {
    const textToChars = (text: string) =>
      text.split("").map((c) => c.charCodeAt(0));

    const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);

    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  }

  // 1. List out the path of test suite in an array and fetch the test suites for the listed modules
  async listTestSuitePaths(testModuleValue: string) {
    // const filePath = `dist/src/customers/replaceWithCustomerName/test-suite/test-suites-collection.js`;
    const filePath = `src/customers/replaceWithCustomerName/test-suite/test-suites-collection.json`;
    let fileName = "";
    let fileExist = await this.checkIfFileExists({
      filePath: filePath.replace("replaceWithCustomerName", testModuleValue),
      pathInCwd: true,
    });

    if (!fileExist) {
      fileExist = await this.checkIfFileExists({
        filePath: filePath.replace(
          "replaceWithCustomerName",
          testModuleValue.toLowerCase()
        ),
        pathInCwd: true,
      });

      if (!fileExist) {
        throw new Error(
          "Test suite file does not exist " +
            filePath.replace(
              "replaceWithCustomerName",
              testModuleValue.toLowerCase()
            )
        );
      } else {
        fileName = filePath.replace(
          "replaceWithCustomerName",
          testModuleValue.toLowerCase()
        );
      }
    } else {
      fileName = filePath.replace("replaceWithCustomerName", testModuleValue);
    }
    return require(`${process.cwd()}/${fileName}`);
  }

  async createDirectory(path: string) {
    try {
      await fs.promises.mkdir(path, { recursive: true });
    } catch (err: any) {
      Logger.log(`src.lib.Utils : Error creating directory ${err.message}`);
      throw err;
    }
  }
  async writeFile(props: IWriteToDirectory) {
    try {
      await this.createDirectory(props.directoryPath);
      await fs.promises.writeFile(
        `${props.directoryPath}${props.fileName}`,
        props.data
      );
      return this.checkIfFileExists({
        filePath: `${props.directoryPath}${props.fileName}`,
        pathInCwd: true,
        timerInMs: 5000,
      });
    } catch (err: any) {
      Logger.log(
        `src.lib.Utils.writeFile : Error writing to test suite collection master ${err.message}`
      );
      throw err;
    }
  }

  // 2. Resolve the test suites collection from multiple modules,to form a master test suite
  async resolveMultipleModuleSuites(
    testModuleListFromExec: string
  ): Promise<object> {
    const allSuites = await this.listTestSuitePaths(testModuleListFromExec);
    let suiteObject = JSON.stringify(allSuites).replace(
      /features\//g,
      `src/customers/${testModuleListFromExec.toLocaleLowerCase()}/features/`
    );
    return JSON.parse(suiteObject);
  }

  async resolveTestSuiteCollection(suiteNames: string, suiteObject: object) {
    let testSuite = {};
    let missingTestSuite = [];
    for (let suiteName of suiteNames) {
      if ((suiteObject as any)[suiteName]) {
        testSuite = {
          ...testSuite,
          [suiteName]: (suiteObject as any)[suiteName],
        };
      } else {
        missingTestSuite.push(suiteName);
      }
    }
    if (missingTestSuite.length) {
      Logger.log(
        `src.lib.Utils.resolveTestSuiteCollection : Following test suites are missing in the test suite collection - ${missingTestSuite}. Please make sure the test suite is present in the test suite collections file.`
      );
    }

    return { testSuite, suiteNames };
  }

  getRequestLocalChromeVersion(options: IRequestLocalChromeVersion) {
    return new Promise((resolve, reject) => {
      const request = http.get(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          if (response.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(data));
          }
        });
      });
      request.setTimeout(5000, () => {
        request.abort();
      });

      request.on("error", reject);
    });
  }

  async getInstalledChromeVersion() {
    const chromeOpts: ChromeLauncher.Options = {
      chromeFlags: ["--no-sandbox", "--headless"],
    };
    const chromeInstance = await ChromeLauncher.launch(chromeOpts);
    const options = {
      host: "127.0.0.1",
      port: chromeInstance.port,
      path: "/json/version",
      requestType: "GET",
    };
    const response: any = await this.getRequestLocalChromeVersion(options);
    await chromeInstance.kill();

    return response.Browser.split("/")[1];
  }

  getTestModuleName(testModule: string) {
    let testModuleList;
    if (testModule !== undefined && testModule !== "undefined") {
      (testModule.charAt(0) === "[" &&
        testModule.charAt(testModule.length - 1) === "]") ||
      (testModule.charAt(0) === "{" &&
        testModule.charAt(testModule.length - 1) === "}") ||
      (testModule.charAt(0) === "(" &&
        testModule.charAt(testModule.length - 1) === ")")
        ? (testModuleList = testModule.slice(1, -1).split(","))
        : (testModuleList = testModule.split(","));
    } else {
      throw new Error(
        "Please pass one or multiple test module name(s) to run the test against. Pass the flag as --testModuleName"
      );
    }
    return testModuleList;
  }

  async resolveTestSuite(suites: string, customer: string) {
    if (!suites) {
      throw new Error(
        "Please pass one or multiple test suite name(s), to run the test against. Pass the flag as --suites=abc for a single suite abc or --suites=[abc,xyz] for more than one."
      );
    }
    let testSuiteParamVal = suites;
    let testSuiteParam = "";
    if (
      testSuiteParamVal.charAt(0) === "[" &&
      testSuiteParamVal.charAt(testSuiteParamVal.length - 1) === "]"
    ) {
      testSuiteParam = JSON.parse(
        testSuiteParamVal
          .split("]")
          .join('"]')
          .split("[")
          .join('["')
          .split(",")
          .join('","')
          .replace(/\]\",\"/g, "],")
      );
    }

    const suiteObject = await this.resolveMultipleModuleSuites(customer);
    return this.resolveTestSuiteCollection(testSuiteParam, suiteObject);
  }
}
