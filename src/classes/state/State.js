class State {
	constructor(entity, key) {
		this.e = entity
		this.state = key
	}
	setAnim(state) {
		this.e.setState(state)
	}
	flipAnim(state) {
		this.e.facing = !this.e.facing

		if (!state) {
			this.e.setState(this.e.states[this.state])
		} else {
			this.e.setState(state)
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
