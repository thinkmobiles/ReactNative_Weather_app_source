'use strict';

import {combineReducers} from 'redux';
import weather from './weather';
import calendar from './calendar';
import dateSelect from './dateSelect';

export default combineReducers({
    weather,
    calendar,
    dateSelect
});