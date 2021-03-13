console.log('about to fetch a rainbow');

async function catchRainbow() {
    const response = await fetch('rainbow.jpg');
    const blob = await response.blob();
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
}

catchRainbow()
    .then(response => {
        console.log('yay');
    })
    .catch(error => {
        console.log('error!');
        console.error(error);
    });
