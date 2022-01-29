import React, { useState, useEffect } from 'react'
import { LAUNCHES_QUERY } from '../../helpers/launches_query';
import { HeroCard } from './HeroCard';


export const HeroList = () => {
    
    const itemsperPage = 8
    
    const [actIndex, setActIndex] = useState(0);
    const [finIndex, setFinIndex] = useState(itemsperPage);

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

    
    
    const handleNext = () => {
        if(finIndex >= data.length)return
        setActIndex(actIndex + itemsperPage)
        setFinIndex(finIndex + itemsperPage)
    }

    const handlePrev = () => {

        if(actIndex === 0)return
        setActIndex(actIndex - itemsperPage)
        setFinIndex(finIndex - itemsperPage)

    }

    console.log(data.slice(actIndex, finIndex));

    return (
        <div className = "container">
            <button className="btn btn-info my-3 mx-5 col-4" onClick={handlePrev}>Anterior</button>
            <button className="btn btn-info my-3 mx-5 col-4" onClick={handleNext}>Siguiente</button>
            
            <div 
            className = "row row-cols-4 d-flex justify-content-center cards animate__animated animate__backInDown">
            <HeroCard data={data.slice(actIndex, finIndex)} />
        </div>
        </div>
    )
}
