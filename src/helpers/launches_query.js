export const LAUNCHES_QUERY = `
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