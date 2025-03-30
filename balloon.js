const messageFiles = [
    "messages/benedict.txt",
    "messages/clara.txt",
    "messages/darwish.txt",
    "messages/dhaaniya.txt",
    "messages/john.txt",
    "messages/jolin.txt",
    "messages/justin.txt",
    "messages/zhenghao.txt",
    "messages/zuming.txt"
];

const balloonImages = [
    "images/benedict.jpg",
    "messages/clara.jpg",
    "images/darwish.png",
    "images/dhaaniya.png",
    "images/john.jpg",
    "images/jolin.png",
    "images/justin.jpg",
    "images/zhenghao.png",
    "images/zuming.png"
];

let messageObjects = []; 

async function loadAllMessages() {
    for (let i = 0; i < messageFiles.length; i++) {
        try {
            const response = await fetch(messageFiles[i]);
            const text = await response.text();
            messageObjects.push({
                text: text.trim(),
                image: balloonImages[i],
                used: false,
            });
        } catch (error) {
            console.error(`Failed to load ${messageFiles[i]}:`, error);
            messageObjects.push({
                text: "Default message",
                image: null,
                used: false,
            });
        }
    }
}
  
window.addEventListener("load", async () =>{
    await loadAllMessages();
    createBalloon();
});

const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
    '#ff00ff', '#00ffff', '#ff9900', '#9900ff',
    '#ff66b3', '#66ff66', '#6666ff', '#ffcc00'
];


const container = document.getElementById('balloon-container');
const messageDisplay = document.getElementById('message-display');
const messageContent = document.getElementById('message-content');
const closeButton = document.getElementById('close-message');

let balloonCount = 0;
let imgBalloonCount = 0;
const MAX_BALLOONS = 9;
const MAX = 20;

function createBalloon() {
    if (balloonCount >= MAX) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    // Position and animation
    balloon.style.left = (Math.random() * 90 + 5) + 'vw';
    balloon.style.animationDuration = (Math.random() * 10 + 10) + 's';
    balloon.style.animationFillMode = 'forwards';

    const string = document.createElement('div');
    string.className = 'balloon-string';
    
    // Position string at bottom center of balloon
    string.style.left = '50%';
    string.style.transform = 'translateX(-50%)';
    
    // Add slight left/right curve to string
    const curveDirection = Math.random() > 0.5 ? 1 : -1;
    string.style.setProperty('--curve-direction', curveDirection);
    
    balloon.appendChild(string);

    // Find unused message with image first
    let messageObj = messageObjects.find(obj => !obj.used && obj.image);
   
    if (messageObj && imgBalloonCount < MAX_BALLOONS) {
        console.log(`Loading image: ${messageObj.image}`);
        balloon.style.backgroundImage = `url(${messageObj.image})`;
        balloon.style.backgroundSize = 'cover';
        balloon.style.backgroundRepeat = 'no-repeat';
        balloon.style.backgroundPosition = 'center';
        messageObj.used = true;
        balloon.dataset.message = messageObj.text;
        imgBalloonCount++;

        balloon.addEventListener('click', function() {
            popBalloon(this, string);
        });
    } else if (balloonCount < MAX) {
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationName = 'float-offscreen';
        balloon.dataset.message = "";
        balloonCount++;
        balloon.addEventListener('animationend', () => {
            balloon.remove();
            string.remove();
            balloonCount--;
            if (balloonCount < MAX) createBalloon();
        });

        balloon.addEventListener('click', function() {
            balloon.remove();
            string.remove();
            balloonCount--;
            if (balloonCount < MAX) createBalloon();
        });
    }
    
    container.append(balloon);

    setTimeout(() => {    
        if (balloonCount < MAX) {
            createBalloon();
        }
    }, 5000);
}

closeButton.addEventListener('click', function() {
    messageDisplay.style.display = "none";
});   

function popBalloon(balloon, string) {
    messageContent.textContent = balloon.dataset.message;
    messageDisplay.style.display = "inline";
    balloonCount--;
    balloon.remove();
    string.remove();
}

