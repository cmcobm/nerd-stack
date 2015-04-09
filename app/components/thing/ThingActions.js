'use strict';

import Dispatcher from '../../util/dispatcher';
import {get as getCached} from '../../util/cache';
import {httpGet, httpPost, httpPut, httpDel} from '../../services/api';
import {ThingConstants} from './ThingConstants';

export default class ThingActions {
  static getData(token, displayName, context) {
    // FIXME: This seems a bit fugly to be repeated in every action
    const cached = getCached(token, displayName);
    if (cached) {
      Dispatcher.transmit(ThingConstants.GET_THINGS)(cached);
      return undefined;
    }
    return httpGet('/thing', Dispatcher.transmit(ThingConstants.GET_THINGS), context);
  }

  static create(payload) {
    return httpPost('/thing', payload, Dispatcher.transmit(ThingConstants.CREATE_THING));
  }

  static update(id, payload) {
    httpPut('/thing/' + id, payload, Dispatcher.transmit(ThingConstants.UPDATE_THING));
  }

  static del(id) {
    httpDel('/thing/' + id, Dispatcher.transmit(ThingConstants.DELETE_THING));
  }
}
