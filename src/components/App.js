import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let URL = '/api/pets'
    if (this.state.filters.type === 'cat') URL += '?type=cat'
    if (this.state.filters.type === 'dog') URL += '?type=dog'
    if (this.state.filters.type === 'micropig') URL += '?type=micropig'

    fetch(URL)
    .then(resp => resp.json())
    .then(pets => {
      this.setState({
        pets: pets
      })
    })
  }
  
  onAdoptPet = (petId) => {
    let petIndex = this.state.pets.findIndex(pet => {
      return pet.id === petId
    })
    
    this.setState({
      pets: [
        ...this.state.pets.slice(0, petIndex),
        {...this.state.pets[petIndex],
          isAdopted: true
        },
        ...this.state.pets.slice(petIndex+1)
      ]
    })
    
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
