import React from 'react';
import makeAnimated from 'react-select/animated';
import { actionTypes, ComponentContext } from './State';

import Select from 'react-select'

const options = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'info', label: 'Info' },
<<<<<<< HEAD
    { value: 'pass', label: 'Pass' },   
=======
>>>>>>> master
]

const animatedComponents = makeAnimated();

function SeverityDropDown() {
    const { dispatch } = React.useContext(ComponentContext);

    return (
        <Select
            options={options}
            //defaultInputValue="Severity"
            components={animatedComponents}
            isMulti={true}
            closeMenuOnSelect={false}
            onChange={(value) => {
                //console.log(`${value}`);
                dispatch(
                    {
                        type: actionTypes.severityFilterUpdate,
                        sevrityFilter: (value === null) ? options.map((e) => e.value): value.map((e) => e.value)
                    })
            }}
        />
    );

}

export default SeverityDropDown;