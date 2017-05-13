import React from 'react'

const TopSearch = () => (
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
)

export default TopSearch