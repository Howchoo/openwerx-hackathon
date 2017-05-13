/* eslint-disable */
import React, { Component } from 'react'
import Select from 'react-select'

class SteemExplorer extends Component {
	constructor(props) {
		super()
		this.state = {
			trends: {
				tag_idx: {
					trending: []
				}
			},
			selectedTrend: '',
			trending: []
		}
	}
	
	componentDidMount() {
		let trends = {}
		steem.api.getState('/trends', (err, result) => {
            
            this.setState({ trending: result.tag_idx.trending})
            console.log('The trends', trends);
		})
		
	}

	handleTrendingSelect = (val) => {
		console.log('Selected Trend', val)
		this.setState({
			selectedTrend: val.value
		})
		steem.api.getDiscussionsByTrending(val.value, (err, result) => {
			console.log('discussions by trending');
		  	console.log(err, result);
		});
	}

	getSelectedTrendingTopic() {

	}

	mapOptions = (vals) => {
		console.log('Trending', vals)
		return vals.map(val => ({ label: val, value: val}))
	}

	render() {
		const { trending, selectedTrend } = this.state

		const trendingOptions = this.mapOptions(trending)
		return (
			<div>
				<h2>Trending Topics</h2>
				<Select
					name='trending'
					value={selectedTrend}

					options={trendingOptions}
					onChange={this.handleTrendingSelect}
				/>
			</div>
		)
	}
}

export default SteemExplorer