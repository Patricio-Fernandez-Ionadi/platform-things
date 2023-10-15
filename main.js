import { Bootload } from './src/bootload'
import { Game, AUTO } from 'phaser'
import './style.css'

const config = {
	type: AUTO,
	// title: 'Jump Blocks',				// default ''
	// version: '0.1b',						// default ''
	fps: 50, // default 60
	render: {
		transparent: false, // default
		clearBeforeRender: true, // default
	},
	physics: {
		walls: {
			left: true,
			right: true,
			top: true,
			bottom: true,
		},
		enabled: true,
		default: 'arcade', //  'arcade', 'impact' or 'matter'
		arcade: {
			gravity: { y: 1100 },
			debug: false,
		},
	},
	banner: {
		hidePhaser: true,
		background: '#000',
	},
	url: '',
	plugins: null, // default null expects []
	width: 800,
	height: 450,
	pixelArt: true, // roundPixels: false,
	scene: [Bootload],
}

new Game(config)
