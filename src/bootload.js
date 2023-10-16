import { Scene } from 'phaser'
import { Overworld } from './scenes/Overworld'

export class Bootload extends Scene {
	constructor() {
		super({ key: 'bootload' })
	}

	preload() {
		console.info('loading...')
		this.load.path = '../src/assets/'

		// PLAYER
		this.load.spritesheet('player', 'character/character.png', {
			frameWidth: 50,
			frameHeight: 37,
		})

		// ENEMIES
		//  - Shaddy
		this.load.json('shadAnim', 'enemies/shaddy/shaddy_anim.json')
		this.load.atlas(
			'shaddy',
			'enemies/shaddy/shaddy.png',
			'enemies/shaddy/shaddy_atlas.json'
		)
	}

	create() {
		console.info('resources loaded.')
		this.scene.add('Overworld', new Overworld()) // <- scene creation
		this.scene.start('Overworld') // <- play scene
	}
}
