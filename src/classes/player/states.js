import { Right, Left } from '../state/State'

// ---------------
export class StandRight extends Right {
	constructor(player) {
		super(player, 'stand')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.setAnim(this.e.states.run)
		else if (input.left.isDown) this.flipAnim(this.e.states.run)
		else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
		else if (input.shift.isDown) this.setAnim(this.e.states.weapon_draw)
		else if (input.Q.isDown && this.e.abilities.cutUp.ready)
			this.setAnim(this.e.states.cutUp)
		else if (input.W.isDown && this.e.abilities.cutDown.ready)
			this.setAnim(this.e.states.cutDown)
		else if (input.E.isDown && this.e.abilities.swift.ready)
			this.setAnim(this.e.states.swift)
	}
}
export class StandLeft extends Left {
	constructor(player) {
		super(player, 'stand')
	}
	enter() {
		this.e.sprite.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.flipAnim(this.e.states.run)
		else if (input.left.isDown) this.setAnim(this.e.states.run)
		else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
		else if (input.shift.isDown) this.setAnim(this.e.states.weapon_draw)
		else if (input.Q.isDown && this.e.abilities.cutUp.ready)
			this.setAnim(this.e.states.cutUp)
		else if (input.W.isDown && this.e.abilities.cutDown.ready)
			this.setAnim(this.e.states.cutDown)
		else if (input.E.isDown && this.e.abilities.swift.ready)
			this.setAnim(this.e.states.swift)
	}
}
// ---------------
export class OnKneesRight extends Right {
	constructor(player) {
		super(player, 'on_knees')
	}
	handleInput(input) {
		if (input.down.isUp) this.setAnim(this.e.states.stand)
		else if (input.left.isDown) this.flipAnim()
	}
}
export class OnKneesLeft extends Left {
	constructor(player) {
		super(player, 'on_knees')
	}
	handleInput(input) {
		if (input.down.isUp) this.setAnim(this.e.states.stand)
		else if (input.right.isDown) this.flipAnim()
	}
}
// ---------------
export class RunRight extends Right {
	constructor(player) {
		super(player, 'run')
	}
	enter() {
		this.e.sprite.setVelocityX(this.e.speed)
	}

	handleInput(input) {
		if (input.left.isDown && input.right.isUp) this.flipAnim()
		else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (input.right.isUp) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		} else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (this.e.onFloor && input.down.isDown)
			this.setAnim(this.e.states.slice)
		else if (input.Q.isDown && this.e.abilities.cutUp.ready)
			this.setAnim(this.e.states.cutUp)
		else if (input.W.isDown && this.e.abilities.cutDown.ready)
			this.setAnim(this.e.states.cutDown)
		else if (input.E.isDown && this.e.abilities.swift.ready)
			this.setAnim(this.e.states.swift)
	}
}
export class RunLeft extends Left {
	constructor(player) {
		super(player, 'run')
	}

	enter() {
		this.e.sprite.setVelocityX(-this.e.speed)
	}

	handleInput(input) {
		if (input.right.isDown && input.left.isUp) this.flipAnim()
		else if (input.left.isUp) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		} else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (this.e.onFloor && input.down.isDown)
			this.setAnim(this.e.states.slice)
		else if (input.Q.isDown && this.e.abilities.cutUp.ready)
			this.setAnim(this.e.states.cutUp)
		else if (input.W.isDown && this.e.abilities.cutDown.ready)
			this.setAnim(this.e.states.cutDown)
		else if (input.E.isDown && this.e.abilities.swift.ready)
			this.setAnim(this.e.states.swift)
	}
}
// ---------------
export class JumpRollRight extends Right {
	constructor(player) {
		super(player, 'jumproll')
	}

	enter() {
		this.e.sprite.setVelocityX((this.e.speed + this.e.jumpBoost) / 2)
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		}
	}
}
export class JumpRollLeft extends Left {
	constructor(player) {
		super(player, 'jumproll')
	}

	enter() {
		this.e.sprite.setVelocityX(-(this.e.speed + this.e.jumpBoost) / 2)
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		}
	}
}
// ---------------
export class FallRight extends Right {
	constructor(player) {
		super(player, 'fall')
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		}
	}
}
export class FallLeft extends Left {
	constructor(player) {
		super(player, 'fall')
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		}
	}
}
// ---------------
export class SliceRight extends Right {
	constructor(player) {
		super(player, 'slice')
	}

	enter() {
		this.isSlicing = true
		this.e.sprite.setVelocityX(this.e.speed * 1.5)
		this.e.sprite.setAccelerationX(-this.e.speed)
		setTimeout(() => {
			this.e.sprite.setVelocityX(0)
			this.e.sprite.setAccelerationX(0)
			this.isSlicing = false
		}, 1000)
	}

	handleInput(input) {
		if (!this.isSlicing) {
			if (input.right.isDown) this.setAnim(this.e.states.run)
			else if (input.left.isDown) this.flipAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else if (
				input.right.isUp &&
				input.left.isUp &&
				input.up.isUp &&
				input.down.isUp
			) {
				if (this.e.onFloor) {
					if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
					else this.setAnim(this.e.states.stand)
				}
			}
		}
	}
}
export class SliceLeft extends Left {
	constructor(player) {
		super(player, 'slice')
	}

	enter() {
		this.isSlicing = true
		this.e.sprite.setVelocityX(-this.e.speed * 1.5)
		this.e.sprite.setAccelerationX(this.e.speed)
		setTimeout(() => {
			this.e.sprite.setVelocityX(0)
			this.e.sprite.setAccelerationX(0)
			this.isSlicing = false
		}, 1000)
	}

	handleInput(input) {
		if (!this.isSlicing) {
			if (input.right.isDown) this.flipAnim(this.e.states.run)
			else if (input.left.isDown) this.setAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else if (
				input.right.isUp &&
				input.left.isUp &&
				input.up.isUp &&
				input.down.isUp
			) {
				if (this.e.onFloor) {
					if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
					else this.setAnim(this.e.states.stand)
				}
			}
		}
	}
}
// ---------------
export class WeaponStandRight extends Right {
	constructor(player) {
		super(player, 'weapon_stand')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.setAnim(this.e.states.run)
		else if (input.left.isDown) this.flipAnim(this.e.states.run)
		else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
		else if (input.Q.isDown && this.e.abilities.cutUp.ready)
			this.setAnim(this.e.states.cutUp)
		else if (input.W.isDown && this.e.abilities.cutDown.ready)
			this.setAnim(this.e.states.cutDown)
		else if (input.E.isDown && this.e.abilities.swift.ready)
			this.setAnim(this.e.states.swift)
		else if (input.shift.isDown) this.setAnim(this.e.states.weapon_shealth)
	}
}
export class WeaponStandLeft extends Left {
	constructor(player) {
		super(player, 'weapon_stand')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.flipAnim(this.e.states.run)
		else if (input.left.isDown) this.setAnim(this.e.states.run)
		else if (input.up.isDown) this.setAnim(this.e.states.jump)
		else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
		else if (input.Q.isDown && this.e.abilities.cutUp.ready)
			this.setAnim(this.e.states.cutUp)
		else if (input.W.isDown && this.e.abilities.cutDown.ready)
			this.setAnim(this.e.states.cutDown)
		else if (input.E.isDown && this.e.abilities.swift.ready)
			this.setAnim(this.e.states.swift)
		else if (input.shift.isDown) this.setAnim(this.e.states.weapon_shealth)
	}
}
// ---------------
export class Attack1Right extends Right {
	constructor(player) {
		super(player, 'cutUp')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.setAnim(this.e.states.run)
			else if (input.left.isDown) this.flipAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else if (input.W.isDown) this.setAnim(this.e.states.cutDown)
			else this.setAnim(this.e.states.weapon_stand)
		}
	}
}
export class Attack1Left extends Left {
	constructor(player) {
		super(player, 'cutUp')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.flipAnim(this.e.states.run)
			else if (input.left.isDown) this.setAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else if (input.W.isDown) this.setAnim(this.e.states.cutDown)
			else this.setAnim(this.e.states.weapon_stand)
		}
	}
}
// ---------------
export class Attack2Right extends Right {
	constructor(player) {
		super(player, 'cutDown')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking && this.e.onFloor) {
			if (input.right.isDown) this.setAnim(this.e.states.run)
			else if (input.left.isDown) this.flipAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else this.setAnim(this.e.states.weapon_stand)
		}
	}
}
export class Attack2Left extends Left {
	constructor(player) {
		super(player, 'cutDown')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.flipAnim(this.e.states.run)
			else if (input.left.isDown) this.setAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else this.setAnim(this.e.states.weapon_stand)
		}
	}
}
// ---------------
export class Attack3Right extends Right {
	constructor(player) {
		super(player, 'swift')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking && this.e.onFloor) {
			if (input.right.isDown) this.setAnim(this.e.states.run)
			else if (input.left.isDown) this.flipAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else this.setAnim(this.e.states.weapon_stand)
		}
	}
}
export class Attack3Left extends Left {
	constructor(player) {
		super(player, 'swift')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.flipAnim(this.e.states.run)
			else if (input.left.isDown) this.setAnim(this.e.states.run)
			else if (input.down.isDown) this.setAnim(this.e.states.on_knees)
			else this.setAnim(this.e.states.weapon_stand)
		}
	}
}
// ---------------
export class HurtRight extends Right {
	constructor(player) {
		super(player, 'hurt')
	}

	enter() {
		this.hurting = true
		this.e.sprite.setVelocityX(0)
		setTimeout(() => (this.hurting = false), 300)
	}

	handleInput() {
		if (!this.hurting) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		}
	}
}
export class HurtLeft extends Left {
	constructor(player) {
		super(player, 'hurt')
	}

	enter() {
		this.hurting = true
		this.e.sprite.setVelocityX(0)
		setTimeout(() => (this.hurting = false), 300)
	}

	handleInput() {
		if (!this.hurting) {
			if (this.e.holdingWeapon) this.setAnim(this.e.states.weapon_stand)
			else this.setAnim(this.e.states.stand)
		}
	}
}
// ---------------
export class WeaponDrawRight extends Right {
	constructor(player) {
		super(player, 'weapon_draw')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.drawWeapon = true
		setTimeout(() => (this.drawWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.drawWeapon) this.setAnim(this.e.states.weapon_stand)
	}
}
export class WeaponDrawLeft extends Left {
	constructor(player) {
		super(player, 'weapon_draw')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.drawWeapon = true
		setTimeout(() => (this.drawWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.drawWeapon) this.setAnim(this.e.states.weapon_stand)
	}
}
// ---------------
export class WeaponShealthRight extends Right {
	constructor(player) {
		super(player, 'weapon_shealth')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.shealthWeapon = true
		setTimeout(() => (this.shealthWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.shealthWeapon) this.setAnim(this.e.states.stand)
	}
}
export class WeaponShealthLeft extends Left {
	constructor(player) {
		super(player, 'weapon_shealth')
	}

	enter() {
		this.e.sprite.setVelocityX(0)
		this.e.toggleWeapon()
		this.shealthWeapon = true
		setTimeout(() => (this.shealthWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.shealthWeapon) this.setAnim(this.e.states.stand)
	}
}
// ---------------
export class JumpRight extends Right {
	constructor(player) {
		super(player, 'jump')
	}

	enter() {
		this.e.jump()
		this.e.slowPlayer(150)
	}

	handleInput(input) {
		if (this.e.sprite.body.velocity.y > 0) this.setAnim(this.e.states.fall)
		else if (input.space.isDown && this.e.sprite.body.velocity.x > 0)
			this.setAnim(this.e.states.jumproll)
	}
}
export class JumpLeft extends Left {
	constructor(player) {
		super(player, 'jump')
	}

	enter() {
		this.e.jump()
		this.e.slowPlayer(150)
	}

	handleInput(input) {
		if (this.e.sprite.body.velocity.y > 0) this.setAnim(this.e.states.fall)
		else if (input.space.isDown && this.e.sprite.body.velocity.x < 0)
			this.setAnim(this.e.states.jumproll)
	}
}
