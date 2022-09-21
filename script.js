const canvas = document.querySelector("#canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
const particlesArray = [];

canvas.addEventListener("mousemove", ({ x, y }) => {
	mouse.x = x;
	mouse.y = y;

	for (let index = 0; index < 10; index++) {
		particlesArray.push(new Particles());
	}
});

class Particles {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;

		this.size = Math.random() * 5 + 1;
		this.speedX = Math.random() * 5 - 1.5;
		this.speedY = Math.random() * 5 - 1.5;
	}

	draw() {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}
	update() {
		this.x += this.speedX;
		this.x += this.speedY;
	}
}

function handdleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		const particle = particlesArray[i];
		particle.update();
		particle.draw();

		if (particle.size >= 0.3) {
			particlesArray.splice(i, 1);
			console.log(particlesArray);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handdleParticles();
	requestAnimationFrame(animate);
}

animate();
