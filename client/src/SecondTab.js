import React from 'react'
//import SteemExplorer from './SteemExplorer'
import Post from './Post'
import Sentiment from './Sentiment'

const SecondTab = ({posts, updateNum, allPosts, totalPosts}) => (
	<div className="ui bottom attached tab active segment" data-tab="second">
        <div className="ui active inverted dimmer loading-icon">
            <div className="ui text loader">Loading..</div>
        </div>
		{posts && posts.map((post,idx) => (
			<div className="ui stackable grid" key={post.id}>
				<Post title={post.title} content={post.summary_detail} id={post.id} url={post.url} />
				<Sentiment post={post} updateNum={updateNum} />
			</div>
		))}
	</div>
)

export default SecondTab
