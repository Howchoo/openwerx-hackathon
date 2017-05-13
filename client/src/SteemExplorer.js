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
			accounts: [],
			neuralNet: {}
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
            //try {
            	this.createNeuralNet(result)
        	//}
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

	createNeuralNet = (obj) => {
		let nodes = []
		let edges = []
		let s = new sigma('neuralNet')
		let n = 0
		$.each(obj.accounts, (k, v) => {
			nodes.push({
				id: `${v.id}`,
				label: v.name,
				x: v.post_count,
				y: v.posting_rewards,
				size: v.voting_power
			})
			if(n%2 ===0) {
				s.graph.addNode({
					id: `${v.id}`,
					label: v.name,
					x: v.posting_rewards,
					y: v.post_count,
					size: v.voting_power
				})
			} else {
				s.graph.addNode({
					id: `${v.id}`,
					label: v.name,
					x: v.post_count,
					y: v.posting_rewards,
					size: v.voting_power
				})
			}
			n++
			
		})

		console.log('accounts for neural net', nodes)
		let edgeLength = 0
		$.each(obj.content, (k, v) => {
			edgeLength++
		})
		console.log('edge length', edgeLength)
		let i = 0
		$.each(obj.content, (k, v) => {
			if(i<nodes.length-1) {
				console.log(`i ${i} in`)
				edges.push({
					id: `${v.id}`,
					source: nodes[Math.floor(Math.random() * (nodes.length-1 - 0)) + 0].id,
					target: nodes[Math.floor(Math.random() * (nodes.length-1 - 0)) + 0].id
				})
				s.graph.addEdge({
					id: `${v.id}`,
					source: nodes[Math.floor(Math.random() * (nodes.length-1 - 0)) + 0].id,
					target: nodes[Math.floor(Math.random() * (nodes.length-1 - 0)) + 0].id
				})
			}
			console.log(`i ${i} out`)
			i++
		})

		console.log('content edges for neural net', edges)
		const neuralNet = {
			nodes,
			edges
		}
		console.log('Neural net object ', JSON.stringify(neuralNet))
		this.setState({ neuralNet: JSON.stringify(neuralNet) })

		

		s.refresh()
			$(this.Net).css({'width':'800px'},{'height':'500px'})
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
				<div id='neuralNet' ref={r => this.Net = r} width="800px" height="500px" style={{height: '500px'}}></div>
				<Select
					name='trending'
					value={selectedTrend}
					options={trendingOptions}
					onChange={this.handleTrendingSelect}
				/>
				<div id='neuralNet' ref={r => this.Net = r} width="800px" height="500px"></div>
				{content && content.map(({name,body},idx) => (
					<div className="ui grid" key={idx}>
						<div className="eight wide column">
							<Post title={name} content={body} />
						</div>
					</div>
				))}
				{accounts && accounts.map(({name,body},idx) => (
					<div className="ui grid" key={idx}>
						<div className="eight wide column">
							<Post title={name} content={body} />
						</div>
					</div>
				))}
			</div>
		)
	}
}

export default SteemExplorer