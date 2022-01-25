import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { FetchData } from '../../helpers/FetchData'



export const HeroScreen = ({history}) => {

    const [caract, setCaract] = useState(true);
    const [peliculas, setPeliculas] = useState(false);
    const [batallas, setBatallas] = useState(false);
    const [vehiculos, setVehiculos] = useState(false);

    const {heroeId} = useParams()

    const hero = FetchData().filter(person => person.name === heroeId)


    if(!hero){
        return <Redirect to ="/" />
    }

    const handleReturn = () => {
        if(history.length <= 2){
            history.push("/")
        } else{
            history.goBack();
        }
    }

    const heroes =  () => {
        return hero.map(x =>{ return ({
            names: x.name,
            gender: x.gender,
            films: x.films,
            starships: x.starships,
            eyeColor: x.eyeColor,
            height: x.height,
            homeworld: x.homeworld,
            birthYear: x.birthYear,
            mass: x.mass,
            skinColor: x.skinColor,
            vehicle: x.vehicle,
            species: x.species
            
        })})
    }

    const data = heroes()

    const extr = () => {
        if(data.length > 0){
            return  [data[0]]
        }else{
            return []
        }
        
    }

    return (

    <div>
        <div className='row col-10'>
        </div>

        <div className="row mt-2 mb-2">
            <div className ="col-2">
            </div>
            <div className ="col-8">
            <button  onClick={() => setCaract(!caract)} className={caract ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">Caracteristicas</button>
            <button onClick={() => setPeliculas(!peliculas)} className={peliculas ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">Peliculas</button>
            <button onClick={() => setBatallas(!batallas)} className={batallas ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">Batallas</button>
            <button onClick={() => setVehiculos(!vehiculos)} className={vehiculos ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">vehiculos</button>
            
            
            {
                extr().map((item, i) => {
                    return <div key="list" className = "list-group list-grup-flush">
                    <ul key={i} className = "list-group list-grup-flush">
                    {
                    caract && (
                        <>
                        <h5  className='mt-3'>Caracteristicas</h5>
                    <li key={item.names} className="list-group-item"> <b>Nombre: </b>{item.names} </li>
                    <li key={item.gender }  className="list-group-item"> <b>Genero: </b>{item.gender} </li>
                    <li key={item.height }  className="list-group-item"> <b>Altura: </b>{item.height} cm </li>
                    <li key={item.eyeColor }  className="list-group-item"> <b>Color de ojos: </b>{item.eyeColor} </li>
                    <li key={item.homeworld }  className="list-group-item"> <b>Planeta Nativo: </b>{item.homeworld} </li>
                    <li key={item.mass}  className="list-group-item"> <b>Masa: </b>{item.mass} Kg </li>
                    <li key={item.skinColor}  className="list-group-item"> <b>Color de pelo: </b>{item.skinColor} </li>
                    <li key={item.species }  className="list-group-item"> <b>Especie: </b>{item.species ? item.species : "Humano"} </li>
                        
                        </>
                        
                    )}
                    
                    {
                        peliculas && (
                            <>
                                <h4 key={"Peliculas"} className='mt-3'>Peliculas</h4>
                                {
                                    item.films.map((film, i) => {
                                        return (<>
                                        <h5 key={i+1} className='mt-4'>Pelicula {i+1}: {film.title}</h5>
                                        <h6 key={film.director}>Director: {film.director}</h6>
                                        <h6 key={"planet"}>Planetas que aparecen:</h6>
                                        {film.planetConnection.planets.map((item, i) => {
                                                                            return (
                                                                            <ul key={i}>
                                                                                <li key={item.name}>{item.name}</li>
                                                                            </ul>
                                                                            
                                                                            )
                                                            }
                                                )}
                                        </>
                                        )
                                    })
                                }
                        </>
                        )
                    }
                    
                    {
                        batallas && (
                            <>
                            <h5 className='mt-3'>Batallas</h5>
                            {
                        item.starships.length > 0 ?
                                                    item.starships.map((starship, i) => {
                                                        return <li key={i} className="list-group-item"> <b>Batalla {i+1} : </b>{starship.name} </li>
                                                    })
                                                    :  <li key={i+2} className="list-group-item"> Este personaje no ha luchado en ninguna batalla</li>
                            }
                            
                            </>
                        )
                    }

                    {
                        vehiculos && (
                            <>
                            <h5 className='mt-3'>Vehiculos</h5>
                            {
                        item.vehicle.length > 0 ?
                                                    item.vehicle.map((vehicle, i) => {
                                                        return <>
                                                        <h6 key={i} className="mt-4"> <b>Vehiculo {i+1} </b></h6>
                                                        <ul className='list-group'>
                                                        
                                                        <li key={vehicle.name} className="list-group-item"> <b>Nombre:</b>  {vehicle.name} </li>
                                                        <li key={vehicle.model} className="list-group-item"> <b>Modelo:</b>  {vehicle.model} </li>
                                                        <li key={vehicle.vehicleClass} className="list-group-item"> <b>Clase de vehiculo:</b>  {vehicle.vehicleClass} </li>
                                                        <li key={vehicle.crew + i} className="list-group-item"> <b>Tripulacion:</b>  {vehicle.crew} {vehicle.crew > 1 ? "personas" : "persona"} </li>
                                                        <li key={vehicle.length} className="list-group-item"> <b>Longitud:</b>  {vehicle.length} metros </li>
                                                        </ul>
                                                        
                                                        </>
                                                    })
                                                    :  <li key={i+2} className="list-group-item"> Este personaje no tiene vehiculos</li>
                            }
                            </>
                        )
                    }
                    

                </ul>
                    </div>
                })
                
            }

                <button className ="btn btn-outline-info mt-3"
                onClick = {handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    </div>
    )
}
