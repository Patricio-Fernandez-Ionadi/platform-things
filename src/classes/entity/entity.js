export class Entity {
	constructor(scene, configuration) {
		this.scene = scene

		this.states = {
			idle: '',
			stand: '',
			walk: '',
			run: '',
			jump: '',
			attack: '',
			faint: '',
			hurt: '',
		}
		this.currentState = null
		this.abilities = {}

		this.scale = configuration?.scale ? configuration.scale : 1
		this.health = configuration?.health ? configuration.health : 100
		this.facing =
			configuration?.facing !== undefined ? configuration.facing : false

		this.attacking = false
	}

	addSprite(x, y, source) {
		this.sprite = this.scene.physics.add.sprite(x, y, source)
	}
	handleCooldown(state) {
		this.abilities[state].ready = false
		setTimeout(() => {
			this.abilities[state].ready = true
		}, this.abilities[state].cd * 1000)
	}
}
