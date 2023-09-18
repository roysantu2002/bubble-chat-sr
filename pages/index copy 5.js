import Head from 'next/head';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const transition = {
	type: 'spring',
	stiffness: 200,
	mass: 0.2,
	damping: 20,
};

export default function Home() {
	const [chatMessages, setChatMessages] = useState([]);
	const [text, setText] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputs, setInputs] = useState(['']);

	useEffect(() => {
		const filteredMessages = chatMessages.filter(
			(message) => message.length <= 3
		);
		setChatMessages(filteredMessages);
	}, []);

	const handleChange = (e) => {
		setText(e.target.value);
		e.target.style.width = e.target.value.length + 1 + 'ch'; // Adjust input width based on content length
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && text.trim().length > 0) {
			const newMessage = text.trim();
			setChatMessages((prevMessages) => [...prevMessages, newMessage]);
			setText('');
			setInputs(['']);

			// Automatically remove older messages
			setTimeout(() => {
				setChatMessages((prevMessages) => prevMessages.slice(-2));
			}, 2000); // This timeout value (2000ms) can be adjusted
		}
	};

	return (
		<div className='container'>
			<Head>
				<title>Simple Chat App</title>
				<meta name='description' content='Simple chat app in Next.js' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='chat chat-start'>
				<div className='chat-header'>
					Obi-Wan Kenobi
					<time className='text-xs opacity-50'>2 hours ago</time>
				</div>
				<div className='chat-bubble'>You were the Chosen One!</div>
				<div className='chat-footer opacity-50'>Seen</div>
			</div>

			<AnimatePresence>
				<main className='main-container'>
					<div className='message-container'>
						{chatMessages.map((message, index) => (
							<div
								key={index}
								className={`message ${
									index === chatMessages.length - 1
										? 'chat-bubble expanded latest'
										: 'chat-bubble  expanded'
								}`}
							>
								{message}
								<div className='chat chat-start'>
									<div className='chat-bubble expanded'>{message}</div>
								</div>
							</div>
						))}
					</div>

					<input
						value={text}
						type='text'
						onKeyDown={handleKeyDown}
						onChange={handleChange}
						className={isExpanded ? 'green-input expanded' : 'green-input'}
					/>
				</main>
			</AnimatePresence>

			<style jsx>{`
				.message-container {
					display: flex;
					flex-direction: column;
					height: 200px; /* Set a fixed height for the message container */
				}

				@keyframes fadeOut {
					0% {
						opacity: 1;
					}
					100% {
						opacity: 0;
					}
				}

				.message {
					flex-shrink: 0; /* Prevent messages from shrinking */
					margin-bottom: 5px;
					padding: 10px;
					color: #000;
					background-color: #fff;
					border-radius: 10px;
					width: 100%; /* Added to make messages grow to 100% width *
				}

				.message:nth-last-child(n + 3) {
					animation: fadeOut 2s; /* Adjust the duration as needed */
				}

				.message.latest {
					opacity: 1; /* Keep the latest message fully visible */
				}

				.green-input {
					border-radius: 20px;
					-webkit-border-radius: 20px;
					-moz-border-radius: 20px;
					--r: 20px;
					--t: 30px;
					border: none;
					border-top: 1px solid #ccc;
					padding: 10px;
					font-size: 16px;
					outline: none;
					background-color: #fff;
					color: #000;
					.caret-color: #008000;
					width: 0; /* Set initial width to 0 */
					min-width: 1ch;
					transition: width 0.3s; /* Add a transition for smooth growth */
				}

				.inputStyle {
					width: 100%;
					border: none;
					outline: none;
					color: #008000;
					resize: none;
					font-size: 16px;
					minheight: 2rem; /* Set a minimum height for the input */
				}

				.round {
					border-radius: 30px;
					-webkit-border-radius: 30px;
					-moz-border-radius: 30px;
				}

				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-color: #00ff00; /* Green screen color */
				}

				.bubble {
					border-radius: 20px;
					-webkit-border-radius: 20px;
					-moz-border-radius: 20px;
					--r: 20px; /* the radius */
					--t: 30px; /* the size of the tail */
					max-width: 300px;
					padding: calc(2 * var(--r) / 3);
					-webkit-mask: radial-gradient(
								var(--t) at var(--_d) 0,
								#0000 98%,
								#000 102%
							)
							var(--_d) 100% / calc(100% - var(--r)) var(--t) no-repeat,
						conic-gradient(at var(--r) var(--r), #000 75%, #0000 0)
							calc(var(--r) / -2) calc(var(--r) / -2) padding-box,
						radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / var(--r)
							var(--r) space padding-box;
					background: #fff;
					color: #000;
				}

				.left {
					--_d: 0%;
					border-left: var(--t) solid #0000;
					margin-right: var(--t);
					place-self: start;
				}

				.right {
					--_d: 100%;
					border-right: var(--t) solid #0000;
					margin-left: var(--t);
					place-self: end;
				}

				main {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					max-width: 600px;
					width: 100%;
					padding: 20px;
					gap: 20px;
				}

				.chat-screen {
					width: 100%;
				}
			`}</style>
		</div>
	);
}
