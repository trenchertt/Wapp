// Snow effect
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
let flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createFlakes() {
  for (let i = 0; i < 100; i++) {
    flakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      d: Math.random() + 1
    });
  }
}

function drawFlakes() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < flakes.length; i++) {
    let f = flakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveFlakes();
}

let angle = 0;
function moveFlakes() {
  angle += 0.01;
  for (let i = 0; i < flakes.length; i++) {
    let f = flakes[i];
    f.y += Math.pow(f.d, 2) + 1;
    f.x += Math.sin(angle) * 2;

    if (f.y > h) {
      flakes[i] = { x: Math.random() * w, y: 0, r: f.r, d: f.d };
    }
  }
}

function update() {
  drawFlakes();
  requestAnimationFrame(update);
}

createFlakes();
update();
