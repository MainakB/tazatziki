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

  initTestLauncher(testType: string, args?: any): void {
    if (testType === "wdio") {
      WdioLauncher.getInstance(args);
    }
  }

  async runTest() {
    return WdioLauncher.getInstance().run();
    // return new Promise((_resolve, reject) => reject(1));
  }

  async initConfigs(_initargs: {
    testType: string;
    args?: any;
    browser?: string | string[];
  }) {
    this.initTestLauncher(_initargs.testType, _initargs.args);
    _initargs.browser
      ? RuntimeConfigs.getInstance(_initargs.browser)
      : RuntimeConfigs.getInstance();
    await multiCapabilities();
  }
}
