import React from 'react';
import { ComponentContext } from './State';
import { actionTypes, groupByActionTypes } from './State';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import styles from './ToggleSwitch.module.scss';


function ToggleSwitch() {
    const { state, dispatch } = React.useContext(ComponentContext);
    var on

    if (state.groupByToggle === groupByActionTypes.byCategory) {
        on = true;
    } else {
        on = false;
    }

    return (

        <BootstrapSwitchButton
        checked={on}
        onlabel='Categories' 
        offlabel='Resources'
        onstyle="primary"   
        offstyle="secondary"
        width={150}
        onChange={() => dispatch({ type: actionTypes.groupByToggle })}        
        >

        </BootstrapSwitchButton>
    );
}

export default ToggleSwitch;