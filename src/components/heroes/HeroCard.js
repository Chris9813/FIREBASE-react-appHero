import React from 'react'
import { Link } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages'



export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
}) => {
    return (
        <div className = "row row-cols-2" style={{maxWidth: 540}}>
        <div className="card-body">
            <img src = {heroImages(`./${id}.jpg`).default} className="card-img-top" alt="{superhero}"/>
        </div>
        
            <div className ="card-body">
                <h5 className = "card-title">{superhero}</h5>
                <p className ="card-text-center">{alter_ego}</p>
            
            {
                (alter_ego !== characters)
                    && <p className ="card-text">{characters}</p>
            }
            <p className ="card-text">
                <small>{first_appearance}</small> 
            </p>
            <Link className = "link-info" to={`./hero/${id}`}>
                Mas...
            </Link>
            </div>
        </div>
        
    )
}