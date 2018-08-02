const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: 640,
    backgroundColor: '#95CEF1',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        context: audioContext
    }
}

var game = new Phaser.Game(config)
var over = false

var bee
var pipes
var cursors
var groundLayer

var audioContext
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
} catch (e) {
    console.error(e)
}

function preload() {
    this.load.image('pipe', 'assets/pipe.png')
    this.load.image('tile', 'assets/ground_tile.png')
    this.load.spritesheet('bee', 'assets/bee_sprite_2.png', {
    	frameWidth: 256,
    	frameHeight: 256
    })
    this.load.audio('jump', 'assets/jump.wav')
}

function create() {
    // Bee Sprite
    bee = this.physics.add.sprite(50, 245, 'bee').setDisplaySize(64, 64).setOrigin(-1, 0.5)
    bee.setCollideWorldBounds(true)

    this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 4 }),
	    frameRate: 40,
        yoyo: true,
	    repeat: -1
	})

	bee.anims.play('right', true)

    pipes = this.physics.add.group()

    this.physics.add.overlap(bee, pipes, hitPipe, null, this)

    // Action - Keyboard
    this.input.keyboard.on('keydown_SPACE', jump, this)
    this.input.keyboard.on('keydown_W', jump, this)
    this.input.keyboard.on('keydown_UP', jump, this)

    // Action - Touch
    this.input.addPointer()
    this.input.on('pointerdown', jump, this)

    // Map
    const screenWidth = Math.ceil(window.innerWidth / 64)
    const level = [(new Array(screenWidth)).fill(0, 0, screenWidth)]
    const map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64 })
    const tiles = map.addTilesetImage('tile')
    const layer = map.createStaticLayer(0, tiles, 0, 576)

    layer.setCollision(0)

    this.physics.add.collider(layer, bee, hitGround, null, this)
}

function update() {
    // if (bee.angle < 5) {
    //     bee.angle += 1
    // }
}

function jump() {
    bee.setVelocityY(-350)
    this.sound.add('jump', { volume: 1 }).play()
    // this.tweens.add({
    //     targets: bee,
    //     duration: 100,
    //     angle: -5
    // })
}

function hitGround() {
	if (over) {
		return
	} else {
		over = true
		console.log('Game Over!')
	}
}

function addPipe(pipes, x, y, game) {
    var pipe = game.physics.add.sprite(x, y, 'pipe')

    pipes.add(pipe)
}

function hitPipe() {
    console.log('Game Over!')
}
