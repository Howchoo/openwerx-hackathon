import React, { Component } from 'react'
import classNames from 'classnames'
import ChartComponent from './ChartComponent'

class Sentiment extends Component {

	constructor(props) {
		super(props)
		const { neg, pos } = props.post.sentiment
		const overallSentiment = parseFloat(pos) - parseFloat(neg)
		const isNegative = (Math.sign(overallSentiment) === -1) ? true : false
		console.log('isNegative', isNegative)
		this.state = {
			overallSentiment,
			isNegative
		}
	}

	render() {
		const {post, updateNum} = this.props
		const { overallSentiment, isNegative } = this.state
		return (
			<div className="five wide column">
				<h3>Sentiment</h3>
				<div className="ui statistics">
					<div className={classNames({ red: isNegative},{green: !isNegative},'statistic','corner')}>
						<div className="value">
							{isNegative ? '' : '+'}{overallSentiment.toFixed(3)}
						</div>
						<div className="label">
							{isNegative ? 'Negative' : 'Positive'}
						</div>
					</div>
				</div>
				<ChartComponent post={post} updateNum={updateNum} />
				<h3>Topics</h3>
				<span className="ui green label">Signet</span>
				<span className="ui label">Lorem</span>
				<span className={classNames('ui', 'red', 'label')}>Ipsum</span>
				<span className="ui green label">Dolar</span>
				<h3>Tags</h3>
				<span className="ui label">#sometag</span>
				<span className="ui label">#yolo</span>
				<span className="ui red label">#something</span>
				<span className="ui green label">#troloo</span>
			</div>
		)
	}
}

export default Sentiment
