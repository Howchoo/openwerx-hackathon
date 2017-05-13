/* eslint-disable */
import React, { Component } from 'react'
import Select from 'react-select'

class SteemExplorer extends Component {
	constructor(props) {
		super()
		this.state = {
			trends: {},
			selectedTrend: ''
		}
	}
	
	componentDidMount() {
		let trends = {}
		steem.api.getState('/trends', function(err, result) {
            
            trends = result
            console.log('The trends', trends);
		})
		console.log('The trends', trends)
	}

	handleTrendingSelect = (val) => {
		console.log('Selected Trend', val)
		this.setState({
			selectedTrend: ''
		})
	}

	mapOptions = (vals) => {
		return vals.map(val => ({ label: val, value: val}))
	}

	render() {
		const { trends, selectedTrend } = this.state
		//const trendingOptions = this.mapOptions(trends.tag_idx.trending)
		return (
			<div>
				{/*<Select
					name='trending'
					value={selectedTrend}
					options={trendingOptions}
					onChange={this.handleTrendingSelect}
				/>*/}
			</div>
		)
	}
}

export default SteemExplorer