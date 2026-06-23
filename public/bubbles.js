// Matter.js modules
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;
const Composite = Matter.Composite;

// Canvas setup
const canvas = document.getElementById('bubbles-canvas');
const ctx = canvas.getContext('2d');
let engine,
  bubbles = [];
let mousePos = { x: 0, y: 0 };
let tilt = { x: 0, y: 0 };
let accel = { x: 0, y: 0 };
let time = 0;
let headerElement = document.querySelector('.site-header');

// Colors
const colors = [
  'oklch(0.54 0.16 175)',
  'oklch(0.58 0.18 170)',
  'oklch(0.48 0.14 185)',
  'oklch(0.65 0.2 205)',
  'oklch(0.45 0.12 240)',
]; // aquamarine, cyan, blue tones

class Bubble {
  constructor(x, y, radius, color) {
    this.body = Bodies.circle(x, y, radius, {
      restitution: 0.8,
      friction: 0.2,
      frictionAir: 0.02,
      label: 'bubble',
    });
    this.radius = radius;
    this.color = color;
    World.add(engine.world, this.body);
  }

  applyForce(force) {
    Body.applyForce(this.body, this.body.position, force);
  }

  draw() {
    // Render with a fixed visible opacity (no fading)
    const opacity = 0.9;
    ctx.fillStyle = this.color.replace(')', ` / ${opacity})`);
    ctx.beginPath();
    ctx.arc(
      this.body.position.x,
      this.body.position.y,
      this.radius,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Subtle gradient for depth
    const gradient = ctx.createRadialGradient(
      this.body.position.x - this.radius / 3,
      this.body.position.y - this.radius / 3,
      0,
      this.body.position.x,
      this.body.position.y,
      this.radius,
    );
    gradient.addColorStop(0, this.color.replace(')', ` / ${0.35 * opacity})`));
    gradient.addColorStop(1, this.color.replace(')', ` / ${0.08 * opacity})`));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
      this.body.position.x,
      this.body.position.y,
      this.radius,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  destroy() {
    World.remove(engine.world, this.body);
  }
}

function initEngine() {
  engine = Engine.create();
  engine.world.gravity.y = 1;
  engine.world.gravity.x = 0;

  // Walls (invisible boundaries)
  const walls = [
    Bodies.rectangle(canvas.width / 2, -20, canvas.width, 40, {
      isStatic: true,
    }),
    Bodies.rectangle(canvas.width / 2, canvas.height + 20, canvas.width, 40, {
      isStatic: true,
    }),
    Bodies.rectangle(-20, canvas.height / 2, 40, canvas.height, {
      isStatic: true,
    }),
    Bodies.rectangle(canvas.width + 20, canvas.height / 2, 40, canvas.height, {
      isStatic: true,
    }),
  ];
  World.add(engine.world, walls);

  // Create initial bubbles (more, slightly smaller)
  let amount = Math.max(
    Math.ceil((canvas.width * canvas.height) / (1024 + 256)),
    1,
  );

  for (let i = 0; i < amount; i++) {
    const x = Math.random() * (canvas.width - 140) + 70;
    const y = Math.random() * (canvas.height - 140) + 70;
    const radius = Math.random() * 14 + 10; // slightly smaller
    const color = colors[Math.floor(Math.random() * colors.length)];
    bubbles.push(new Bubble(x, y, radius, color));
  }
}

function resizeCanvas() {
  canvas.width = headerElement.offsetWidth;
  canvas.height = headerElement.offsetHeight;
}

function animate() {
  Engine.update(engine);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply device tilt/acceleration and gentle sway to bubbles
  time += 0.016; // approx frame time
  const swayX =
    Math.sin(time * 0.5) * 0.25 + (tilt.x || 0) * 0.02 + (accel.x || 0) * 0.5;
  const swayY =
    Math.cos(time * 0.5) * 0.25 + (tilt.y || 0) * 0.02 + (accel.y || 0) * 0.5;

  bubbles.forEach((bubble) => {
    Body.applyForce(bubble.body, bubble.body.position, {
      x: swayX * 0.00003,
      y: swayY * 0.00003,
    });
    bubble.draw();
  });

  requestAnimationFrame(animate);
}

// Device motion/orientation handlers: affect bubbles via forces
window.addEventListener('deviceorientation', (e) => {
  // gamma: left-to-right tilt, beta: front-to-back tilt
  tilt.x = e.gamma || 0;
  tilt.y = e.beta || 0;
});

window.addEventListener('devicemotion', (e) => {
  if (e.accelerationIncludingGravity) {
    accel.x = e.accelerationIncludingGravity.x || 0;
    accel.y = e.accelerationIncludingGravity.y || 0;
  }
});

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initEngine();
    animate();
  });
} else {
  resizeCanvas();
  initEngine();
  animate();
}

// Event listeners
window.addEventListener('resize', resizeCanvas);
