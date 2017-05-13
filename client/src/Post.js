/* eslint-disable*/
import React, { Component } from 'react'


class Post extends Component {

	toggleShow = () => {

		    // show full text
		    $(this.toggleRef).parent().find('.post__content:first').removeClass('post__content--truncated');

		    // remove this button
		    $(this.toggleRef).remove();
	}

	render() {
		const { title, content, id, url, lang } = this.props
		return (
			<div className="eleven wide column">
				<span className="ui orange ribbon label">Newest Post {id}</span>
				<div className="ui text container">
					<h1>Analyzing Post {id}</h1>
					<div className="ui divider"></div>
					<h2 className="ui header">
						{title} <div className="ui red horizontal label">{lang}</div>
						<div className="sub header header__link">{url}</div>
					</h2>
					<div className="post__content post__content--truncated">
						{content}
					</div>
					<button 
						className="ui button"
						data-truncate="show"
						ref={(r) => this.toggleRef = r}
						onClick={this.toggleShow}
					>
							Show all
					</button>
				</div>
			</div>
		)
	}
}

export default Post
