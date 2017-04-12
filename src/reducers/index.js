'use strict';

import {combineReducers} from 'redux';
import weather from './weather';
import calendar from './calendar';

export default combineReducers({
    weather,
    calendar
});