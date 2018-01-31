import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './wellcome.css'

export default class WellcomePage extends Component {
    render() {
        return (
            <div className='main'>
               <div className='wellcome'> 
                 <h1 className='wellcomeMessage'>wellcome your registered</h1>
                 <Link className='wellcomeLink' to='/'> Sign in </Link>
               </div>
            </div>
        )
    }
}
