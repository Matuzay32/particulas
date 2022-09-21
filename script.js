const canvas = document.querySelector("#canvas1");
var ctx = canvas.getContext("2d");

const particlesArray = [];

const mouse = {
	x: undefined,
	y: undefined,
};

// canvas.addEventListener("mousemove", ({ x, y }) => {
// 	mouse.x = x;
// 	mouse.y = y;
// 	console.log(mouse.x);
// 	console.log(mouse.y);
// 	for (let index = 0; index < 10; index++) {
// 		particlesArray.push(new Particles());
// 	}
// });
canvas.addEventListener("click", ({ x, y }) => {
	mouse.x = x;
	mouse.y = y;
	console.log(mouse.x);
	console.log(mouse.y);
	for (let index = 0; index < 10; index++) {
		particlesArray.push(new Particles());
	}
});

class Particles {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;

		// this.x = Math.random() * canvas.width;
		// this.y = Math.random() * canvas.height;

		this.size = Math.random() * 15 + 1;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
	}

	draw() {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handdleParticles();
	const frame = requestAnimationFrame(animate);
}

function handdleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		const p = particlesArray[i];

		p.draw();
		p.update();
		if (p.size <= 0.3) {
			const remove = particlesArray.splice(i, 1);
			i--;
		}
	}
}

animate();
