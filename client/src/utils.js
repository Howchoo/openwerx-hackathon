import axios from 'axios'

export const getMostRecent = () => {
	return axios.get('http://localhost:5000/most_recent')
		
}