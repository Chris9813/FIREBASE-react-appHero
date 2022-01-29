import React from 'react'
import { Link } from 'react-router-dom'



export const HeroCard = ({
    data
}) => {
    return <>
    {
        data.map((item, i) => {
            return <div>
                <div key={i} className="card align-content-center my-3" >
            <div className="card-body">
                <h5 key={item.name} className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Caracteristicas</h6>
                <ul className="list-group">
                <li key={item.color} className="list-group-item">Color de ojos: {item.eyeColor}</li>
                <li key={item.gender} className="list-group-item">Genero: {item.gender}</li>
                <li key={item.height} className="list-group-item">Altura: {item.height} cm</li>
                </ul>
                <Link to={`./personaje/${item.name}`}>
                Mas...
            </Link>
            </div>

    </div>
            </div>

})
    }
    </>
}

{
    /*

    
        

    */
}