import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import OfflineShuffle from './components/OfflineShuffle'

function App() {
	return (
		<React.Fragment>
			<OfflineShuffle />
		</React.Fragment>
	)
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)