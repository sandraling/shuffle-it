import React from 'react'

export default function Card({ card, onClick }) {
 	const [fade, setFade] = React.useState(false)

	return (
		<React.Fragment>
			<div
				onClick={() => {
					setFade(true)
					onClick()
				}}
				onAnimationEnd={() => setFade(false)}
				className={`card ${fade ? 'fade' : ''}`}>
				{card}
			</div>
		</React.Fragment>
	)
}