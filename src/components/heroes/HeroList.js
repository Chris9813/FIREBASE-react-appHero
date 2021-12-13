import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';


export const HeroList = ({publisher}) => {

    const heroes = useMemo(() => 
        getHeroesByPublisher(publisher), [publisher])

    return (
        <div className = "container">
            <div 
            className = "row row-cols-3 animate__animated animate__backInDown">
        {
            heroes.map(hero => (
                
            <div className = "col">
                <HeroCard 
                key = {hero.id}
                {...hero}
                />
            </div>
            ))
        }
        </div>
        </div>
    )
}
