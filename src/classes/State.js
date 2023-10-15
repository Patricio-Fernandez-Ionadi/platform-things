class State {
	constructor(entity, key) {
		this.e = entity
		this.state = key
	}
	setAnim(key) {
		this.e.setState(key)
	}
	flipAnim(key) {
		this.e.facing = !this.e.facing
		this.e.player.setFlipX(this.e.facing)
		if (!key) {
			this.e.setState(this.state)
		} else {
			this.e.setState(key)
		}
	}
	animate() {
		this.e.playAnimation(this.state)
	}
}

export class Right extends State {
	constructor(player, key) {
		super(player, key)
	}
}
export class Left extends State {
	constructor(player, key) {
		super(player, key)
	}
}
