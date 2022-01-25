import React from 'react'
import { HeroList } from '../heroes/HeroList'

export const TodosPersn = () => {
    return (
        <div>
        <h1>TODOS LOS PERSONAJES</h1>
        <hr/>
        <div className ="container">
            <HeroList />
        </div>
        </div>
    )
}
