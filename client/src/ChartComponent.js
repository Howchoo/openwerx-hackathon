/* eslint-disable*/
import React, { Component } from 'react'
import Chart from 'chart.js'

class ChartComponent extends Component {
	constructor(props) {
		super(props)
		const { neg, neu, pos } = props.post.sentiment
		let newData = [pos, neu, neg] || [0.274, 0.095, 0.631]
		this.state = {
			postSentiment: {
				data: {
					labels: [
						"Positive",
						"Neutral",
						"Negative"
					],
					datasets: [{
						data: newData,
						backgroundColor: [
							"#4CAF50",
							"#E8E8E8",
							"#F44336"
						],
						hoverBackgroundColor: [
							"#43A047",
							"#E0E0E0",
							"#E53935"
						]
					}]
				}
			}
		}
	}

	componentDidMount() {
		this.chart = $(this.chartRef)
		new Chart(this.chart, {
			type: 'doughnut',
			data: this.state.postSentiment.data,
			options: {
				legend: {
					position: 'bottom'
				}
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.updateNum !== nextProps.updateNum) {
			this.updateChart(nextProps)
		}
	}

	updateChart = (props) => {
		// get the new chart data
	}

	componentWillUnmount() {
		//this.chart.destroy()
	}

	render() {
		//const {} = this.props
		return (
			<canvas ref={(r) => this.chartRef = r} width="500px" height="500px"/>
		)
	}
}

export default ChartComponent
