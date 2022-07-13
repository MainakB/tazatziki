//  import * as _ from 'lodash';
//  import {ifEnvElse, getDefaultDownloadDirectory} from '@common_util';
//  import {defaultCapabilities} from './default-capabilities';
//  export const microsoftEdgeCapabilities = _.merge({}, defaultCapabilities, {
//      'browserName': 'MicrosoftEdge',
//      'ms:loggingPrefs': {
//          browser: 'WARNING',
//      },
//      'ms:edgeOptions': {
//          excludeSwitches: ['enable-automation'],
//          useAutomationExtension: false,
//          args: ifEnvElse(
//              'JENKINS_CI',
//              () => [
//                  '--disable-web-security',
//                  '--ignore-autocomplete-off-autofill',
//                  '--headless',
//                  // Prevent malwares from installing in the system
//                  '--no-sandbox',
//                  // The /dev/shm partition is too small in certain VM environments, causing
//                  // Chrome to fail or crash (see http://crbug.com/715363). Use this flag to
//                  // work-around this issue (a temporary directory will always be used to create
//                  // anonymous shared memory files).
//                  '--disable-dev-shm-usage',
//                  '--window-size=1366,768',
//                  '--log-path=chromedriver.log',
//                  '--disable-gpu',
//                  // '--setPageLoadStrategy=PageLoadStrategy.EAGER',
//                  '--disable-features=NetworkService',
//                  // '--disable-features=VizDisplayCompositor',
//                  '--incognito',
//              ],
//              () => [
//                  '--disable-web-security',
//                  '--test-type=browser',
//                  '--ignore-autocomplete-off-autofill',
//                  '--disable-gpu',
//                  // '--setPageLoadStrategy=PageLoadStrategy.EAGER',
//                  '--disable-features=NetworkService',
//                  '--verbose',
//                  '--log-path=edgedriver.log',
//                  '--incognito',
//              ]
//          ),
//          // Set download path and avoid prompting for download even though
//          // this is already the default on Chrome but for completeness
//          prefs: {
//              credentials_enable_service: false,
//              profile: {
//                  password_manager_enabled: false,
//              },
//              download: {
//                  prompt_for_download: false,
//                  directory_upgrade: true,
//                  default_directory: getDefaultDownloadDirectory(),
//              },
//          },
//      },
//  });
