let image = document.getElementById("bouncingImage");
let x = 5;
let y = 7;
let xSpeed = 2.2;
let ySpeed = 1;
let imageWidth = image.clientWidth;
let imageHeight = image.clientHeight;
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
    "images/lerxen.jpg",
    "images/michelle.png",
    "images/velicia.png",
    "images/xinyi.jpg",
    "images/zhenghao.png",
    "images/zuming.png"
];

let animationId = null; // Track animation frame
let isFirstLoad = true; // Track initial load

// Set up image loading handler
image.onload = function() {
    imageWidth = image.clientWidth;
    imageHeight = image.clientHeight;
    if (isFirstLoad) {
        isFirstLoad = false;
        animate();
    }
};

let imageIdx = -1;
let buttonCreated = false;
let collisionCooldown = false;

function onCollision() {
    console.log("Collision detected, changing image");
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
    if (animationId) {
        cancelAnimationFrame(animationId); // Cancel any existing animation frame
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (!collisionCooldown) {
        if (x + xSpeed >= screenWidth - imageWidth || x + xSpeed <= 0) {
            xSpeed = -xSpeed;
            onCollision();
            collisionCooldown = true;
            setTimeout(() => (collisionCooldown = false), 300); // Reset cooldown after 100ms
        }

        if (y + ySpeed >= screenHeight - imageHeight || y + ySpeed <= 0) {
            ySpeed = -ySpeed;
            onCollision();
            collisionCooldown = true;
            setTimeout(() => (collisionCooldown = false), 300); // Reset cooldown after 100ms
        }
    }
    
    x += xSpeed;
    y += ySpeed;

    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    console.log(`x: ${x}, y: ${y}`);

    animationId = requestAnimationFrame(animate);
}

window.addEventListener("beforeunload", () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

animate();


