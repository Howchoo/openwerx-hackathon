import React from 'react'
//import SteemExplorer from './SteemExplorer'
import Post from './Post'
import Sentiment from './Sentiment'

const SecondTab = ({posts, updateNum, allPosts, totalPosts}) => (
	<div className="ui bottom attached tab segment" data-tab="second">
		{posts && posts.map((post,idx) => (
			<div className="ui stackable grid" key={post.id}>
				<Post title={post.title} content={post.summary_detail} id={post.id} />
				<Sentiment post={post} updateNum={updateNum} />
			</div>
		))}
	</div>
)

export default SecondTab
