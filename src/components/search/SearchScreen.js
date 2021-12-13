import React, { useMemo } from 'react'
import queryString from "query-string";
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ""} = queryString.parse(location.search)

    const [values, handleInnputChange] = useForm({
        name: q,
    })
    const {name} = values
    const memo = useMemo(() => getHeroesByName(q), [q])
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
                    {(q !== "" && memo.length === 0)
                            &&
                            <div className = "alert alert-warning">
                            There is no a hero {q}, is a bich, search anoter thing
                            </div>}
                    {
                        memo.map(hero => {
                            return <HeroCard 
                            key = {hero.id}
                            {...hero}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
