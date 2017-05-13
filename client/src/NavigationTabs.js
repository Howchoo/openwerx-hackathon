import React, { Component } from 'react'

class NavigationTabs extends Component {
	constructor(props) {
		super()
	}

	render() {
		return (
			<div className="ui container">
				<div className="ui grid">
					<div className="eight wide column">
						<form className="ui form network-form" action="#" id="networkForm">
							<div className="fields">
								<div className="fourteen wide field">
									<select className="ui fluid search dropdown" name="network">
										<option value="">- Select Network for Analysis -</option>
										<option value="steemit">SteemIt</option>
									</select>
								</div>
								<div className="two wide field">
									<button type="submit" className="ui green button">Analyze</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="ui top attached tabular menu">
					<a className="active item" data-tab="first">Graph</a>
					<a className="item" data-tab="second">Sentiment Analysis</a>
				</div>
				<div className="ui bottom attached active tab segment" data-tab="first">
					<span className="ui orange ribbon label">SteemIt</span>
					@todo graph
				</div>
				<div className="ui bottom attached tab segment" data-tab="second">
					<div className="ui grid">
						<div className="eleven wide column">
							<span className="ui orange ribbon label">SteemIt</span>
							<div className="ui text container">
								<h1>Analyzing a single post</h1>
								<div className="ui divider"></div>
								<h2>This is some post title</h2>
								<div className="post__content post__content--truncated">
									<p>Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf ancestors, which would have been pack hunters with complex body language. These sophisticated forms of social cognition and communication may account for their trainability, playfulness, and ability to fit into human households and social situations, and these attributes have given dogs a relationship with humans that has enabled them to become one of the most successful species on the planet today.</p>
									<p>The dogs' value to early human hunter-gatherers led to them quickly becoming ubiquitous across world cultures. Dogs perform many roles for people, such as hunting, herding, pulling loads, protection, assisting police and military, companionship, and, more recently, aiding handicapped individuals. This impact on human society has given them the nickname "man's best friend" in the Western world. In some cultures, however, dogs are also a source of meat.</p>
									<p>Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf ancestors, which would have been pack hunters with complex body language. These sophisticated forms of social cognition and communication may account for their trainability, playfulness, and ability to fit into human households and social situations, and these attributes have given dogs a relationship with humans that has enabled them to become one of the most successful species on the planet today.</p>
									<p>The dogs' value to early human hunter-gatherers led to them quickly becoming ubiquitous across world cultures. Dogs perform many roles for people, such as hunting, herding, pulling loads, protection, assisting police and military, companionship, and, more recently, aiding handicapped individuals. This impact on human society has given them the nickname "man's best friend" in the Western world. In some cultures, however, dogs are also a source of meat.</p>
								</div>
								<button className="ui button" data-truncate="show">Show all</button>
							</div>
						</div>
						<div className="five wide column">
							<h3>Sentiment</h3>
							<div className="ui statistics">
								<div className="red statistic center">
									<div className="value">
										-0.5461
									</div>
									<div className="label">
										Negative
									</div>
								</div>
							</div>
							<canvas id="postSentiment" width="400" height="400"></canvas>
							<h3>Topics</h3>
							<span className="ui green label">Signet</span>
							<span className="ui label">Lorem</span>
							<span className="ui red label">Ipsum</span>
							<span className="ui green label">Dolar</span>
							<h3>Tags</h3>
							<span className="ui label">#sometag</span>
							<span className="ui label">#yolo</span>
							<span className="ui red label">#something</span>
							<span className="ui green label">#troloo</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NavigationTabs