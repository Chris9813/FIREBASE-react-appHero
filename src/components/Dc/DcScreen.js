import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const DcScreen = () => {
    return (
        <div>
        <h1>DC Screen</h1>
        <hr/>
        <div className ="container">
            <HeroList publisher = "DC Comics"/>
        </div>
        </div>
    )
}
