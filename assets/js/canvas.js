// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const numParticles = 500;
const minRadius = 20;
// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// particles
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = randomIntFromRange(0, Math.PI * 2);
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 100)
    this.lastMouse = {
        x: x,
        y: y
    }

    //fancy 3d tummble

    // this.distanceFromCenter = {
    //     x: randomIntFromRange(20, 100),
    //     y: randomIntFromRange(20, 100)
    // };


    this.update = () => {

        const lastPoint = {
            x: this.x,
            y: this.y
        };

        this.radians += this.velocity;

        //Drag
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //Circular motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        //chamge sign change rotary directions
        this.draw(lastPoint)

    }
}

Particle.prototype.draw = function (lastPoint) {

    c.beginPath()
    c.strokeStyle = this.color;
    c.lineWidth = 10;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();

    // c.beginPath()
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.fillStyle = this.color
    // c.fill()
    // c.closePath()
}

// Implementation
let particles

function init() {
    particles = []

    for (let i = 0; i < numParticles; i++) {
        const minRadius = (Math.floor(randomIntFromRange(0, 5)) + 1);
        particles.push(new Particle(innerWidth / 2,
            innerHeight / 2,
            minRadius,
            randomColor(colors)));
    }
    console.log(particles)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255, 255, 255, .06)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    particles.forEach(function (Particle) {
        Particle.update();
    });
}

init();
animate();