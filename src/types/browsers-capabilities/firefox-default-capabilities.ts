import * as _ from 'lodash';
import {defaultCapabilities} from './default-capabilities';

export const firefoxDefaultCapabilities = _.merge({}, defaultCapabilities, {
  browserName: 'firefox',
});
