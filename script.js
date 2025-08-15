// Start the image rotation
updateImages();
setInterval(updateImages, duration);

let currentIndex = 0;
const cards = document.querySelectorAll('.slider .ccard');
const totalCards = cards.length;

function slideCards() {
  currentIndex++;
  if (currentIndex >= totalCards) {
    currentIndex = 0; // Reset to the first card
  }

  // Move the cards to the left based on the current index
  const offset = -(currentIndex * 300); // Adjust 300px based on card width
  document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

function startCountdown() {
    const countdownElement = document.getElementById("countdown");

    // Set fixed target date: 02 May, 2025 at midnight (00:00:00)
    const targetTime = new Date("August 30, 2025 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetTime - now;

        if (timeLeft <= 0) {
            countdownElement.innerHTML = "00h 00m 00s";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);


   

  
