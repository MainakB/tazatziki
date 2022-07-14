import * as _ from "lodash";
import { defaultCapabilities } from "./default-capabilities";

export const msEdgeDefaultCapabilities = _.merge({}, defaultCapabilities, {
  browserName: "MicrosoftEdge",
});
