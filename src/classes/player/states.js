import { Right, Left } from '../state/State.js'

// ---------------
export class StandRight extends Right {
	constructor(player) {
		super(player, 'STAND')
	}

	enter() {
		this.e.player.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.setAnim('RUN')
		else if (input.left.isDown) this.flipAnim('RUN')
		else if (input.up.isDown) this.setAnim('JUMP')
		else if (input.down.isDown) this.setAnim('ON_KNEES')
		else if (input.shift.isDown) this.setAnim('WEAPON_DRAW')
		else if (input.Q.isDown && !this.e.abilities.cutUp.onCoolDown)
			this.setAnim('cutUp')
		else if (input.W.isDown && !this.e.abilities.cutDown.onCoolDown)
			this.setAnim('cutDown')
		else if (input.E.isDown && !this.e.abilities.swift.onCoolDown)
			this.setAnim('swift')
	}
}
export class StandLeft extends Left {
	constructor(player) {
		super(player, 'STAND')
	}
	enter() {
		this.e.player.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.flipAnim('RUN')
		else if (input.left.isDown) this.setAnim('RUN')
		else if (input.up.isDown) this.setAnim('JUMP')
		else if (input.down.isDown) this.setAnim('ON_KNEES')
		else if (input.shift.isDown) this.setAnim('WEAPON_DRAW')
		else if (input.Q.isDown && !this.e.abilities.cutUp.onCoolDown)
			this.setAnim('cutUp')
		else if (input.W.isDown && !this.e.abilities.cutDown.onCoolDown)
			this.setAnim('cutDown')
		else if (input.E.isDown && !this.e.abilities.swift.onCoolDown)
			this.setAnim('swift')
	}
}
// ---------------
export class OnKneesRight extends Right {
	constructor(player) {
		super(player, 'ON_KNEES')
	}
	handleInput(input) {
		if (input.down.isUp) this.setAnim('STAND')
		else if (input.left.isDown) this.flipAnim()
	}
}
export class OnKneesLeft extends Left {
	constructor(player) {
		super(player, 'ON_KNEES')
	}
	handleInput(input) {
		if (input.down.isUp) this.setAnim('STAND')
		else if (input.right.isDown) this.flipAnim()
	}
}
// ---------------
export class RunRight extends Right {
	constructor(player) {
		super(player, 'RUN')
	}
	enter() {
		this.e.player.setVelocityX(this.e.speed)
	}

	handleInput(input) {
		if (input.left.isDown && input.right.isUp) this.flipAnim()
		else if (input.up.isDown) this.setAnim('JUMP')
		else if (input.right.isUp) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		} else if (input.up.isDown) this.setAnim('JUMP')
		else if (this.e.onFloor && input.down.isDown) this.setAnim('SLICE')
		else if (input.Q.isDown && !this.e.abilities.cutUp.onCoolDown)
			this.setAnim('cutUp')
		else if (input.W.isDown && !this.e.abilities.cutDown.onCoolDown)
			this.setAnim('cutDown')
		else if (input.E.isDown && !this.e.abilities.swift.onCoolDown)
			this.setAnim('swift')
	}
}
export class RunLeft extends Left {
	constructor(player) {
		super(player, 'RUN')
	}

	enter() {
		this.e.player.setVelocityX(-this.e.speed)
	}

	handleInput(input) {
		if (input.right.isDown && input.left.isUp) this.flipAnim()
		else if (input.left.isUp) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		} else if (input.up.isDown) this.setAnim('JUMP')
		else if (this.e.onFloor && input.down.isDown) this.setAnim('SLICE')
		else if (input.Q.isDown && !this.e.abilities.cutUp.onCoolDown)
			this.setAnim('cutUp')
		else if (input.W.isDown && !this.e.abilities.cutDown.onCoolDown)
			this.setAnim('cutDown')
		else if (input.E.isDown && !this.e.abilities.swift.onCoolDown)
			this.setAnim('swift')
	}
}
// ---------------
export class JumpRollRight extends Right {
	constructor(player) {
		super(player, 'JUMPROLL')
	}

	enter() {
		this.e.player.setVelocityX((this.e.speed + this.e.jumpBoost) / 2)
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		}
	}
}
export class JumpRollLeft extends Left {
	constructor(player) {
		super(player, 'JUMPROLL')
	}

	enter() {
		this.e.player.setVelocityX(-(this.e.speed + this.e.jumpBoost) / 2)
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		}
	}
}
// ---------------
export class FallRight extends Right {
	constructor(player) {
		super(player, 'FALL')
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		}
	}
}
export class FallLeft extends Left {
	constructor(player) {
		super(player, 'FALL')
	}

	handleInput(input) {
		if (this.e.onFloor) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		}
	}
}
// ---------------
export class SliceRight extends Right {
	constructor(player) {
		super(player, 'SLICE')
	}

	enter() {
		this.isSlicing = true
		this.e.player.setVelocityX(this.e.speed * 1.5)
		this.e.player.setAccelerationX(-this.e.speed)
		setTimeout(() => {
			this.e.player.setVelocityX(0)
			this.e.player.setAccelerationX(0)
			this.isSlicing = false
		}, 1000)
	}

	handleInput(input) {
		if (!this.isSlicing) {
			if (input.right.isDown) this.setAnim('RUN')
			else if (input.left.isDown) this.flipAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else if (
				input.right.isUp &&
				input.left.isUp &&
				input.up.isUp &&
				input.down.isUp
			) {
				if (this.e.onFloor) {
					if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
					else this.setAnim('STAND')
				}
			}
		}
	}
}
export class SliceLeft extends Left {
	constructor(player) {
		super(player, 'SLICE')
	}

	enter() {
		this.isSlicing = true
		this.e.player.setVelocityX(-this.e.speed * 1.5)
		this.e.player.setAccelerationX(this.e.speed)
		setTimeout(() => {
			this.e.player.setVelocityX(0)
			this.e.player.setAccelerationX(0)
			this.isSlicing = false
		}, 1000)
	}

	handleInput(input) {
		if (!this.isSlicing) {
			if (input.right.isDown) this.flipAnim('RUN')
			else if (input.left.isDown) this.setAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else if (
				input.right.isUp &&
				input.left.isUp &&
				input.up.isUp &&
				input.down.isUp
			) {
				if (this.e.onFloor) {
					if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
					else this.setAnim('STAND')
				}
			}
		}
	}
}
// ---------------
export class WeaponStandRight extends Right {
	constructor(player) {
		super(player, 'WEAPON_STAND')
	}

	enter() {
		this.e.player.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.setAnim('RUN')
		else if (input.left.isDown) this.flipAnim('RUN')
		else if (input.up.isDown) this.setAnim('JUMP')
		else if (input.down.isDown) this.setAnim('ON_KNEES')
		else if (input.Q.isDown && !this.e.abilities.cutUp.onCoolDown)
			this.setAnim('cutUp')
		else if (input.W.isDown && !this.e.abilities.cutDown.onCoolDown)
			this.setAnim('cutDown')
		else if (input.E.isDown && !this.e.abilities.swift.onCoolDown)
			this.setAnim('swift')
		else if (input.shift.isDown) this.setAnim('WEAPON_SHEALTH')
	}
}
export class WeaponStandLeft extends Left {
	constructor(player) {
		super(player, 'WEAPON_STAND')
	}

	enter() {
		this.e.player.setVelocityX(0)
	}

	handleInput(input) {
		if (input.right.isDown) this.flipAnim('RUN')
		else if (input.left.isDown) this.setAnim('RUN')
		else if (input.up.isDown) this.setAnim('JUMP')
		else if (input.down.isDown) this.setAnim('ON_KNEES')
		else if (input.Q.isDown && !this.e.abilities.cutUp.onCoolDown)
			this.setAnim('cutUp')
		else if (input.W.isDown && !this.e.abilities.cutDown.onCoolDown)
			this.setAnim('cutDown')
		else if (input.E.isDown && !this.e.abilities.swift.onCoolDown)
			this.setAnim('swift')
		else if (input.shift.isDown) this.setAnim('WEAPON_SHEALTH')
	}
}
// ---------------
export class Attack1Right extends Right {
	constructor(player) {
		super(player, 'cutUp')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.setAnim('RUN')
			else if (input.left.isDown) this.flipAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else if (input.W.isDown) this.setAnim('cutDown')
			else this.setAnim('WEAPON_STAND')
		}
	}
}
export class Attack1Left extends Left {
	constructor(player) {
		super(player, 'cutUp')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.flipAnim('RUN')
			else if (input.left.isDown) this.setAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else if (input.W.isDown) this.setAnim('cutDown')
			else this.setAnim('WEAPON_STAND')
		}
	}
}
// ---------------
export class Attack2Right extends Right {
	constructor(player) {
		super(player, 'cutDown')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking && this.e.onFloor) {
			if (input.right.isDown) this.setAnim('RUN')
			else if (input.left.isDown) this.flipAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else this.setAnim('WEAPON_STAND')
		}
	}
}
export class Attack2Left extends Left {
	constructor(player) {
		super(player, 'cutDown')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.flipAnim('RUN')
			else if (input.left.isDown) this.setAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else this.setAnim('WEAPON_STAND')
		}
	}
}
// ---------------
export class Attack3Right extends Right {
	constructor(player) {
		super(player, 'swift')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking && this.e.onFloor) {
			if (input.right.isDown) this.setAnim('RUN')
			else if (input.left.isDown) this.flipAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else this.setAnim('WEAPON_STAND')
		}
	}
}
export class Attack3Left extends Left {
	constructor(player) {
		super(player, 'swift')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.e.attack(this.state)
	}

	handleInput(input) {
		if (!this.e.attacking) {
			if (input.right.isDown) this.flipAnim('RUN')
			else if (input.left.isDown) this.setAnim('RUN')
			else if (input.down.isDown) this.setAnim('ON_KNEES')
			else this.setAnim('WEAPON_STAND')
		}
	}
}
// ---------------
export class HurtRight extends Right {
	constructor(player) {
		super(player, 'HURT')
	}

	enter() {
		this.hurting = true
		this.e.player.setVelocityX(0)
		setTimeout(() => (this.hurting = false), 300)
	}

	handleInput() {
		if (!this.hurting) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		}
	}
}
export class HurtLeft extends Left {
	constructor(player) {
		super(player, 'HURT')
	}

	enter() {
		this.hurting = true
		this.e.player.setVelocityX(0)
		setTimeout(() => (this.hurting = false), 300)
	}

	handleInput() {
		if (!this.hurting) {
			if (this.e.holdingWeapon) this.setAnim('WEAPON_STAND')
			else this.setAnim('STAND')
		}
	}
}
// ---------------
export class WeaponDrawRight extends Right {
	constructor(player) {
		super(player, 'WEAPON_DRAW')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.drawWeapon = true
		setTimeout(() => (this.drawWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.drawWeapon) this.setAnim('WEAPON_STAND')
	}
}
export class WeaponDrawLeft extends Left {
	constructor(player) {
		super(player, 'WEAPON_DRAW')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.drawWeapon = true
		setTimeout(() => (this.drawWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.drawWeapon) this.setAnim('WEAPON_STAND')
	}
}
// ---------------
export class WeaponShealthRight extends Right {
	constructor(player) {
		super(player, 'WEAPON_SHEALTH')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.shealthWeapon = true
		setTimeout(() => (this.shealthWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.shealthWeapon) this.setAnim('STAND')
	}
}
export class WeaponShealthLeft extends Left {
	constructor(player) {
		super(player, 'WEAPON_SHEALTH')
	}

	enter() {
		this.e.player.setVelocityX(0)
		this.e.toggleWeapon()
		this.shealthWeapon = true
		setTimeout(() => (this.shealthWeapon = false), 530)
	}

	handleInput(input) {
		if (!this.shealthWeapon) this.setAnim('STAND')
	}
}
// ---------------
export class JumpRight extends Right {
	constructor(player) {
		super(player, 'JUMP')
	}

	enter() {
		this.e.jump()
		this.e.slowPlayer(150)
	}

	handleInput(input) {
		if (this.e.player.body.velocity.y > 0) this.setAnim('FALL')
		else if (input.space.isDown && this.e.player.body.velocity.x > 0)
			this.setAnim('JUMPROLL')
	}
}
export class JumpLeft extends Left {
	constructor(player) {
		super(player, 'JUMP')
	}

	enter() {
		this.e.jump()
		this.e.slowPlayer(150)
	}

	handleInput(input) {
		if (this.e.player.body.velocity.y > 0) this.setAnim('FALL')
		else if (input.space.isDown && this.e.player.body.velocity.x < 0)
			this.setAnim('JUMPROLL')
	}
}
