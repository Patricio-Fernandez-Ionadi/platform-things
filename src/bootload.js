import { Scene } from 'phaser'
import { Overworld } from './scenes'

// resources
import playerSpritesheet from '../src/assets/character/character.png'
import shadAnimJSON from '../src/assets/enemies/shaddy/shaddy_anim.json'
import shaddyAtlas from '../src/assets/enemies/shaddy/shaddy_atlas.json'
import shaddyImage from '../src/assets/enemies/shaddy/shaddy.png'

export class Bootload extends Scene {
	constructor() {
		super({ key: 'bootload' })
	}

	preload() {
		console.info('loading...')

		this.load.spritesheet('player', playerSpritesheet, {
			frameWidth: 50,
			frameHeight: 37,
		})

		// ENEMIES
		//  - Shaddy
		this.load.json('shadAnim', shadAnimJSON)
		this.load.atlas('shaddy', shaddyImage, shaddyAtlas)
	}

	create() {
		console.info('resources loaded.')
		this.scene.add('Overworld', new Overworld()) // <- scene creation
		this.scene.start('Overworld') // <- play scene
	}
}
