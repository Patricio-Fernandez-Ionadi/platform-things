export class Shaddy {
	constructor(scene) {
		this.scene = scene
		this.states = {
			idle: {
				key: 'idle',
			},
			walk: {
				key: 'walk',
			},
			hit: {
				key: 'gethit',
			},
			dead: {
				key: 'dead',
			},
			grab: {
				key: 'atk1',
			},
			atk2: {
				key: 'atk2',
			},
			explode: {
				key: 'atk3',
			},
		}
		this.state = this.states.idle.key

		this.abilities = {
			grab: {
				cd: 8,
				description:
					'If player is 110 or less units in range, it will grab and move him closer about the 50% of the distance between both of them.',
				dmg: 0,
				duration: 500,
				key: 'atk1',
				name: 'grab',
				range: {
					max: 180,
					min: 110,
				},
				ready: true,
			},
			atk2: {
				key: 'atk2',
				cd: 3,
			},
			explode: {
				cd: 4,
				description: '',
				dmg: 10,
				duration: 650,
				key: 'atk3',
				name: 'explode',
				range: {
					max: 100,
					min: 0,
				},
				ready: true,
			},
		}
		this.speed = 15

		this.active = false
		this.attacking = false
	}
	create() {
		this.shaddy = this.scene.physics.add.sprite(550, 300, 'shaddy')
		this.shaddy.setScale(3)
		this.shaddy.setCollideWorldBounds(true)
		this.shaddyAnimations = this.scene.cache.json.get('shadAnim')
		this.scene.anims.fromJSON(this.shaddyAnimations)
		this.x = this.shaddy.x
		this.facing = true
		console.log('shaddy created')
	}
	update(time, delta) {
		this.shaddy.anims.play(this.state, true)

		this.updateObjectValues()
		this.checkPlayerInRange()

		if (this.active) this.track()
	}
	updateObjectValues() {
		this.x = this.shaddy.x
		this.playerToRight = this.scene.info('player', 'x') > this.x + 30
		this.playerToLeft = this.scene.info('player', 'x') < this.x - 30
		this.distanceToPlayer = this.scene.distanceBetween('shaddy', 'player')
		this.facing ? this.shaddy.setFlipX(true) : this.shaddy.setFlipX(false)
	}
	setState(state) {
		this.state = this.states[state].key || this.states.idle.key
		this.shaddy.anims.play(this.state, true)
	}

	/* ------------------------------------------------------ */

	track() {
		this.setState('walk')

		if (this.playerToLeft) {
			this.facing = false
			this.shaddy.setVelocityX(-this.speed)
		}
		if (this.playerToRight) {
			this.shaddy.setVelocityX(this.speed)
			this.facing = true
		}
	}
	grab() {
		if (this.abilities.grab.ready) {
			this.setState('grab')
			this.handleCooldown('grab')
			this.active = false
			this.attacking = true
			this.shaddy.setVelocityX(0)

			setTimeout(() => {
				this.attacking = false
				this.active = true

				// if still in range apply dmg/effect
				if (this.inRangeAttack(this.abilities.grab)) {
					this.scene.attackEvent(
						'shaddy',
						this.abilities.grab,
						'player',
						() => {
							if (this.facing) {
								this.scene.player.translate(-this.distanceToPlayer / 2)
							} else {
								this.scene.player.translate(this.distanceToPlayer / 2)
							}
						}
					)
				}
				this.setState('idle')
			}, this.abilities.grab.duration)
		}
	}
	explode() {
		if (this.abilities.explode.ready) {
			this.setState('explode')
			this.handleCooldown('explode')
			this.active = false
			this.attacking = true
			this.shaddy.setVelocityX(0)

			setTimeout(() => {
				this.attacking = false
				this.active = true

				// if still in range apply dmg/effect
				if (this.inRangeAttack(this.abilities.explode)) {
					this.scene.attackEvent('shaddy', this.abilities.explode, 'player')
				}
				this.setState('idle')
			}, this.abilities.explode.duration)
		}
	}
	inRangeAttack(attack) {
		return (
			this.distanceToPlayer <= attack.range.max &&
			this.distanceToPlayer > attack.range.min
		)
	}
	checkPlayerInRange() {
		if (this.distanceToPlayer <= 250 && !this.attacking) this.active = true

		if (this.inRangeAttack(this.abilities.grab)) {
			if (!this.attacking && this.abilities.grab.ready) this.grab()
		}
		if (this.inRangeAttack(this.abilities.explode)) {
			if (!this.attacking && this.abilities.explode.ready) this.explode()
		}
	}
	handleCooldown(ability) {
		const ab = this.abilities[ability]
		const cd = ab.cd
		const cdSecs = cd * 1000

		ab.ready = false
		setTimeout(() => {
			ab.ready = true
		}, cdSecs)
	}

	/* ------------------------------------------------------ */
}
