import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { LAUNCHES_QUERY } from '../../helpers/launches_query';



export const HeroScreen = ({history}) => {

    const [caract, setCaract] = useState(true);
    const [peliculas, setPeliculas] = useState(false);
    const [batallas, setBatallas] = useState(false);
    const [vehiculos, setVehiculos] = useState(false);

    const {heroeId} = useParams()

    const [data, setData] = useState([]);


    const getApi = async() => {
        const url = `https://swapi-graphql.netlify.app/.netlify/functions/index`
        const resp = await fetch(url, {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: LAUNCHES_QUERY }),
        });
        const {data} = await resp.json();
        setData(data.allPeople.people)
    }

    useEffect(() => {
        getApi()
    }, []);

    const hero = data.filter(person => person.name === heroeId)

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
    hero.map(item => console.log(item))

    return <div className='container my-4'>
    <button  onClick={() => setCaract(!caract)} className={caract ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">Caracteristicas</button>
            <button onClick={() => setPeliculas(!peliculas)} className={peliculas ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">Peliculas</button>
            <button onClick={() => setBatallas(!batallas)} className={batallas ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">Batallas</button>
            <button onClick={() => setVehiculos(!vehiculos)} className={vehiculos ? "btn btn-primary mx-4 my-2" : "btn btn-danger mx-4 my-2" } type="submit">vehiculos</button>
    <div className='d-flex justify-content-center row-cols-2'>
    {
                hero.map((item, i) => {
                    return <div key={i} className = "">
                    <ul className = "list-group list-grup-flush ">
                    {
                    caract && (
                        <div className=''>
                        <h5  className='mt-3'>Caracteristicas</h5>
                    <li key={item.names}     className="list-group-item"> <b>Nombre: </b>{item.name} </li>
                    <li key={item.gender }   className="list-group-item"> <b>Genero: </b>{item.gender} </li>
                    <li key={item.height }   className="list-group-item"> <b>Altura: </b>{item.height} cm </li>
                    <li key={item.eyeColor } className="list-group-item"> <b>Color de ojos: </b>{item.eyeColor} </li>
                    
                    <li key={item.mass}       className="list-group-item"> <b>Masa: </b>{item.mass} Kg </li>
                    <li key={item.skinColor}  className="list-group-item"> <b>Color de pelo: </b>{item.skinColor} </li>
                    <li key={item.homeworld}  className="list-group-item"> <b>Planeta nativo: </b>{!!item.homeworld && item.homeworld.name} </li>
                    <li key={item.species}    className="list-group-item"> <b>Especie: </b>{item.species !== null ? item.species.name : "Humano"} </li>
                        </div>
                        
                    )}
                    
                    {
                        peliculas && (
                            <>
                                <h4 key={"Peliculas"} className='mt-3'>Peliculas</h4>
                                {
                                    item.filmConnection.films.map((film, i) => {
                                        return (<div key={i}>
                                        <h5 key={film.title} className='mt-4'>Pelicula {i+1}: {film.title}</h5>
                                        <h6 key={film.director}>Director: {film.director}</h6>
                                        <h6>Planetas que aparecen:</h6>
                                        {film.planetConnection.planets.map((item, i) => {
                                                                            return (
                                                                            <ul key={i}>
                                                                                <li key={item.name}>{item.name}</li>
                                                                            </ul>
                                                                            
                                                                            )
                                                            }
                                                )}
                                        </div>
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
                        item.starshipConnection.starships.length > 0 ?
                                                    item.starshipConnection.starships.map((starship, i) => {
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
                        item.vehicleConnection.vehicles.length > 0 ?
                                                        item.vehicleConnection.vehicles.map((vehicle, i) => {
                                                        return <>
                                                        <h6 key={i} className="mt-4 mb-3"> <b>Vehiculo {i+1} </b></h6>
                                                        <ul className='list-group'>
                                                        
                                                        <li key={vehicle.name} className="list-group-item"> <b>Nombre:</b>  {vehicle.name} </li>
                                                        <li key={vehicle.model} className="list-group-item"> <b>Modelo:</b>  {vehicle.model} </li>
                                                        <li key={vehicle.length} className="list-group-item"> <b>Longitud:</b>  {vehicle.length} metros </li>
                                                        <li key={vehicle.vehicleClass} className="list-group-item"> <b>Clase de vehiculo:</b>  {vehicle.vehicleClass} </li>
                                                        <li key={vehicle.crew + i} className="list-group-item"> <b>Tripulacion:</b>  {vehicle.crew} {vehicle.crew > 1 ? "personas" : "persona"} </li>
                                                        
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
            </div>
    </div>
}
