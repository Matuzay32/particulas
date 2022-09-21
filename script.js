const canvas = document.querySelector("#canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
const particlesArray = [];
const particlesNumber = 2;
let hue = 0;

canvas.addEventListener("mousemove", ({ x, y }) => {
	mouse.x = x;
	mouse.y = y;

	for (let index = 0; index < particlesNumber; index++) {
		particlesArray.push(new Particles());
	}
});

class Particles {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.color = ` hsl(${hue}, 100%, 50%)`;
		this.size = Math.random() * 5 + 1;
		this.speedX = Math.random() * 5 - 1.5;
		this.speedY = Math.random() * 5 - 1.5;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function handdleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		const particle = particlesArray[i];
		particle.draw();
		particle.update();

		for (let j = i; j < particlesArray.length; j++) {
			const particleJ = particlesArray[j];
			const dx = particle.x - particleJ.x;
			const dy = particle.y - particleJ.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 200) {
				ctx.beginPath();
				ctx.strokeStyle = particle.color;
				ctx.lineWidth = particle.size / 10;
				ctx.moveTo(particle.x, particle.y);
				ctx.lineTo(particleJ.x, particleJ.y);
				ctx.stroke();
			}
		}

		if (particle.size <= 0.3) {
			particlesArray.splice(i, 1);
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = "rgba(0,0,0,0.1)";
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	console.log(particlesArray);
	handdleParticles();
	hue += 2;
	requestAnimationFrame(animate);
}

animate();
