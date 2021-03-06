import {IRuntimeParameters} from '../types';
import {GLOBALFLAGS} from '../constants';

export class RuntimeConfigs {
  private static _instance: RuntimeConfigs;

  private suites: string[] | string = [];

  private customer: string = '';

  private browser: string = GLOBALFLAGS.DEFAULTBROWSER;

  private browserVersion: string = '';

  private browserCaps: any[] = [];

  private constructor(args?: IRuntimeParameters) {
    this.browser = args?.browser ?? this.browser;
    this.browserVersion = args?.browserVersion ?? this.browserVersion;
  }

  static getInstance(browser?: string, browserVersion?: string) {
    if (!RuntimeConfigs._instance) {
      if ((Array.isArray(browser) && browser.length) || (!Array.isArray(browser) && browser)) {
        RuntimeConfigs._instance = new RuntimeConfigs({
          browser,
          browserVersion,
        });
      } else {
        RuntimeConfigs._instance = new RuntimeConfigs();
      }
    }
    return RuntimeConfigs._instance;
  }

  setSuites(suites: string | string[]): void {
    this.suites = suites;
  }

  getSuites(): string | string[] {
    return this.suites;
  }

  setCustomer(customer: string): void {
    this.customer = customer;
  }

  getCustomer(): string {
    return this.customer;
  }

  setBrowser(browser: string): void {
    this.browser = browser;
  }

  getBrowser(): string {
    return this.browser;
  }

  getBrowserVersion(): string {
    return this.browserVersion;
  }

  setBrowserVersion(browserVersion: string) {
    this.browserVersion = browserVersion;
  }

  setBrowserCaps(browserCaps: any[]) {
    this.browserCaps = browserCaps;
  }

  getBrowserCaps(): any[] {
    return this.browserCaps;
  }
}
