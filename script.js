const canvas = document.querySelector("#canvas1");
var ctx = canvas.getContext("2d");

const particlesArray = [];

const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("mousemove", ({ x, y }) => {
	mouse.x = x;
	mouse.y = y;
	console.log(x, y);
});

class Particles {
	constructor() {
		// this.x = mouse.x;
		// this.y = mouse.y;

		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		this.size = Math.random() * 5 + 1;
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
	}
}
//Genera 100 particulas
function init() {
	for (let i = 0; i < 100; i++) {
		particlesArray.push(new Particles());
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
	}
}

init();
console.log(particlesArray);
animate();
