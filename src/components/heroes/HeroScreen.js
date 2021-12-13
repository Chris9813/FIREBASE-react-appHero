import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import {getHeroesById}  from '../selectors/getHeroesById'
//import batman from "../../assets/heroes/dc-batman.jpg"
const heroImages = require.context("../../assets/heroes", true)



export const HeroScreen = ({history}) => {
    const {heroeId} = useParams()
    const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

    if(!hero[0]){
        return <Redirect to ="/" />
    }

    const handleReturn = () => {
        if(history.length <= 2){
            history.push("/")
        } else{
            history.goBack();
        }
    }
    const heroes = hero[0]
    const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
    } = heroes


    return (

    <div>
        <div className="row mt-5">
            <div className ="col-4">
                <img 
                    //src={`../assets/heroes/${heroeId}.jpg`}// desde public/assets
                    //src={batman}// con imp

                    src = {heroImages(`./${heroeId}.jpg`).default}
                    alt = {superhero}
                    className = "img-thumbnail animate__animated animate__backInRight"
                    />
            </div>
            <div className ="col-8">
                <h3>{superhero}</h3>
                <ul className = "list-group list-grup-flush">
                    <li className="list-group-item"> <b>Alter ego: </b>{alter_ego} </li>
                    <li className="list-group-item"> <b>Publisher: </b>{publisher} </li>
                    <li className="list-group-item"> <b>First appearence: </b>{first_appearance} </li>
                </ul>
                <h5>Characters</h5>
                <p>{characters}</p>
                <button className ="btn btn-outline-info"
                onClick = {handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    </div>
    )
}
