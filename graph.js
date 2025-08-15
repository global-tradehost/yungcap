const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const glowDot = document.getElementById('glowDot');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const width = canvas.width;
const height = canvas.height;

const duration = 6000;
const fps = 60;
const totalFrames = Math.floor(duration / (1000 / fps));
const maxAmount = 3500000;

function smoothLine(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(0, points[0]);

  for (let i = 1; i < points.length - 2; i++) {
    let xc = (i + 1 + i) / 2 * (width / totalFrames);
    let yc = (points[i] + points[i + 1]) / 2;
    ctx.quadraticCurveTo(i * (width / totalFrames), points[i], xc, yc);
  }

  ctx.lineTo(width, points[points.length - 1]);
}

const points = [];
let prev = height - 30;

for (let i = 0; i <= totalFrames; i++) {
  let baseStep = (i / totalFrames);
  let volatility = 40 - (baseStep * 30);
 let growth = baseStep * (height - 40); // simulate growth
let noise = (Math.random() - 0.5) * (40 - baseStep * 30); // less noise over time
let newY = height - 20 - growth + noise;
newY = Math.max(20, Math.min(height - 20, newY));
  points.push(newY);
  prev = newY;
}

let frame = 0;

function draw() {
  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let i = 0; i <= frame; i++) {
    const x = (i / totalFrames) * width;
    const y = points[i];
    ctx.lineTo(x, y);
  }
  ctx.lineTo((frame / totalFrames) * width, height);
  ctx.closePath();

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(0,170,255,0.2)');
  gradient.addColorStop(1, 'rgba(0,170,255,0)');
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = '#00aaff';
  ctx.lineWidth = 2;
  ctx.stroke();

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const progress = easeOut(frame / totalFrames);
  const amount = Math.floor(progress * maxAmount);
  document.getElementById('amount').textContent = '$' + amount.toLocaleString();

  const glowX = (frame / totalFrames) * width;
  const glowY = points[frame];
  glowDot.style.left = glowX + 'px';
  glowDot.style.top = glowY + 'px';

  if (frame < totalFrames) {
    frame++;
    requestAnimationFrame(draw);
  }
}

draw();


document.querySelectorAll('.promo-pricing__tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.promo-pricing__tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.promo-pricing__card').forEach(card => card.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

function updateCountdown() {
  const endDate = new Date('2025-08-30T00:00:00');
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    document.getElementById('promo-pricing__timer').innerHTML = 'Offer Expired';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('promo-pricing__timer').innerHTML =
    `${days}Days ${hours}H ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

 function updateEliteCountdown() {
    const now = new Date();
    const baseDate = new Date("2025-05-31T00:00:00Z");
    const diff = now.getTime() - baseDate.getTime();
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const remaining = msPerWeek - (diff % msPerWeek);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((remaining / (1000 * 60)) % 60);
    const secs = Math.floor((remaining / 1000) % 60);

    document.getElementById("elite-countdown").textContent =
      `${days}d ${hours}h ${mins}m ${secs}s`;
  }

  setInterval(updateEliteCountdown, 1000);
  updateEliteCountdown();

// Show/hide countdown bar on scroll
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  const bar = document.querySelector(".elite-countdown-bar");
  if (scrollPercent > 5) {
    bar.classList.add("visible");
  } else {
    bar.classList.remove("visible");
  }
});

  document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');

      content.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    });
  });

 // Hide card when scrolled more than 3% of page
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const card = document.getElementById('floatingCard');
    if (scrollPercent > 1) {
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
    } else {
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    }
  });

    window.addEventListener("scroll", function () {
    const card = document.getElementById("mt5Card");
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrolledPercent = (scrollY / maxScroll) * 100;

    if (scrolledPercent > 2) {
      card.style.opacity = "0";
    } else {
      card.style.opacity = "1";
    }
  });