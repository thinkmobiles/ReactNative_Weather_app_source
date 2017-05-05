'use strict';

import {combineReducers} from 'redux';
import weather from './weather';
import customVars from './customVars';

export default combineReducers({
    weather,
    customVars
});