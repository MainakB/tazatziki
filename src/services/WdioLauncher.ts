import Launcher, { RunCommandArguments } from "@wdio/cli";

// export const WdioLauncher = async (args: {
//   _configFilePath: string;
//   _args: Partial<RunCommandArguments>;
// }) => {
//   try {
//     const wdio = new Launcher(args._configFilePath, {
//       ...(args._args || {}),
//     });
//     return wdio.run();
//   } catch (err) {
//     throw err;
//   }
// };
export class WdioLauncher {
  static _instance: WdioLauncher;

  private wdio: Launcher | null = null;
  constructor(args?: {
    _configFilePath: string;
    _args: Partial<RunCommandArguments>;
  }) {
    if (args) {
      try {
        this.wdio = new Launcher(args._configFilePath, {
          ...(args._args || {}),
        });
      } catch (err) {
        throw err;
      }
    } else {
      throw Error(
        "src.services.WdioLauncher: Config file is required as part of setup config parameter from grunt file."
      );
    }
  }

  static getInstance(args?: {
    _configFilePath: string;
    _args: Partial<RunCommandArguments>;
  }) {
    if (!WdioLauncher._instance) {
      WdioLauncher._instance = new WdioLauncher(args);
    }
    return WdioLauncher._instance;
  }

  run() {
    return this.wdio?.run();
  }
}
