import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import proffyAPI from '../../services/proffyAPI'

import './styles.css'


function Landing() {
  
    // setTotalConnections is not a function that will be called by me.
    // (1): the React will call useEffect, that in turn will call setTotalConnections.
    // (2): React will pass the result of setTotalConnections to the state var totalConnections.

    // (2)
    const [totalConnections, setTotalConnections] = useState(0)

    // (1)
    useEffect(() => {
        proffyAPI.get('connections').then(response => {
            //console.log(response)
            setTotalConnections(response.data.total)
        })
    }, [])  // If array is empty, useEffect will be called once on screen render. 
            // If filled with a var, useEffectwill be called everytime var value changes

    return (
        <div id="page-landing">
        	<div id="page-landing-content" className="container">
        		<div className="logo-container">
        			<img src={logoImg} alt="Proffy"/>
        			<h2>Sua plataforma de estudos online!</h2>
        		</div>
        		<img src={landingImg} alt="" className="hero-image"/>
        		<div className="buttons-container">
        			<Link to="/study" className="study">
        				<img src={studyIcon} alt=""/>
        				Estudar
        			</Link>
        			<Link to="/give-classes" className="give-classes">
        				<img src={giveClassesIcon} alt=""/>
        				Dar aulas
        			</Link>
        		</div>
        		<span className="total-connections">
        			Total de {totalConnections} conexões realizadas!
        			<img src={purpleHeartIcon} alt=""/>
        		</span>
        	</div>
        </div>
    )
}

export default Landing;
