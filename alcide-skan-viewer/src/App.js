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

function App() {
  var { state } = useContext(ComponentContext);
  var report = useContext(DataContext);
  
  function prepareReport(report, sevrityFilter, groupBy) {
    const checkGroups = prepareData(report, sevrityFilter, groupBy);
    return checkGroups;
  }

  //console.log(">>> App", report);

  return (
    <div>
      <div className="row d-flex justify-content-between">
        <div className="col-12">
          <SkanHeader />
        </div>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="col-sm" />
        <div className="col-10">
          <Fetcher 
            action={
                () => {return prepareReport(report, state.sevrityFilter, state.groupByToggle)}
            }
          >          
          </Fetcher>

        </div>
        <div className="col-sm" />
      </div>
      <SkanFooter />
    </div>
  );
}

function SkanHeader() {

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="">
      <div className="col-sm-2 justify-content-start">
        <Navbar.Brand
          href="#"
          className={styles.skanlogo}
        >
          {'{sKan ...}'}
        </Navbar.Brand>
      </div>
      <div className="col-sm-3 p-0 align-self-end align-items-center">
        <Container>
          <NavItem>
            <ToggleSwitch />
          </NavItem>
        </Container>
      </div>
      <div className="col-md-3 p-0">
        <NavItem>
          <SeverityDropDown />
        </NavItem>
      </div>
      <div className="col-sm-4 justify-content-start">
        <Container>
          <Nav.Link href="https://github.com/alcideio" target="_blank" className="p-0" style={{ color: '#FFF' }} >
            <span className="nav-link-inner--text"><FontAwesomeIcon icon={['fab', 'github']} size="sm" /> GitHub</span>
          </Nav.Link>
          <Nav.Link href="https://www.alcide.io/community" target="_blank" className="p-0" style={{ color: '#FFF' }} >
            <span className="nav-link-inner--text"><FontAwesomeIcon icon={['fas', 'people-arrows']} size="sm" /> Community</span>
          </Nav.Link>
          <Nav.Link href="https://codelab.alcide.io" target="_blank" className="p-0" style={{ color: '#FFF' }} >
            <span className="nav-link-inner--text"><FontAwesomeIcon icon={['fas', 'code']} size="sm" /> Codelab</span>
          </Nav.Link>
          <Nav.Link href="https://www.alcide.io/" target="_blank" className="p-0" style={{ color: '#FFF' }} >
            <span className="nav-link-inner--text"><FontAwesomeIcon icon={['fas', 'home']} /> Site</span>
          </Nav.Link>
          <Nav.Link href="https://twitter.com/alcideio" target="_blank" className="p-0" style={{ color: '#FFF' }} >
            <span className="nav-link-inner--text"><FontAwesomeIcon icon={['fab', 'twitter']} size="sm" /> Twitter</span>
          </Nav.Link>
        </Container>
      </div>
      <div className="col-sm-1"></div>
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
            <p className="text-secondary" style={{ "fontFamily": 'Roboto', "fontWeight": 300, "fontStyle": "thin", "fontSize": "16px" }}>
              Brought to You by <a href="https://www.alcide.io">Alcide's</a> Kubernetes Obsession
            </p>
          </span>
          <span>
            <p className="text-primary" style={{ "fontFamily": 'Source Code Pro', "fontWeight": 100, "fontStyle": "thin", "fontSize": "12px" }}>
              Scan Engine by <a href="https://www.alcide.io/kubernetes-advisor">Alcide Kubernetes Advisor</a>
            </p>
            <p>
              <a href="https://www.alcide.io/kubernetes-advisor">
                <img src="https://github.com/alcideio/skan/raw/master/img/skan.png" alt="" height="128" />
              </a>
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