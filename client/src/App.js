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
import { getMostRecent } from './utils'

class App extends Component {

	constructor() {
		super()

		this.state = {
			posts: [],
			postSentiment: {
				data: {
					labels: [
						"Positive",
						"Neutral",
						"Negative"
					],
					datasets: [{
						data: [0.274, 0.095, 0.631],
						backgroundColor: [
							"#4CAF50",
							"#FFC107",
							"#F44336"
						],
						hoverBackgroundColor: [
							"#43A047",
							"#FFB300",
							"#E53935"
						]
					}]
				}
			}
		}
	}
	
	componentDidMount() {
		let labels = []
		let newData = []
		

		const ctx = document.getElementById('postSentiment');

		const postSentiment = new Chart(ctx,{
			type: 'doughnut',
			data: this.state.postSentiment.data,
			options: {
				legend: {
					position: 'bottom'
				}
			}
		});

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

		

		// Get most recent posts
		getMostRecent()
			.then(({data}) => {
				
				const posts = data.map(post => post[0])
				console.log('The most recent feed', posts)
				this.setState({
					posts
				})
			})
	}
	render() {
		const { posts } = this.state
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
	                            <label>Live Analysis:</label>
	                            <div className="ui icon buttons">
	                                <button className="ui button active">
	                                    <i className="play icon"></i>
	                                </button>
	                                <button className="ui button">
	                                    <i className="pause icon"></i>
	                                </button>
	                            </div>
	                        </div>
	                    </div>
	                </div>
				</div>
				<div className="ui container">
					<TopSearch />

					<div className="ui top attached tabular menu">
						<a className="active item" data-tab="first">Graph</a>
						<a className="item" data-tab="second">Sentiment Analysis</a>
						<a className="item" data-tab="third">Tags</a>
					</div>
					<div className="ui bottom attached active tab segment" data-tab="first">
						<span className="ui orange ribbon label">SteemIt</span>
						@todo graph
					</div>
					<SecondTab posts={posts} />
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
