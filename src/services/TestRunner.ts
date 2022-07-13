import { WdioLauncher } from "./WdioLauncher";

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
}
