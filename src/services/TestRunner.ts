import {WdioLauncher} from './WdioLauncher';
import {RuntimeConfigs} from './RuntimeConfigs';
import {multiCapabilities} from '../services';
import {Utils} from '../lib';
import {CucumberOptsService} from './CucumberOptsService';
import {LocatorsCache} from '../services/LocatorsCache';

export class TestRunner {
  private static _instance: TestRunner;

  private constructor() {}

  static getInstance() {
    if (!TestRunner._instance) {
      TestRunner._instance = new TestRunner();
    }
    return TestRunner._instance;
  }

  initTestLauncher(testType: string, args?: any): void {
    if (testType === 'wdio') {
      WdioLauncher.getInstance(args);
    }
  }

  async runTest() {
    return WdioLauncher.getInstance().run();
    // return new Promise((_resolve, reject) => reject(1));
  }

  async setWdioConfigs(_setargs: {suites: any; customer: string; tagExpression: string; args: any; testType: string}) {
    const testSpecs = await Utils.getInstance().resolveTestSuite(_setargs.suites, _setargs.customer);
    await multiCapabilities();

    _setargs.args._args = {
      ..._setargs.args._args,
      capabilities: RuntimeConfigs.getInstance().getBrowserCaps(),
      suites: testSpecs.testSuite,
      suite: testSpecs.suiteNames,
      cucumberOpts: {
        ...CucumberOptsService.getInstance({
          tagExpression: _setargs.tagExpression,
        }),
        // tagExpression: "@smoke",
      },
    };

    this.initTestLauncher(_setargs.testType, _setargs.args);
  }

  async initConfigs(_initargs: {gruntobj: any; args?: {_args: object; __configFilePath?: string}; testType?: string}) {
    const browser = _initargs.gruntobj.option('browser');
    const suites = _initargs.gruntobj.option('suites');
    const customer = _initargs.gruntobj.option('customer');
    const tagExpression = _initargs.gruntobj.option('tags');
    const testType = _initargs.testType || 'wdio';

    if (!_initargs.args) {
      _initargs.args = {
        _args: {},
      };
    }

    await LocatorsCache.getInstance().getProjectLocators();

    if ((Array.isArray(browser) && browser) || (!Array.isArray(browser) && browser)) {
      RuntimeConfigs.getInstance().setBrowser(browser);
    }
    // const testSpecs = await Utils.getInstance().resolveTestSuite(
    //   suites,
    //   customer
    // );
    // await multiCapabilities();

    // _initargs.args._args = {
    //   ..._initargs.args._args,
    //   capabilities: RuntimeConfigs.getInstance().getBrowserCaps(),
    //   suites: testSpecs.testSuite,
    //   suite: testSpecs.suiteNames,
    //   cucumberOpts: {
    //     ...CucumberOptsService.getInstance({ tagExpression }),
    //   },
    // };
    if (testType === 'wdio') {
      this.setWdioConfigs({
        suites,
        customer,
        tagExpression,
        args: _initargs.args,
        testType,
      });
    }
    // this.initTestLauncher(testType, _initargs.args);
  }
}
