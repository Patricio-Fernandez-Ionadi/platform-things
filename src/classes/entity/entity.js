export class Entity {
	constructor(scene, configuration) {
		this.scene = scene

		this.scale = configuration?.scale ? configuration.scale : 1
		this.health = configuration?.health ? configuration.health : 100

		if (configuration?.facing !== undefined) {
			if (configuration.facing === 'left' || configuration.facing === true) {
				this.facing = true
			} else if (
				configuration.facing === 'right' ||
				configuration.facing === false
			) {
				this.facing = false
			}
		} else this.facing = false

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
