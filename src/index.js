var screen = {
    width: 400,
    height: 490
}
var bee
var pipes
var cursors
var audioContext
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
} catch (e) {
    console.error(e)
}

const config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
    backgroundColor: '#71C5CF',
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

function preload() {
    this.load.image('pipe', 'assets/pipe.png')
    this.load.image('bee', 'assets/bee.png')
    this.load.audio('jump', 'assets/jump.wav')
}

function create() {
    // Bee Sprite
    bee = this.physics.add.sprite(100, 245, 'bee')
    bee.setCollideWorldBounds(true)

    pipes = this.physics.add.group()

    this.physics.add.overlap(bee, pipes, hitPipe, null, this)

    // Action - Keyboard
    this.input.keyboard.on('keydown_SPACE', jump, this)
    this.input.keyboard.on('keydown_W', jump, this)
    this.input.keyboard.on('keydown_UP', jump, this)

    // Action - Touch
    this.input.addPointer()
    this.input.on('pointerdown', jump, this)
}

function update() {
    if (bee.angle < 20) {
        bee.angle += 1
    }
}

function jump() {
    bee.setVelocityY(-350)
    var jumpSound = this.sound.add('jump', { volume: 1 })
    this.tweens.add({
        targets: bee,
        duration: 100,
        angle: -20
    })

    jumpSound.play()
}

function hitPipe() {
    alert('game over')
}

var game = new Phaser.Game(config)
