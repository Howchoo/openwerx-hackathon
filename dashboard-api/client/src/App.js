import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import { API_BASE } from './utils'
import axios from 'axios'

class App extends Component {
  state = {
    selectedFoods: [],
    translate: ''
  }
  componentDidMount() {
  	axios.get(`${API_BASE}/google/translate`)
  		.then(({data}) => {
  			this.setState({
  				translate: data
  			})
  		})
  	console.log('api base', API_BASE)
  }

  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  }

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  }

  render() {
    const { selectedFoods, translate } = this.state;

    return (
      <div className='App'>
        <div className='ui text container'>
        	<h2>{translate}</h2>
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch
            onFoodClick={this.addFood}
          />
        </div>
      </div>
    );
  }
}

export default App;
