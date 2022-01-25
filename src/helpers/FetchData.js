import { useEffect, useState } from 'react';


export const FetchData = () => {

    const LAUNCHES_QUERY = `
    {
        allPeople(after: "") {
          people {
            name
            gender
            eyeColor
            height
            mass
            birthYear
            skinColor
            species {
              name
            }
            homeworld {
              name
            }
            filmConnection {
              films {
                title
                director
                planetConnection {
                  planets {
                    name
                  }
                }
              }
            }
            starshipConnection {
              starships {
                name
              }
            }
            vehicleConnection {
              vehicles {
                name
                model
                vehicleClass
                manufacturers
                costInCredits
                length
                crew
              }
            }
          }
        }
      }
    `



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
        const getPeople = data.allPeople.people.map(person => {
            return{
                name: person.name,
                gender: person.gender,
                eyeColor: person.eyeColor,
                height: person.height,
                birthYear: person.birthYear,
                mass: person.mass,
                skinColor: person.skinColor,
                vehicle: person?.vehicleConnection.vehicles,
                homeworld: person?.homeworld.name,
                films: person?.filmConnection.films,
                starships: person?.starshipConnection.starships,
                
            }
        })
        return getPeople

    }

    const [state, setstate] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
            getApi()
            .then(x => setstate({
                data: x,
                loading: false
            }))
            .catch(() => {
                setstate({data: [], 
                    loading: false, 
                    error: "No se puedo cargagr la info, revisa el internet perra"})
                })
    }, [state.loading])
    
    return state.data

};
