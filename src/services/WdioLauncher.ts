import Launcher, { RunCommandArguments } from "@wdio/cli";

export const WdioLauncher = async (args: {
  _configFilePath: string;
  _args: Partial<RunCommandArguments>;
}) => {
  try {
    const wdio = new Launcher(args._configFilePath, {
      ...(args._args || {}),
    });
    return wdio.run();
  } catch (err) {
    throw err;
  }
};
