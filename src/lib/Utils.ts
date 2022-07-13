import * as fs from "fs";
const path = require("path");

import { PropsType } from "../types";

export class Utils {
  static _instance: Utils;
  private constructor() {}

  static getInstance() {
    if (!Utils._instance) {
      Utils._instance = new Utils();
    }
    return Utils._instance;
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
   *@description : This function returns the POSIX format path
   ********************************************************************************************* */
  getPOSIXFormatPath(pathString: string) {
    return pathString.replace(/\\/g, "/");
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

  async checkIfFileExists(params: { filePath: string; pathInCwd?: boolean }) {
    const fullPath = params.pathInCwd
      ? this.resolveCrossPlatformPaths(params.filePath)
      : this.resolveCrossPlatformPaths(params.filePath, false);

    return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile();
  }

  moveFile(params: { src: string; dest: string }) {
    fs.rename(params.src, params.dest, (err) => {
      if (err) {
        console.log(err);
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
    const filePath = `dist/src/customers/replaceWithCustomerName/test-suite/test-suites-collection.js`;
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
        throw new Error("Incorrect customer name");
      } else {
        fileName = filePath.replace(
          "replaceWithCustomerName",
          testModuleValue.toLowerCase()
        );
      }
    } else {
      fileName = filePath.replace("replaceWithCustomerName", testModuleValue);
    }
    return import(`${process.cwd()}/${fileName}`);
  }

  writeToMasterTestSuite(props: PropsType) {
    return new Promise((resolve, reject) => {
      fs.writeFile(props.testSuitePath, props.objectToWrite, (err: any) => {
        if (err) {
          reject(
            new Error(
              `Error writing to test suite collection master ${err.message}`
            )
          );
        } else {
          resolve("Updated test suite collection successfully!");
        }
      });
    });
  }

  // 2. Resolve the test suites collection from multiple modules,to form a master test suite
  async resolveMultipleModuleSuites(testModuleListFromExec: string) {
    const allSuites = await this.listTestSuitePaths(testModuleListFromExec);
    let objectToWrite = `module.exports= ${JSON.stringify(
      allSuites[Object.keys(allSuites)[0]]
    ).replace(/"([^(")"]+)":/g, "$1:")}`;
    objectToWrite = objectToWrite.replace(
      "features/",
      `src/customers/${testModuleListFromExec.toLocaleLowerCase()}/features/`
    );
    const testSuitePath = `dist/src/customers/${testModuleListFromExec.toLocaleLowerCase()}/test-suite/test-suites-collection-modified.js`;

    await this.writeToMasterTestSuite({
      testSuitePath,
      objectToWrite,
    });

    let fileExists = await this.checkIfFileExists({
      filePath: testSuitePath,
      pathInCwd: true,
    });

    while (!fileExists) {
      console.log("file not present");
      fileExists = await this.checkIfFileExists({
        filePath: testSuitePath,
        pathInCwd: true,
      });
    }
    return 0;
  }
}
