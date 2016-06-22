import {UniUI} from '../lib/UniUI';
import React from 'react';

UniUI.registerComponent('none', {
    edit () {
        return undefined;
    },

    view () {
        return undefined;
    }
});