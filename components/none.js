import {UniUI} from '../lib/UniUI';
import React from 'react';
import ReactDOM from 'react-dom';

UniUI.registerComponent('none', {
    edit () {
        return undefined;
    },

    view () {
        return undefined;
    }
});