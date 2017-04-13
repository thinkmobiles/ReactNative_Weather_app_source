'use strict';

import {combineReducers} from 'redux';
import weather from './weather';
import calendar from './calendar';
import ds from './dateSelect';

export default combineReducers({
    weather,
    calendar,
    ds
});