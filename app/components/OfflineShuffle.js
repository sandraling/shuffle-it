import React from 'react'
import Card from './Card'

const presets = {
	aeonsEnd: {
		cards: ['1', '1', '2', '2', 'Nemesis', 'Nemesis']
	}
}

function aeonsEndReducer(state, action) {
	if (action === 'next') {
		const { deck, discardPile, originalDeck } = state
		if (deck.length > 0) {
			const dealtCard = deck.splice(Math.floor(Math.random()*deck.length), 1)
			return {
				...state,
				card: dealtCard,
				deck: deck,
				discardPile: discardPile.concat(dealtCard),
				error: ''
			}
		} else {
			return {
				...state,
				card: 'Shuffled',
				deck: originalDeck.slice(),
				discardPile: [],
				error: ''
			}
		}
	} else if (action === 'nemesesReturns') {
		const { deck, discardPile } = state
		const discardedNemeses = discardPile.filter(c => c === 'Nemesis')
		return {
			...state,
			deck: deck.concat(discardedNemeses),
			discardPile: discardPile.filter(c => c !== 'Nemesis'),
			error: ''
		}
	} else {
		return {
			...state,
			error: 'Unknown command'
		}
	}
}

const aeonsEndInitialState = {
	card: 'Flip Me',
	originalDeck: presets.aeonsEnd.cards,
	deck: presets.aeonsEnd.cards.slice(),
	discardPile: [],
	error: ''
}

export default function OfflineShuffle() {
	const [state, dispatch] = React.useReducer(
		aeonsEndReducer,
		aeonsEndInitialState
	)

	const { card, cardFade, deck, discardPile } = state

	return (
		<div className='container'>
			<Card
				card={state.card}
				onClick={() => dispatch('next')}/>
			<ul className='description'>
				<li>
					<div className='bold'>Deck</div>
					<div>{deck.length > 0 ? deck.join(', ') : '∅. Shuffling next!'}</div>
				</li>
				<li>
					<div className='bold'>Discard pile</div>
					<div>{discardPile.length > 0 ? discardPile.join(', ') : '∅'}</div>
				</li>
				<button 
					onClick={() => dispatch('nemesesReturns')}
					disabled={discardPile.filter(c => c === 'Nemesis').length === 0}>
					Shuffle discarded Nemeses to deck
				</button>
			</ul>
		</div>
	)
}

// function notification({ duration, message, onClick }) {
// 	const [show, setShow] = React.useState(false)
// 	const id = React.useRef(null)

// 	const clear = () => window.clearInterval(id.current)

// 	React.useEffect(() => {
// 		id.current = window.setInterval(() => {
// 			setShow(false)
// 		}, duration*1000)

// 		return clear
// 	}, [])

// 	return (
// 		{show && 
// 			<div className='notif'
// 				onClick={onClick}>
// 				{message}
// 			</div>
// 		}
// 	)
// }