import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import Container from 'react-bootstrap/Container'
import Fade from 'react-bootstrap/Fade'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Checks from './Check'

import { useContext, useEffect, useState } from 'react';
import { actionTypes, ComponentContext } from './State';


//var log = require('log-timestamp');

// This functions prepare the data for the view 
// {groupName: []}
//
export function prepareData(data, currentSeverityFilter, groupByCategory) {
    var checks = new Map();
    var severityFilter = new Map();
    var obj = data.Reports;

    //console.log(`prepareData: [currentSeverityFilter=${currentSeverityFilter}][groupByCategory=${groupByCategory}]`)

    currentSeverityFilter.forEach((s) => severityFilter.set(s));

    Object.keys(obj).forEach((key, i) => {
        var groupChecks = null;
        var groupName;
        let check = obj[key];

        check.Results.forEach((oneResult) => {
            if (!severityFilter.has(oneResult.Severity.toLowerCase())) {
                return;
            }

            if (groupByCategory) {
                groupName = key;
            } else {
                let gvk = ((oneResult.Resource.Group !== undefined && oneResult.Resource.Group !== "") ? oneResult.Resource.Group + '.' : "") +
                    oneResult.Resource.Kind;
                groupName = `${oneResult.Resource.Namespace}/${oneResult.Resource.Name} (${gvk})`
            }

            if (!checks.has(groupName)) {
                checks.set(groupName, []);
            }

            groupChecks = checks.get(groupName);
            groupChecks.push(oneResult);
        })

        if (groupChecks !== null) {
            checks.set(groupName, groupChecks);
        }

    });

    return checks;
}

function useFetcher(action, state, dispatch) {
    const [data, setData] = useState(null);
    const dataRef = React.useRef(data);

    useEffect(() => {
        console.log(`[useFetcher.useLayoutEffect] [isLoading=${state.isLoading}]`);
        async function loadData() {

            if (!state.isLoading) {
                return;
            }

            try {
                //setLoading(true);
                //isLoadingRef.current = true; 
                console.log(`[Load Data] [isLoading=${state.isLoading}]`);
                //isLoadingRef.current = true;

                //Perform the fetch action

                await new Promise(r => setTimeout(r, 700));
                //console.log("before");
                var actionData = action();
                //console.log("after", actionData);
                setData(actionData);
                dataRef.current = actionData;
            } catch (e) {
                console.log("loadData failed", e);
                setData(null);
            } finally {
                //setLoading(false);
                dispatch({ type: actionTypes.dataLoadSuccess });
                //console.log("<<< loadData.completed");
            }
        }

        loadData();

    }, [action, state.isLoading]);

    console.log(`[useFetcher] [isLoading=${state.isLoading}][groupByModule=${state.groupByToggle}]`);
    return [dataRef.current, state.isLoading];
}

const Fetcher = ({ action, children }) => {
    const { state, dispatch } = useContext(ComponentContext);
    const [data, isLoading] = useFetcher(action, state, dispatch);

    console.log(`[Fetcher][isLoading=${isLoading}][data=${data}]`, data);

    var view

    if (!state.isLoading && data) {
        //console.log(`Fetcher data`, { checkGroups: data });
        view = (
            <Fade in={true}>
                <Checks checkGroups={data} />
            </Fade>
        );
        //setData(null);

    } else {
        view = (

            <Container fluid className="p-5">
                <Row className="p-2">
                    <Col />
                </Row>
                <Row className="p-5">
                    <Col />
                    <Col className="d-flex align-items-center justify-content-center">
                        <Fade in={true}>
                            <PropagateLoader
                                size={15}
                                color={"var(--blue)"} />
                        </Fade>
                    </Col>
                    <Col />
                </Row>
            </Container>
        );
    }
    return view;
};

export default Fetcher;
