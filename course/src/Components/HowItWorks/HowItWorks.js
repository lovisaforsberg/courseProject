import React, {useState, useContext} from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import NavBar from '../Navbar'
import './HowItWorks.css'
import {HowItWorksModal} from './../../App'
var one = require('./one.png')
var two = require('./two.png')
var three = require('./three.png')

const HowItWorks = () =>{

  const {HW_modal} = useContext(HowItWorksModal)
  const {isHWShown, setHWShown} = HW_modal

  const closePopup = () =>{
    setHWShown(false)
}


    return(

    <React.Fragment>
    
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modalHW">
        <div className="modal-headerHW">
          <h1 className='howitworksText'>
            <strong>HOW IT WORKS</strong>
           </h1>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={closePopup}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

    <div className='guideContainer'>
  
      <div className='aboutContainer'>
        <div className='imageDiv'>
          <img className='responsive' src={one} wrapped ui={false} />
          <Card.Content>
            <Card.Header className='hw_headline'><strong>Add bachelor courses</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
              Select a bachelor program and the starting year to add all bachelor courses to the study plan automatically. 
              If needed, you can remove and/or move courses later.
              </p>
            </Card.Meta>
          </Card.Content>
        </div>

        <div className='imageDiv'>
          <img
            className='responsive'
            id='image'
            src={two}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header className='hw_headline'><strong>Search for courses</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
              Use the search function to find master-, track specific-, or elective courses of your interest. 
              Click on a course to get detailed information about the course and to add it to your study plan.
              </p>
            </Card.Meta>
          </Card.Content>
        </div>

        <div className='imageDiv'>
          <img
            className='responsive'
            src={three}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header className='hw_headline'><strong>Get an overview</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
              In the study plan you get an overview of your education.
              Click on a year or period to discover the covered subjects and the sum of credits.
              Click on a course to move or remove it.
              </p>
            </Card.Meta>
          </Card.Content>
        </div>
      </div>
    </div>
    </div>
    </div>
    </React.Fragment>

    )}

export default HowItWorks
