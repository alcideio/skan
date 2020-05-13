import React from 'react';
import { ComponentContext } from './State';
import { actionTypes, groupByActionTypes } from './State';

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
        <div className="container">
            <div className="row">
                <div className="align-self-center justify-content-end">
                    <span className="text-secondary">Resources</span>
                </div>
                <div className="col align-self-end">
                    <input
                        type='checkbox'
                        className={styles.checkbox}
                        id='groupByMainToggle'
                        checked={on}
                        onChange={() => dispatch({ type: actionTypes.groupByToggle })}
                        readOnly
                    />
                    <label className={styles.label + ' mt-3'} htmlFor='groupByMainToggle' style={{ "background": "var(--blue)" }}>
                        <span className={styles.button} />
                    </label>
                </div>
                <div className="align-self-center">
                    <span className="text-secondary">Modules</span>
                </div>
            </div>
        </div>
    );
}

export default ToggleSwitch;