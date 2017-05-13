import React from 'react'
//import SteemExplorer from './SteemExplorer'
import Post from './Post'

const SecondTab = ({posts}) => (
	<div className="ui bottom attached tab segment" data-tab="second">
		{posts && posts.map((post,idx) => (
			<div className="ui grid" key={idx}>
				<Post title={post.title} content={post.summary_detail} />
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
		))}
	</div>
)

export default SecondTab