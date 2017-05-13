/* eslint-disable */
import React, { Component } from 'react'
import Select from 'react-select'
import Post from './Post'
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
			trending: [],
			content: [],
			accounts: []

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
		steem.api.getState(`/trending/${val.value}`, (err, result) => {
            
            this.setContentObj(result.content)
            this.setAccountObj(result.accounts)
            
            console.log(`/trends/${val.value}`, result);
		})
	}

	/*getSelectedTrendingTopic() {

	}*/
	setAccountObj = (obj) => {
		let arr = []
	  
	  $.each(obj, function(k, v) {
	    arr.push({name: k, body: v.json_metadata})
	  });
	  this.setState({accounts: arr})
	  console.log('accounts arr ', arr)
	}

	setContentObj = (obj) => {
		let arr = []
	  
	  $.each(obj, function(k, v) {
	    arr.push({name: k, body: v.body})
	  });
	  this.setState({content: arr})
	  console.log('accounts arr ', arr)
	}

	mapOptions = (vals) => {
		console.log('Trending', vals)
		return vals.map(val => ({ label: val, value: val}))
	}

	render() {
		const { trending, selectedTrend, accounts, content } = this.state
		console.log('accounts', accounts)
		console.log('content', content)
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
				{content && content.map(({name,body}) => (
					<div className="ui grid">
						<Post title={name} content={body} />
					</div>
				))}
				{accounts && accounts.map(({name,body}) => (
					<div className="ui grid">
						<Post title={name} content={body} />
					</div>
				))}
			</div>
		)
	}
}

export default SteemExplorer