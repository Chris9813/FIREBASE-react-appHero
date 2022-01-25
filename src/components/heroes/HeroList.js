import React, { useState } from 'react'
import { FetchData } from '../../helpers/FetchData';
import { HeroCard } from './HeroCard';


export const HeroList = () => {
    
    const itemsperPage = 5
    const dat = FetchData()
    
    const [actIndex, setActIndex] = useState(0);
    const [finIndex, setFinIndex] = useState(itemsperPage);

    
    const handleNext = () => {
        if(finIndex >= dat.length)return
        setActIndex(actIndex + itemsperPage)
        setFinIndex(finIndex + itemsperPage)
    }

    const handlePrev = () => {

        if(actIndex === 0)return
        setActIndex(actIndex - itemsperPage)
        setFinIndex(finIndex - itemsperPage)

    }

    

    return (
        <div className = "container">
            <button className="btn btn-info my-3 mx-5 col-4" onClick={handlePrev}>Anterior</button>
            <button className="btn btn-info my-3 mx-5 col-4" onClick={handleNext}>Siguiente</button>
            
            <div 
            className = "row row-cols-3 animate__animated animate__backInDown">
        

        {
            dat.filter((hero, i) => {return  i >= actIndex && i <= finIndex }).map((hero,i) => (
            <div key={i} className = "col">
                <HeroCard 
                key = {hero.name}
                {...hero}
                />
            </div>
            ))
        }
        </div>
        </div>
    )
}
