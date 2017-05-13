import React from, { Component } 'react'

class Post extends Component {

	render() {
		const { title, content } = this.props
		return (
			<div className="eleven wide column">
				<span className="ui orange ribbon label">SteemIt</span>
				<div className="ui text container">
					<h1>Analyzing a single post</h1>
					<div className="ui divider"></div>
					<h2>{title}</h2>
					<div className="post__content post__content--truncated">
						{content}
					</div>
					<button className="ui button" data-truncate="show">Show all</button>
				</div>
			</div>
		)
	}
)

export default Post