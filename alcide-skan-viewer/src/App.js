import React from 'react';
import { useContext} from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SeverityDropDown from './SeverityDropDown';
import {prepareData} from './DataLoader';
import { ComponentContext, DataContext } from './State';
import ToggleSwitch from './ToggleSwitch';

import './fontawesome';
import Fetcher from './DataLoader';
import styles from './SkanViewer.module.scss';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function App() {
  var { state } = useContext(ComponentContext);
  var report = useContext(DataContext);
  
  function prepareReport(report, sevrityFilter, groupBy) {
    const checkGroups = prepareData(report, sevrityFilter, groupBy);
    return checkGroups;
  }

  //console.log(">>> App", report);

  return (
    <Container fluid>
      <Row>
        <SkanHeader />
      </Row>
        <Fetcher 
          action={
              () => {return prepareReport(report, state.sevrityFilter, state.groupByToggle)}
          }
        >          
        </Fetcher>
      <Row>
        <SkanFooter />
      </Row>
    </Container>
  );
}

function SkanHeader() {

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="">
      <Container fluid>

              <Navbar.Brand href="#" className='ml-6 m-3'>
                <img src="https://www.rapid7.com/includes/img/Rapid7_logo.svg" height="24" />
              </Navbar.Brand>
              <Container fluid="md">
              <Row>
                <Col>
                  <Nav className='justify-content-center'>
                    <NavItem><ToggleSwitch /></NavItem>
                    <Container>
                      <NavItem><SeverityDropDown /></NavItem>
                    </Container>
                  </Nav>
                </Col>
              </Row>
              </Container>
      </Container>      
    </Navbar>
  );

}

function SkanFooter() {
  return (
    <div className="row p20 mt-4">
      <div className="col-md-4 text-center mt-4">
      </div>
      <div className="col-md-4 text-center p10">
        <div>
          <span>
            <p className="text-secondary" style={{ "fontFamily": 'Roboto', "fontWeight": 200, "fontStyle": "thin", "fontSize": "12px" }}>
              Brought to you by  <a href="https://www.rapid7.com/products/insightcloudsec/" target="_blank"><p className="text-primary" style={{ "fontFamily": 'Source Code Pro', "fontWeight": 500, "fontStyle": "thin", "fontSize": "16px" }}>InsightCloudSec</p></a>
            </p>
          </span>
        </div>
      </div>
      <div className="col-md-4 text-center">
      </div>
    </div>

  );
}



export default App;