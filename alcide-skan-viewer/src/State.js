import React from 'react';
import { useReducer, createContext } from 'react';
import {prepareData} from './DataLoader';

export const groupByActionTypes = {
    byCategory: true,
    byResource: false,
}

export const actionTypes = {
    groupByToggle: 'GROUPBY_TOGGLE',
    searchUpdate: 'SEARCH_UPDATE',
    severityFilterUpdate: 'SEVRITY_FILTER_UPDATE',
    dataLoadStart: 'DATA_LOAD_START',
    dataLoadSuccess: 'DATA_LOAD_SUCCESS',
}

export const initialState = {
    groupByToggle: groupByActionTypes.byCategory,
    sevrityFilter: ["critical", "high", "medium", "low", "info"],
    searchFilter: "",
    isLoading: true,
}

const stateReducer = (state, action) => {
    console.log(`StateChange type=${action.type}`, [action, state])
    switch (action.type) {
        //Group By Main
        case actionTypes.groupByToggle:
            return { ...state, groupByToggle: !state.groupByToggle, isLoading: true };

        // case actionTypes.searchUpdate:
        //     return { ...state, searchFilter: "" };

        case actionTypes.severityFilterUpdate:
            return { ...state, sevrityFilter: action.sevrityFilter, isLoading: true };

        // Data loading
        // case actionTypes.dataLoadStart:
        //     return { ...state, isLoading: true };  
        case actionTypes.dataLoadSuccess:
            return { ...state, isLoading: false };

        default:
            console.log("Unexpected Action " + action.type, state);
            //throw new Error("Unexpected Action " + action.type);
            return state;
    }
};


export const ComponentContext = createContext(initialState);

export const ContextProvider = (props) => {
    const report = React.useContext(DataContext);

    let data = prepareData(report, initialState.sevrityFilter, initialState.groupByToggle);
    initialState['data']=data;

    
    const [state, dispatch] = useReducer(stateReducer, initialState);
    console.log("ContextProvider", state);

    return (
        <ComponentContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ComponentContext.Provider>
    );
};

export const DataContext = createContext(null);

export const DataProvider = (props) => {
    console.log("DataProvider", props.data);

    return (
        <DataContext.Provider value={props.data}>
            {props.children}
        </DataContext.Provider>
    );
};

export default ContextProvider;




