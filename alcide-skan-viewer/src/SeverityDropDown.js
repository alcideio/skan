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
    { value: 'pass', label: 'Pass' },
]

const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    // control: () => ({
    //   // none of react-select's styles are passed to <Control />
    //   width: auto,
    // }),
  }

function SeverityDropDown() {
    const { dispatch } = React.useContext(ComponentContext);

    return (
        <Select
            options={options}
            styles={customStyles}
            //defaultInputValue="Severity"
            components={animatedComponents}
            isMulti={true}
            closeMenuOnSelect={false}
            onChange={(value) => {
                console.log('XXXXXX'+`${value}`);
                dispatch(
                    {
                        type: actionTypes.severityFilterUpdate,
                        sevrityFilter: (value === null || value.length === 0) ? options.map((e) => e.value): value.map((e) => e.value)
                    })
            }}
        />
    );

}

export default SeverityDropDown;