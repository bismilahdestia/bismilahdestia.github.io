const form = document.getElementById('nameForm');
const secondView = document.getElementById('secondView');
const apologyMessage = document.getElementById('apologyMessage');
const image = document.getElementById('image');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    
    // Generate apology message
    const apology = generateApology(name);
    
    // Display second view with message and image
    apologyMessage.textContent = apology.text;
    image.src = apology.image;
    secondView.style.display = 'block';
    
    // Hide the form
    form.style.display = 'none';
});

function generateApology(name) {
    const apologies = [
        { text: `Maaf ya ${name}, ChatGPT harus menunda untuk membantu.`, image: 'https://via.placeholder.com/150' },
        { text: `Maaf, ${name}, Saya tidak dapat melakukannya!`, image: 'https://via.placeholder.com/150' },
        { text: `Maaf, ${name}, Tidak bisa membantu!`, image: 'https://via.placeholder.com/150' }
    ];
    
    return apologies[Math.floor(Math.random() * apologies.length)];
}
