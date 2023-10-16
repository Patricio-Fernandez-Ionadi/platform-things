import { Entity } from '../index.js'
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

const playerConfig = {
	facing: false,
	scale: 4,
}
export class Player extends Entity {
	constructor(scene) {
		super(scene, playerConfig)
		this.states = {
			stand: {
				key: 'stand',
				dir: {
					right: new StandRight(this),
					left: new StandLeft(this),
				},
				animation: {
					key: 'stand',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [0, 1, 2, 3],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			on_knees: {
				key: 'on_knees',
				dir: {
					right: new OnKneesRight(this),
					left: new OnKneesLeft(this),
				},
				animation: {
					key: 'on_knees',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [4, 5, 6, 7],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			run: {
				key: 'run',
				dir: {
					right: new RunRight(this),
					left: new RunLeft(this),
				},
				animation: {
					key: 'run',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [8, 9, 10, 11, 12, 13],
					}),
					frameRate: 10,
					repeat: -1,
				},
			},
			jumproll: {
				key: 'jumproll',
				dir: {
					right: new JumpRollRight(this),
					left: new JumpRollLeft(this),
				},
				animation: {
					key: 'jumproll',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [/* 14,15,*/ 16, 17, 18, 19, 20, 21],
					}),
					frameRate: 8,
					repeat: 0,
				},
			},
			fall: {
				key: 'fall',
				dir: {
					right: new FallRight(this),
					left: new FallLeft(this),
				},
				animation: {
					key: 'fall',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [22, 23],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			slice: {
				key: 'slice',
				dir: {
					right: new SliceRight(this),
					left: new SliceLeft(this),
				},
				animation: {
					key: 'slice',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [24, 25, 26, 27, 28],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			hang: {
				key: 'hang',
				dir: {
					right: '12',
					left: '13',
				},
				animation: {
					key: 'hang',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [29, 30, 31, 32],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			hang_release: {
				key: 'hang_release',
				dir: {
					right: '14',
					left: '15',
				},
				animation: {
					key: 'hang_release',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [33, 34, 35, 36, 37],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			weapon_stand: {
				key: 'weapon_stand',
				dir: {
					right: new WeaponStandRight(this),
					left: new WeaponStandLeft(this),
				},
				animation: {
					key: 'weapon_stand',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [38, 39, 40, 41],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			cutUp: {
				key: 'cutUp',
				dir: {
					right: new Attack1Right(this),
					left: new Attack1Left(this),
				},
				animation: {
					key: 'cutUp',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [42, 43, 44, 45, 46, 47],
					}),
					frameRate: 12,
					repeat: 0,
				},
			},
			cutDown: {
				key: 'cutDown',
				dir: {
					right: new Attack2Right(this),
					left: new Attack2Left(this),
				},
				animation: {
					key: 'cutDown',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [49, 50, 51],
					}),
					frameRate: 12,
					repeat: 0,
				},
			},
			swift: {
				key: 'swift',
				dir: {
					right: new Attack3Right(this),
					left: new Attack3Left(this),
				},
				animation: {
					key: 'swift',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [52, 53, 54, 55, 56, 57, 58],
					}),
					frameRate: 12,
					repeat: 0,
				},
			},
			hurt: {
				key: 'hurt',
				dir: {
					right: new HurtRight(this),
					left: new HurtLeft(this),
				},
				animation: {
					key: 'hurt',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [59, 60, 61],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			faint: {
				key: 'faint',
				dir: {
					right: '26',
					left: '27',
				},
				animation: {
					key: 'faint',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [62, 63, 64, 65, 66, 67, 68],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			weapon_draw: {
				key: 'weapon_draw',
				dir: {
					right: new WeaponDrawRight(this),
					left: new WeaponDrawLeft(this),
				},
				animation: {
					key: 'weapon_draw',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [69, 70, 71, 72],
					}),
					frameRate: 8,
					repeat: 0,
				},
			},
			weapon_shealth: {
				key: 'weapon_shealth',
				dir: {
					right: new WeaponShealthRight(this),
					left: new WeaponShealthLeft(this),
				},
				animation: {
					key: 'weapon_shealth',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [73, 74, 75, 76],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			jump: {
				key: 'jump',
				dir: {
					right: new JumpRight(this),
					left: new JumpLeft(this),
				},
				animation: {
					key: 'jump',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [77, 78],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			dive: {
				key: 'dive',
				dir: {
					right: '34',
					left: '35',
				},
				animation: {
					key: 'dive',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [79, 80],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			swim_up: {
				key: 'swim_up',
				dir: {
					right: '36',
					left: '37',
				},
				animation: {
					key: 'swim_up',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [81, 82, 83, 84, 85, 86],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			swim: {
				key: 'swim',
				dir: {
					right: '38',
					left: '39',
				},
				animation: {
					key: 'swim',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [87, 88, 89, 90],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
			climb: {
				key: 'climb',
				dir: {
					right: '40',
					left: '41',
				},
				animation: {
					key: 'climb',
					frames: this.scene.anims.generateFrameNumbers('player', {
						frames: [91, 92, 93, 94],
					}),
					frameRate: 8,
					repeat: -1,
				},
			},
		}
		this.currentState = this.states.stand.dir.right

		this.speed = this.scale * 100
		this.jumpBoost = 650
		this.abilities = {
			cutUp: {
				cd: 3,
				range: 70,
				duration: 500,
				ready: true,
			},
			cutDown: {
				cd: 0.5,
				range: 70,
				duration: 250,
				ready: true,
			},
			swift: {
				cd: 10,
				range: 70,
				duration: 680,
				ready: true,
			},
		}
		this.holdingWeapon = false
	}
	create() {
		// Animations
		this.#createAnimations()

		// physic player
		this.addSprite(200, 500, 'player')
		this.sprite.setScale(this.scale)
		this.sprite.setCollideWorldBounds(true)
	}
	update() {
		this.updateObjectValues()
		this.currentState.handleInput(this.scene.cursors)
		this.currentState.animate()
	}
	updateObjectValues() {
		this.onFloor = this.sprite.body.velocity.y === 0
		this.isJumping = this.sprite.body.velocity.y < 0
		this.vx = this.sprite.body.velocity.x
		this.vy = this.sprite.body.velocity.y
		this.setFacing()
	}
	setState(state) {
		if (this.facing) {
			this.currentState = this.states[state.key].dir.left
		} else if (!this.facing) {
			this.currentState = this.states[state.key].dir.right
		}

		if (this.currentState.enter) this.currentState.enter()
	}

	/* ------------------------------------------------------ */

	jump() {
		if (this.onFloor) this.sprite.setVelocityY(-this.jumpBoost)
	}
	translate(value) {
		this.sprite.x += value
	}
	slowPlayer(value) {
		if (this.vx > 0) this.vx -= value
		if (this.vx < 0) this.vx += value
	}
	takeDamage(atkdmg) {
		this.health -= atkdmg
		this.setState(this.states.hurt)

		this.scene.tweens.add({
			targets: this.sprite,
			duration: 50,
			repeat: 3,
			alpha: 0.5,
			yoyo: true,
		})
	}
	toggleWeapon() {
		this.holdingWeapon = !this.holdingWeapon
		return this.holdingWeapon
	}
	attack(key) {
		this.attacking = true
		setTimeout(() => (this.attacking = false), this.abilities[key].duration)

		this.handleCooldown(key)
	}

	setFacing() {
		this.sprite.setFlipX(this.facing)
	}
	playAnimation(state) {
		this.sprite.play(state, true)
	}

	/* ------------------------------------------------------ */

	#createAnimations() {
		this.scene.anims.create(this.states.stand.animation)
		this.scene.anims.create(this.states.on_knees.animation)
		this.scene.anims.create(this.states.run.animation)
		this.scene.anims.create(this.states.jumproll.animation)
		this.scene.anims.create(this.states.fall.animation)
		this.scene.anims.create(this.states.slice.animation)
		this.scene.anims.create(this.states.hang.animation)
		this.scene.anims.create(this.states.hang_release.animation)
		this.scene.anims.create(this.states.weapon_stand.animation)
		this.scene.anims.create(this.states.cutUp.animation)
		this.scene.anims.create(this.states.cutDown.animation)
		this.scene.anims.create(this.states.swift.animation)
		this.scene.anims.create(this.states.hurt.animation)
		this.scene.anims.create(this.states.faint.animation)
		this.scene.anims.create(this.states.weapon_draw.animation)
		this.scene.anims.create(this.states.weapon_shealth.animation)
		this.scene.anims.create(this.states.jump.animation)
		this.scene.anims.create(this.states.dive.animation)
		this.scene.anims.create(this.states.swim_up.animation)
		this.scene.anims.create(this.states.swim.animation)
		this.scene.anims.create(this.states.climb.animation)
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
