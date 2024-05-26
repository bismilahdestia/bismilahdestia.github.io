const form = document.getElementById('nameForm');
const messageDiv = document.getElementById('message');
const apologyMessage = document.getElementById('apologyMessage');
const image = document.getElementById('image');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    
    // Generate apology message
    const apology = generateApology(name);
    
    // Display message and image
    apologyMessage.textContent = apology.text;
    image.src = apology.image;
    messageDiv.style.display = 'block';
    
    // Clear form
    form.reset();
});

function generateApology(name) {
    const apologies = [
        { text: `Maaf ya ${name}, chatGPT harus menunda untuk membantu`, image: 'https://via.placeholder.com/150' },
        { text: `Maaf, ${name}, Saya tidak dapat melakukannya!`, image: 'https://via.placeholder.com/150' },
        { text: `Maaf, ${name}, Tidak bisa membantu!`, image: 'https://via.placeholder.com/150' }
    ];
    
    return apologies[Math.floor(Math.random() * apologies.length)];
}
