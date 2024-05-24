// JavaScript for countdown timer
const countdownElement = document.getElementById('countdown');
const weddingDate = new Date('April 18, 2024 16:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "The wedding has started!";
    }
};

const countdownInterval = setInterval(updateCountdown, 1000);

// Call the function immediately to show the initial countdown
updateCountdown();
