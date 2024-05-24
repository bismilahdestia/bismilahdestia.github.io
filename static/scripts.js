document.getElementById('castForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const token = document.getElementById('token').value;
    const username = document.getElementById('username').value;
    const urls = document.getElementById('urls').value;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, username, urls })
    });

    const result = await response.json();
    document.getElementById('output').textContent = JSON.stringify(result, null, 2);
});
