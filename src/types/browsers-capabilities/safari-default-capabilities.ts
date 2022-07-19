import * as _ from 'lodash';
import {defaultCapabilities} from './default-capabilities';

export const safariDefaultCapabilities = _.merge({}, defaultCapabilities, {
  browserName: 'safari',
});
