import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import * as utils from './utils';

import styles from './SkanViewer.module.scss';

function Checks({checkGroups}) {
    
    //console.log("checkGroups", checkGroups);
    // const { state, dispatch } = useContext(ComponentContext);
    // let checkGroups = prepareData(state.report, state.sevrityFilter, state.groupByToggle);

    let groups = Array.from(checkGroups.keys());
    let checks = Array.from(checkGroups.values());

    //console.log("filterData@state", state);
    //console.log("filterData@checkGroups", checkGroups);
    //console.log("filterData@groups", groups);

    const cards = Array.from(groups.keys()).map((groupName, index) => {
        return (
            <Accordion.Item eventKey={index.toString()}>

                <Accordion.Header>
                <span className={styles.skanthisCardHeader}>{groups[index]}</span>
                </Accordion.Header>


                    <Accordion.Collapse eventKey={index.toString()}>
                    <Card key={index}>
                        <Card.Body>
                            <Table borderless className={styles.skanthisText}>
                                <tbody>
                                    {checks[index].map((check, index) =>
                                        <tr key={index}>
                                            <td>
                                                <Check key={check.CheckId} {...{ check: check }} style={{ width: "80%" }}></Check>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    </Accordion.Collapse>

            </Accordion.Item>
        );
    })

    //console.log("cards", cards);

    return (
        <Accordion>
            {cards}
        </Accordion>
    );
}

function CheckHeaderPill(props) {
    return (
        <Button variant={props.color} size="sm" className={'m-1 border badge-pill badge' + props.color} data-toggle="tooltip">
            <span>{props.name}: </span><span className="font-weight-bold"> {props.val} </span>
        </Button>
    );
}

function CheckBodyTextItem(props) {
    return (
        <li className="list-inline-item d-flex justify-content-between align-items-center">
            {props.children}
        </li>
    );
}

function Check({ check }) {
    let iconUrl = utils.platformLogo(check.Resource.Kind.toString())
    let urlRefs = [];
    
    if (check.References !== undefined && check.References.length > 0) {
        urlRefs.push((
            <li key="0" className="list-inline-item d-flex justify-content-between align-items-center">
                <p className="text-dark font-weight-bold text-uppercase">References</p>
            </li>
        ));

        check.References.forEach((refUrl, index) => {
            urlRefs.push((
                <li key={index + 1} className="list-inline-item d-flex justify-content-between align-items-center">
                    <a href={refUrl} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={['fas', 'external-link-square-alt']} size="sm" /> {refUrl}</a>
                </li>
            ));
        })

        //console.log("urlRefs", urlRefs);
    }

    let nameSpacePill = ""
    if (check.Resource.Namespace !== null && check.Resource.Namespace !== undefined && check.Resource.Namespace.length > 0) {
        nameSpacePill = (
            <CheckHeaderPill {...{ "name": "Namespace", "val": check.Resource.Namespace, "color": "light" }}></CheckHeaderPill>
        );
    }

    return (
        <div className={'container ' + styles.skanthisCallout + ' ml-4'}>
            <ul className="list-group list-group-flush">
                <li className="list-inline-item d-flex justify-content-between align-items-center">
                    <div className="container-fluid">
                        <div className="row pb-2">
                            <div className="col-md-auto">
                                <img src={iconUrl} alt="" className="rounded border-primary" style={{ "width": "96px", "height": "96px" }}></img>
                            </div>
                            <div className="col border-left">
                                <div className="row ml-3">
                                    <h4 className="text-primary">{check.Check.GroupTitle}</h4>
                                </div>
                                <div className="row ml-3">
                                    <h6>{check.Check.CheckTitle}</h6>
                                </div>
                                <div className="row ml-3">
                                    <p className="font-weight-light">
                                        <Button variant={utils.SeverityLevel[check.Severity]} size="sm" className="active badge-pill pl-4 pr-4 pt-0 pb-0">
                                            <span style={{ "fontSize": "18px" }}>{check.Severity}</span>
                                        </Button>
                                        <CheckHeaderPill name="Kind" val={check.Resource.Kind} color="light" />
                                        {nameSpacePill}
                                        <CheckHeaderPill name="Name" val={check.Resource.Name} color="light" />
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <ul className="list-group list-group-flush ml-3 pt-3 border-top">
                <CheckBodyTextItem>
                    <p className="text-dark font-weight-bold text-uppercase">
                        Description
                        <span className="text-secondary text-lowercase font-italic m-2" style={{ "fontSize": "10px" }}>{check.CheckId}</span>
                    </p>
                </CheckBodyTextItem>
                <CheckBodyTextItem>
                    <p className="text-wrap text-break">{check.Message}</p>
                    <hr></hr>
                </CheckBodyTextItem>

                <CheckBodyTextItem><p className="text-dark font-weight-bold text-uppercase">Recommendation</p></CheckBodyTextItem>
                <CheckBodyTextItem><p className="text-wrap text-break mr-1">{check.Recommendation}</p></CheckBodyTextItem>
                {urlRefs}
            </ul>
        </div>

    );
}

export default Checks;