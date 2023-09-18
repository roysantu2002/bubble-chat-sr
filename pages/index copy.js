import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { motion, AnimatePresence } from 'framer-motion';

import { useState } from 'react';

const transition = {
	type: 'spring',
	stiffness: 200,
	mass: 0.2,
	damping: 20,
};

const variants = {
	initial: {
		opacity: 0,
		y: 300,
	},
	enter: {
		opacity: 1,
		y: 0,
		transition,
	},
};
export default function Home() {
	const [chatMessages, setChatMessages] = useState([]);
	const [text, setText] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);

	// const handleChange = (e) => {
	// 	setText(e.target.value);
	// 	setIsExpanded(e.target.value.length > 0);
	// };

	const handleChange = (e) => {
		setText(e.target.value);
		e.target.style.width = e.target.value.length + 1 + 'ch'; // Adjust input width based on content length
	};

	// const handleKeyPress = (e) => {
	// 	if (e.key === 'Enter' && e.target.value.trim() !== '') {
	// 		setChatMessages([...chatMessages, e.target.value.trim()]);
	// 		e.target.value = '';
	// 	}
	// };

	const ChatBubble = ({ text }) => {
		return <div className='talk-bubble round'>{text}</div>;
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			setChatMessages([...chatMessages, e.target.value.trim()]);
			e.target.value = '';
			e.preventDefault(); // Prevent the default behavior of the Enter key
		}
	};

	console.log(chatMessages);

	return (
		<div className='container'>
			<Head>
				<title>Simple Chat App</title>
				<meta name='description' content='Simple chat app in Next.js' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<AnimatePresence>
					{chatMessages.map((message, index) => (
						<div key={index} className='bubble left'>
							{message}
						</div>
						// <ChatBubble key={index} text={message} />
					))}

					{/* <ol className={styles['list']}>
						{chatMessages.map((item, index) => (
							<motion.li
								key={index}
								className={styles['sent']}
								initial='initial'
								animate='enter'
								variants={variants}
								layout
							>
								{item.message}
							</motion.li>
						))}
					</ol> */}
				</AnimatePresence>
				{/* <ol className={styles.list}>
					{chatMessages.map(({ message, index }) => (
						<li key={index} className='sent'>
							<ChatBubble key={index} text={message} />
						</li>
					))}
				</ol> */}
				{/* <div className='chat-screen'>
					{chatMessages.map((message, index) => (
						<ChatBubble key={index} text={message} />
					))}
				</div> */}
				<input
					type='text'
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					className={isExpanded ? 'green-input expanded' : 'green-input'}
				/>
			</main>

			<style jsx>{`
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
					color: #008000;
					caret-color: #008000;
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
