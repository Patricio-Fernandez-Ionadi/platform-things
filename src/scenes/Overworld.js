import { Scene, Input } from 'phaser'
import { Player } from '../classes'
import { Shaddy } from '../gameObjects'

export class Overworld extends Scene {
	constructor() {
		super('Overworld')
	}

	create() {
		console.info('game created.')
		this.cursors = this.input.keyboard.createCursorKeys()
		this.#createCustomKeyboardInputs()

		this.player = new Player(this)
		this.player.create()

		this.shaddy = new Shaddy(this)
		this.shaddy.create()
	}

	update(time, delta) {
		this.player.update(time, delta)
		this.shaddy.update(time, delta)
	}

	info(e, prop) {
		return this[e][prop]
			? this[e][prop]
			: this[e].sprite[prop]
			? this[e].sprite[prop]
			: undefined
	}

	distanceBetween(e1, e2) {
		return Math.abs(this.info(e1, 'x') - this.info(e2, 'x'))
	}

	#createCustomKeyboardInputs() {
		this.cursors.Q = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.Q)
		this.cursors.W = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W)
		this.cursors.E = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.E)
		this.cursors.TAB = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.TAB)
	}

	attackEvent(em, atk, rec, cb) {
		const emmiter = this[em]
		const receptor = this[rec]

		if (atk.dmg > 0) receptor.takeDamage(atk.dmg)
		return cb && cb()
	}
}
