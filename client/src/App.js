/* eslint-disable*/
import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Loader from './Loader';
import Chart from 'chart.js'
//const BarChart = require('react-chartjs').Bar;

import Header from './Header'
import SecondTab from './SecondTab'
import TopSearch from './TopSearch'
import NavigationTabs from './NavigationTabs'
import TagsTab from './TagsTab'
import Footer from './Footer'
import { getMostRecent, sleep } from './utils'

class App extends Component {

	constructor() {
		super()

		this.state = {
			posts: [],
			allPosts: [],
			play: false,
			updateNum: 0,
			totalPosts: 0
		}
	}
	
	componentDidMount() {

		/*
		 * Set up tabs
		 */
		$('.menu .item').tab();

		/*
		 * Network selection form
		 */
		$('#networkForm').on('submit', function(e) {
			e.preventDefault();

			// refresh the page to get new results
			location.reload();
		});

		this.getMostRecentData()

	}

	getMostRecentData = () => {
		// Get most recent posts
		return new Promise((resolve) => {
			getMostRecent()
				.then(({data}) => {
					
					const posts = data.map(post => post[0])
					console.log('The most recent feed', posts)
					this.setState((prevState) => ({
						posts: posts.map((p,idx) => ({...p, id: prevState.totalPosts+idx})),
						updateNum: ++prevState.updateNum,
						allPosts: [...posts, ...prevState.allPosts].map((p,idx) => ({...p, id: idx})),
						totalPosts: [...posts, ...prevState.allPosts].length
					}))
					console.log('All posts', this.state.allPosts)

					/*
					 * Hide the loading indicator
					 */
					$('.loading-icon').hide();

					resolve()
				})
		})
			
	}

	updateCount = () => {
		
		this.setState({ play: true})
		this.getMostRecentData()
		.then(() => this.setState({play: false}))

		/*const self = this
		let i = 3
		while(i > 0) {
			console.log('play', this.state.play)
			if(this.state.play === true) {
				console.log('play', this.state.play)
				setTimeout(() => {
					console.log('play', this.state.play)
					self.getMostRecentData()

				},1000)
			}
			i--
		}*/
	
	}
	

	render() {
		const { posts, updateNum, play, totalPosts, allPosts } = this.state
		return (
			<div className="ui container">
		  		<div className="ui container site-header">
	                <div className="ui grid">
	                    <div className="eight wide column">
							<h2 className="ui header">
								{/*<img src="img/logo.png" alt="DKE Grey Pill">*/}
								<div className="content">
									GNAT
									<div className="sub header">Grey Network Analysis Tool</div>
								</div>
							</h2>
						</div>
	                    <div className="eight wide column right aligned">
	                        <div className="two wide field">
	                            <label>Load More </label>
	                            <div className="ui icon buttons">
	                                <button className="ui button">
	                                    {play ? <div className="ui active inline loader"></div> : <i className="play icon" onClick={this.updateCount}></i>}
	                                </button>
	                            </div>
	                        </div>
	                    </div>
	                </div>
				</div>
				<div className="ui container">
					<TopSearch />

					<div className="ui top attached tabular menu">
						<a className="active item" data-tab="second">Sentiment Analysis</a>
						<a className="item" data-tab="first">Graph</a>
						<a className="item" data-tab="third">Topics</a>
					</div>
					<SecondTab posts={posts} updateNum={updateNum} totalPosts={totalPosts} allPosts={allPosts} />
					<div className="ui bottom attached tab segment" data-tab="first">
						<span className="ui orange ribbon label">SteemIt</span>
						@todo using <a href="http://sigmajs.org/">SigmaJS</a>
					</div>
					<TagsTab />
					<div className="footer">
						Made with &lt;3 by <a href="https://dkelabs.com/">DKE Labs</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
