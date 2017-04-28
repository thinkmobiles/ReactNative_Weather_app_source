'use strict';

import {combineReducers} from 'redux';
import weather from './weather';
import calendar from './calendar';
import dateSelect from './dateSelect';
import customVars from './customVars';

export default combineReducers({
    weather,
    calendar,
    dateSelect,
    customVars
});