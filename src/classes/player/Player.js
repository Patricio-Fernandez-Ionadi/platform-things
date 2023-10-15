import {
	FallLeft,
	FallRight,
	JumpLeft,
	JumpRight,
	JumpRollLeft,
	JumpRollRight,
	OnKneesLeft,
	OnKneesRight,
	RunLeft,
	RunRight,
	StandLeft,
	StandRight,
	SliceRight,
	SliceLeft,
	Attack1Right,
	Attack1Left,
	Attack3Right,
	Attack3Left,
	Attack2Right,
	Attack2Left,
	WeaponStandRight,
	WeaponStandLeft,
	WeaponDrawRight,
	WeaponDrawLeft,
	WeaponShealthRight,
	WeaponShealthLeft,
	HurtRight,
	HurtLeft,
} from './states.js'

export class Player {
	constructor(scene) {
		this.scene = scene
		this.statesList = {
			STAND_RIGHT: new StandRight(this),
			STAND_LEFT: new StandLeft(this),
			ON_KNEES_RIGHT: new OnKneesRight(this),
			ON_KNEES_LEFT: new OnKneesLeft(this),
			RUN_RIGHT: new RunRight(this),
			RUN_LEFT: new RunLeft(this),
			JUMPROLL_RIGHT: new JumpRollRight(this),
			JUMPROLL_LEFT: new JumpRollLeft(this),
			FALL_RIGHT: new FallRight(this),
			FALL_LEFT: new FallLeft(this),
			SLICE_RIGHT: new SliceRight(this),
			SLICE_LEFT: new SliceLeft(this),
			HANG_RIGHT: '12',
			HANG_LEFT: '13',
			HANG_RELEASE_RIGHT: '14',
			HANG_RELEASE_LEFT: '15',
			WEAPON_STAND_RIGHT: new WeaponStandRight(this),
			WEAPON_STAND_LEFT: new WeaponStandLeft(this),
			ATTACK_1_RIGHT: new Attack1Right(this),
			ATTACK_1_LEFT: new Attack1Left(this),
			ATTACK_2_RIGHT: new Attack2Right(this),
			ATTACK_2_LEFT: new Attack2Left(this),
			ATTACK_3_RIGHT: new Attack3Right(this),
			ATTACK_3_LEFT: new Attack3Left(this),
			HURT_RIGHT: new HurtRight(this),
			HURT_LEFT: new HurtLeft(this),
			FAINT_RIGHT: '26',
			FAINT_LEFT: '27',
			WEAPON_DRAW_RIGHT: new WeaponDrawRight(this),
			WEAPON_DRAW_LEFT: new WeaponDrawLeft(this),
			WEAPON_SHEALTH_RIGHT: new WeaponShealthRight(this),
			WEAPON_SHEALTH_LEFT: new WeaponShealthLeft(this),
			JUMP_RIGHT: new JumpRight(this),
			JUMP_LEFT: new JumpLeft(this),
			DIVE_RIGHT: '34',
			DIVE_LEFT: '35',
			SWIM_UP_RIGHT: '36',
			SWIM_UP_LEFT: '37',
			SWIM_RIGHT: '38',
			SWIM_LEFT: '39',
			CLIMB_RIGHT: '40',
			CLIMB_LEFT: '41',
		}
		this.currentState = this.statesList['HURT_RIGHT']

		this.scale = 4
		this.speed = this.scale * 100
		this.jumpBoost = 650
		this.abilities = {
			atk1: {
				cd: 3,
				range: 70,
				duration: 500,
				onCoolDown: false,
			},
			atk2: {
				cd: 0.5,
				range: 70,
				duration: 250,
				onCoolDown: false,
			},
			atk3: {
				cd: 10,
				range: 70,
				duration: 680,
				onCoolDown: false,
			},
		}
		this.health = 100
		this.facing = false
		this.holdingWeapon = false
	}
	create() {
		// Animations
		this.#createAnimations()

		// physic player
		this.player = this.scene.physics.add.sprite(200, 500, 'player')
		this.player.setScale(this.scale)
		this.player.setCollideWorldBounds(true)

		// this.player.setTint(0xff3333)
		// this.player.setAlpha(0.8)
		console.log('player created')
	}
	update() {
		this.updateObjectValues()
		this.currentState.handleInput(this.scene.cursors)
		this.currentState.animate()
	}
	updateObjectValues() {
		this.onFloor = this.player.body.velocity.y === 0
		this.isJumping = this.player.body.velocity.y < 0
		this.vx = this.player.body.velocity.x
		this.vy = this.player.body.velocity.y
		this.flipX = this.facing
	}
	setState(state) {
		if (this.facing) {
			this.currentState = this.statesList[`${state}_LEFT`]
		} else if (!this.facing) {
			this.currentState = this.statesList[`${state}_RIGHT`]
		}

		if (this.currentState.enter) this.currentState.enter()

		this.#handleCooldowns(state)
	}

	/* ------------------------------------------------------ */

	jump() {
		if (this.onFloor) this.player.setVelocityY(-this.jumpBoost)
	}
	translate(value) {
		this.player.x += value
	}
	slowPlayer(value) {
		if (this.vx > 0) this.vx -= value
		if (this.vx < 0) this.vx += value
	}
	getHurt(atkdmg) {
		this.health -= atkdmg
		this.setState('HURT')

		this.scene.tweens.add({
			targets: this.player,
			duration: 50,
			repeat: 3,
			alpha: 0.5,
			yoyo: true,
		})
	}

	playAnimation(state) {
		this.player.play(state, true)
	}
	toggleWeapon() {
		this.holdingWeapon = !this.holdingWeapon
		return this.holdingWeapon
	}

	/* ------------------------------------------------------ */

	#handleCooldowns(state) {
		if (state === 'ATTACK_1') {
			this.abilities.atk1.onCoolDown = true
			setTimeout(
				() => (this.abilities.atk1.onCoolDown = false),
				this.abilities.atk1.cd * 1000
			)
		}
		if (state === 'ATTACK_2') {
			this.abilities.atk2.onCoolDown = true
			setTimeout(
				() => (this.abilities.atk2.onCoolDown = false),
				this.abilities.atk2.cd * 1000
			)
		}
		if (state === 'ATTACK_3') {
			this.abilities.atk3.onCoolDown = true
			setTimeout(
				() => (this.abilities.atk3.onCoolDown = false),
				this.abilities.atk3.cd * 1000
			)
		}
	}
	#createAnimations() {
		const stand = {
			key: 'STAND',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [0, 1, 2, 3],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const on_knees = {
			key: 'ON_KNEES',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [4, 5, 6, 7],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const run = {
			key: 'RUN',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [8, 9, 10, 11, 12, 13],
			}),
			frameRate: 10,
			repeat: -1,
		}
		const jumproll = {
			key: 'JUMPROLL',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [/* 14,15,*/ 16, 17, 18, 19, 20, 21],
			}),
			frameRate: 8,
			repeat: 0,
		}
		const slice = {
			key: 'SLICE',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [24, 25, 26, 27, 28],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const fall = {
			key: 'FALL',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [22, 23],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const hang = {
			key: 'HANG',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [29, 30, 31, 32],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const hang_release = {
			key: 'HANG_RELEASE',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [33, 34, 35, 36, 37],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const weapon_stand = {
			key: 'WEAPON_STAND',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [38, 39, 40, 41],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const attack_1 = {
			key: 'ATTACK_1',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [42, 43, 44, 45, 46, 47],
			}),
			frameRate: 12,
			repeat: 0,
		}
		const attack_2 = {
			key: 'ATTACK_2',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [49, 50, 51],
			}),
			frameRate: 12,
			repeat: 0,
		}
		const attack_3 = {
			key: 'ATTACK_3',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [52, 53, 54, 55, 56, 57, 58],
			}),
			frameRate: 12,
			repeat: 0,
		}
		const hurt = {
			key: 'HURT',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [59, 60, 61],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const faint = {
			key: 'FAINT',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [62, 63, 64, 65, 66, 67, 68],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const weapon_draw = {
			key: 'WEAPON_DRAW',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [69, 70, 71, 72],
			}),
			frameRate: 8,
			repeat: 0,
		}
		const weapon_shealth = {
			key: 'WEAPON_SHEALTH',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [73, 74, 75, 76],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const jump = {
			key: 'JUMP',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [77, 78],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const dive = {
			key: 'DIVE',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [79, 80],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const swim_up = {
			key: 'SWIM_UP',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [81, 82, 83, 84, 85, 86],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const swim = {
			key: 'SWIM',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [87, 88, 89, 90],
			}),
			frameRate: 8,
			repeat: -1,
		}
		const climb = {
			key: 'CLIMB',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [91, 92, 93, 94],
			}),
			frameRate: 8,
			repeat: -1,
		}

		this.scene.anims.create(stand)
		this.scene.anims.create(on_knees)
		this.scene.anims.create(run)
		this.scene.anims.create(jumproll)
		this.scene.anims.create(fall)
		this.scene.anims.create(slice)
		this.scene.anims.create(hang)
		this.scene.anims.create(hang_release)
		this.scene.anims.create(weapon_stand)
		this.scene.anims.create(attack_1)
		this.scene.anims.create(attack_2)
		this.scene.anims.create(attack_3)
		this.scene.anims.create(hurt)
		this.scene.anims.create(faint)
		this.scene.anims.create(weapon_draw)
		this.scene.anims.create(weapon_shealth)
		this.scene.anims.create(jump)
		this.scene.anims.create(dive)
		this.scene.anims.create(swim_up)
		this.scene.anims.create(swim)
		this.scene.anims.create(climb)
		this.scene.anims.create({
			key: 'whiteFrame',
			frames: this.scene.anims.generateFrameNumbers('player', {
				frames: [95],
			}),
			frameRate: 0,
			repeat: 0,
		})
	}
}
