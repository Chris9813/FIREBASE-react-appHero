import React from 'react'
import queryString from "query-string";
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { FetchData } from '../../helpers/FetchData';


export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ""} = queryString.parse(location.search)

    const [values, handleInnputChange] = useForm({
        name: q,
    })
    const {name} = values
    const filt =  FetchData().filter(person => person.name.toLocaleLowerCase().includes(name))
    
    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`?q=${name}`);
    }
    
    return (
        <div>
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
                    {
                        filt.map((person, i) => {
                            return <HeroCard 
                            key = {i}
                            {...person}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
