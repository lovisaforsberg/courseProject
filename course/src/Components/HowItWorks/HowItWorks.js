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
            <Card.Header className='hw_headline'><strong>Add a Bachelor</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
              Select a bachelor program and starting year to add all courses automaticlly. 
              You can remove or move courses later.
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
              Use the search function to find courses. 
              Add the course to your study plan if you have or plan to take the course.
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
            <Card.Header className='hw_headline'><strong>Get an Overview</strong></Card.Header>
            <Card.Meta>
              <p className='hw_date'>
              Click on a course to make changes and discover the main topics and subjects of your education
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
