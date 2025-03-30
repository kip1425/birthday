let image = document.getElementById("bouncingImage");
let x = 1;
let y = 1;
let xSpeed = 2.2;
let ySpeed = 1;
const imageWidth = image.clientWidth;
const imageHeight = image.clientHeight;
const imageUrls = [
    "images/ariel.png",
    "images/benedict.jpg",
    "images/cixin.jpg",
    "images/clara.jpg",
    "images/darwish.png",
    "images/dhaaniya.png",
    "images/john.jpg",
    "images/jolin.png",
    "images/justin.jpg",
    "images/michelle.png",
    "images/velicia.png",
    "images/xinyi.jpg",
    "images/zhenghao.png",
    "images/zuming.png"
];

let imageIdx = -1;
let buttonCreated = false;
function onCollision() {
    imageIdx = (imageIdx + 1) % imageUrls.length;
    image.src = imageUrls[imageIdx];

    if (buttonCreated == false) {
        showButton();
        buttonCreated = true;
    }
}

function showButton() {
    const button = document.createElement("button");
    button.size;
    button.textContent = "click here for balloons";
    button.style.position = "absolute";
    button.style.top = "90%";
    button.style.left = "50%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.padding = "25px 25px";
    button.style.fontSize = "1.2rem";
    button.style.backgroundColor = "white";
    button.style.color = "black";
    button.style.border = "solid";
    button.style.borderColor = "black";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "grey"; 
    });

    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "white";
    });

    button.addEventListener("click", () => {
        window.location.href = "messages.html";
    });

    document.body.appendChild(button);
}

function animate() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (x >= screenWidth - imageWidth || x <= 0) {
        xSpeed = -xSpeed;
        onCollision();
    }

    if (y >= screenHeight - imageHeight || y <= 0) {
        ySpeed = -ySpeed;
        onCollision();
    }
    
    x += xSpeed;
    y += ySpeed;

    image.style.left = `${x}px`;
    image.style.top = `${y}px`;

    requestAnimationFrame(animate);
}

window.addEventListener("load", () =>{
    if (image.complete) image.onload();
});

let animationRunning = false; // Flag to track if animate() is already running

image.onload = function() {
    imageWidth = image.clientWidth;
    imageHeight = image.clientHeight;
    if (!animationRunning) { // Only start if not already running
        animationRunning = true;
        animate();
    }
};