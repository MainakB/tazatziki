import * as _ from "lodash";
import { Utils } from "../../lib/Utils";
import { defaultCapabilities } from "./default-capabilities";
import { RuntimeConfigs } from "../../services";

export const chromeDefaultCapabilities = _.merge({}, defaultCapabilities, {
  browserName: "chrome",
  browserVersion: RuntimeConfigs.getInstance().getBrowserVersion(),
  // unexpectedAlertBehaviour: "accept",
  // List of log levels : “OFF”, “SEVERE”, “WARNING”, “INFO”, “CONFIG”, “FINE”, “FINER”, “FINEST”, “ALL”. (Lower -> Higher)
  //   "goog:loggingPrefs": {
  //     browser: "WARNING",
  //   },
  "goog:chromeOptions": {
    excludeSwitches: ["enable-automation"],
    useAutomationExtension: false,
    args: Utils.getInstance().ifEnvElse(
      "JENKINS_CI",
      () => [
        "--disable-web-security",
        "--ignore-autocomplete-off-autofill",
        "--headless",
        // Prevent malwares from installing in the system
        "--no-sandbox",
        // The /dev/shm partition is too small in certain VM environments, causing
        // Chrome to fail or crash (see http://crbug.com/715363). Use this flag to
        // work-around this issue (a temporary directory will always be used to create
        // anonymous shared memory files).
        "--disable-dev-shm-usage",
        "--window-size=1366,768",
        "--log-path=chromedriver.log",
        "--disable-gpu",
        // '--setPageLoadStrategy=PageLoadStrategy.EAGER',
        "--disable-features=NetworkService",
        // '--disable-features=VizDisplayCompositor',
        "--incognito",
      ],
      () => [
        "--disable-web-security",
        "--test-type=browser",
        "--ignore-autocomplete-off-autofill",
        "--disable-gpu",
        // '--setPageLoadStrategy=PageLoadStrategy.EAGER',
        "--disable-features=NetworkService",
        "--verbose",
        "--log-path=chromedriver.log",
        "--incognito",
      ]
    ),
    // Set download path and avoid prompting for download even though
    // this is already the default on Chrome but for completeness
    prefs: {
      credentials_enable_service: false,
      profile: {
        password_manager_enabled: false,
      },
      download: {
        prompt_for_download: false,
        directory_upgrade: true,
        default_directory: Utils.getInstance().getDefaultDownloadDirectory(),
      },
    },
  },
});
