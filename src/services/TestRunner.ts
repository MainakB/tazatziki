import { WdioLauncher } from "./WdioLauncher";
import { RuntimeConfigs } from "./RuntimeConfigs";
import { multiCapabilities } from "../services";

export class TestRunner {
  static _instance: TestRunner;

  private constructor() {}

  static getInstance() {
    if (!TestRunner._instance) {
      TestRunner._instance = new TestRunner();
    }
    return TestRunner._instance;
  }

  public runTest(testType: string, args: any): Promise<number> {
    if (testType === "wdio") {
      return WdioLauncher(args);
    }

    return new Promise((_resolve, reject) => reject(1));
  }

  async initConfigs(browser?: string | string[]) {
    console.log("set browser");
    browser
      ? RuntimeConfigs.getInstance(browser)
      : RuntimeConfigs.getInstance();
    console.log("now set capabilities");

    await multiCapabilities();
    console.log(
      "now print capabilities first",
      RuntimeConfigs.getInstance().getBrowserCaps()
    );
    console.log(
      "now print capabilities",
      await RuntimeConfigs.getInstance().getBrowserCaps()
    );
  }
}
