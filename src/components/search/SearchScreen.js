import React, { useEffect, useState } from 'react'
import queryString from "query-string";
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { LAUNCHES_QUERY } from '../../helpers/launches_query';




export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ""} = queryString.parse(location.search)

    const [values, handleInnputChange] = useForm({
        name: q,
    })
    const {name} = values

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

    const filt =  data.filter(person => person.name.toLocaleLowerCase().includes(name))
    
    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`?q=${name}`);
    }
    
    return (
        <div className='container'>
            <h1>Search Screen</h1>
            <hr/>
            <div className="row">
                <div className ="col-5">
                    <form onSubmit = {handleSearch}>
                        <input  
                        type = "text"
                        placeholder ="Find your hero"
                        className ="form-control"
                        onChange = {handleInnputChange}
                        name = "name"
                        value = {name}
                        autoComplete = "off"
                        />
                    <button 
                    onClick = {handleSearch}
                    className = "btn m-1 btn-block btn-outline-primary">
                        Search...
                    </button>
                    </form>
                </div>
                <div className ="col-7">
                    <h4>Results</h4>
                    <hr/>
                    {q === "" && 
                                <div id = "infoIni" className = "alert alert-info">
                                search a hero
                                </div>}
                    {(q !== "" && filt.length === 0)
                            &&
                            <div className = "alert alert-warning">
                            There is no a hero {q}, search anoter thing
                            </div>}
                            <div>
                                <HeroCard data={filt}/>
                            </div>
                        
                </div>
            </div>
        </div>
    )
}
