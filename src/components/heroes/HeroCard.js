import React from 'react'
import { Link } from 'react-router-dom'



export const HeroCard = ({
    name,
    eyeColor,
    height,
    homeworld,
    gender
}) => {
    return (

        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Caracteristicas</h6>
                <ul className="list-group">
                    <li className="list-group-item">Color de ojos: {eyeColor}</li>
                    <li className="list-group-item">Planeta hogar: {homeworld}</li>
                    <li className="list-group-item">Genero: {gender}</li>
                    <li className="list-group-item">Altura: {height} cm</li>
                </ul>
                <Link className = "link" to={`./personaje/${name}`}>
                Mas...
            </Link>
            </div>

    </div>

    )
}