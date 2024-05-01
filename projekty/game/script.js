/*
    Definition of Classes
*/
class Player {
    constructor(x, w, h, imgSrc) {
        this.x = x;
        this.y = canvas.height - h;
        this.w = w;
        this.h = h;
        this.imgs = imgSrc.map((src) => {
            let img = new Image();
            img.src = src;
            return img;
        });
        this.currentImgIndex = 0;

        this.deathImg = new Image();
        this.deathImg.src = "imgs/dino-lose.png";
        this.pickImgs = ["imgs/dino-duck1.png", "imgs/dino-duck2.png"];
        this.isDucking = false;
        this.runningFrameCount = 0;
        this.currentDuckImgIndex = 0;

        this.dy = 0;
        this.jumpForce = 20;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;

        // Keyboard support
        this.keys = {};

        document.addEventListener("keydown", (evt) => {
            this.keys[evt.code] = true;
        });
        document.addEventListener("keyup", (evt) => {
            this.keys[evt.code] = false;
        });

        this.animationSpeed = 3;
        this.frameCount = 0;
    }

    animate() {
        // Jump
        if ((this.keys["Space"] || this.keys["KeyW"]) && this.grounded) {
            this.dy = -this.jumpForce;
            this.grounded = false;
        }

        if (this.keys["KeyS"]) {
            this.isDucking = true;
            this.h = this.originalHeight / 2;
        } else {
            this.isDucking = false;
            this.h = this.originalHeight;
        }

        // Frames per second
        this.frameCount++;
        if (this.frameCount >= this.animationSpeed) {
            this.frameCount = 0;
            if (this.isDucking) {
                this.currentDuckImgIndex =
                    (this.currentDuckImgIndex + 1) % this.pickImgs.length;
            } else {
                this.currentImgIndex =
                    (this.currentImgIndex + 1) % this.imgs.length;
            }
        }

        this.y += this.dy;

        // Gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.draw();
    }

    draw() {
        let img;
        let width = this.w;
        if (isGameOver) {
            img = this.deathImg;
        } else if (this.isDucking) {
            img = new Image();
            img.src = this.pickImgs[this.currentDuckImgIndex];
            width = this.w * 1.2;
        } else {
            img = this.imgs[this.currentImgIndex];
        }
        ctx.drawImage(img, this.x, this.y, width, this.h);
    }
}

class Bird {
    constructor(x, y, w, h, imgSrc) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgs = imgSrc.map((src) => {
            let img = new Image();
            img.src = src;
            return img;
        });
        this.currentImgIndex = 0;

        this.dx = -gameSpeed * 1.5;
        this.animationSpeed = 15;
        this.frameCount = 0;
    }

    update() {
        this.x += this.dx * 1.5;
        this.draw();
        this.dx = -gameSpeed;
    }

    draw() {
        let img = this.imgs[this.currentImgIndex];
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
    }

    animate() {
        this.frameCount++;
        if (this.frameCount >= this.animationSpeed) {
            this.frameCount = 0;
            this.currentImgIndex =
                (this.currentImgIndex + 1) % this.imgs.length;
        }
    }
}

class Cactus {
    constructor(x, y, w, h, imgSrc) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = imgSrc;

        this.dx = -gameSpeed;
    }

    update() {
        this.x += this.dx;
        this.draw();
        this.dx = -gameSpeed;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}

class Ground {
    constructor(x, y, w, h, imgSrc) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = imgSrc;

        this.dx = 0;
    }

    update() {
        this.dx = -gameSpeed;
        this.x += this.dx;

        if (this.x <= -canvas.width) {
            this.x += canvas.width;
        }
    }

    draw() {
        for (let i = 0; i <= canvas.width / this.w; i++) {
            ctx.drawImage(
                this.img,
                this.x + i * this.w,
                this.y,
                this.w,
                this.h
            );
        }
    }
}

class Cloud {
    constructor(x, y, w, h, imgSrc) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = imgSrc;

        this.dx = -gameSpeed / 3;
    }

    update() {
        this.x += this.dx;
        this.draw();
        this.dx = -gameSpeed / 3;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}

class TextLabel {
    constructor(t, x, y, a, c, s) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.a = a;
        this.c = c;
        this.s = s;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}

/*
    Add title and footer to page
*/
const title = document.createElement("h1");
title.innerHTML = "Gra z dinozaurem z przeglądarki Chrome";

const footer = document.createElement("p");
footer.innerHTML = "Gra wykonana przez adrianoo 2024 ©";

document.body.appendChild(title);
document.body.appendChild(footer);

/*
    Global Variables
*/
let score;
let scoreText;
let highScore;
let highScoreText;
let ground;
let cloud;
let player;
let gravity;
let objectList = [];
let cloudList = [];
let gameSpeed;
let keys = {};
const playerImgSrc = ["imgs/dino-run-0.png", "imgs/dino-run-1.png"];
const birdImgSrc = ["imgs/bird1.png", "imgs/bird2.png"];
const cloudImgSrc = "imgs/cloud.png";
const groundImgSrc = "imgs/ground.png";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let isGameOver = false;
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

let gameOverImage = new Image();
gameOverImage.src = "imgs/game-over.png";

let resetImage = new Image();
resetImage.src = "imgs/reset.png";

/*
    Event Listeners
*/
document.addEventListener("keydown", function (evt) {
    keys[evt.code] = true;
});

document.addEventListener("keyup", function (evt) {
    keys[evt.code] = false;
});

document.addEventListener("keydown", function (evt) {
    if (isGameOver && evt.code == "Space") {
        isGameOver = false;
        start();
    }
});

document.addEventListener("mousedown", function (evt) {
    if (isGameOver) {
        isGameOver = false;
        start();
    }
});

/*
    Game Functions
*/
function spawnObject() {
    let size = randomIntInRange(20, 70);
    let isBird = Math.random() < 0.5;
    let object;

    if (isBird) {
        let birdY = randomIntInRange(canvas.height * 0.1, canvas.height * 0.6);
        object = new Bird(canvas.width + size, birdY, size, size, birdImgSrc);
    } else {
        let cactusX = randomIntInRange(canvas.width, canvas.width * 2);
        object = new Cactus(
            cactusX,
            canvas.height - size,
            size,
            size,
            "imgs/cactus" + randomIntInRange(1, 6) + ".png"
        );
    }

    objectList.push(object);
}

function spawnCloud() {
    let size = randomIntInRange(50, 120);
    let y = randomIntInRange(50, 150);
    let cloud = new Cloud(canvas.width + size, y, size, size, cloudImgSrc);

    cloudList.push(cloud);
}

function randomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function start() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;
    score = 0;
    highScore = 0;

    if (localStorage.getItem("highScore")) {
        highScore = localStorage.getItem("highScore");
    }

    ground = new Ground(
        0,
        canvas.height * 0.895,
        canvas.width,
        canvas.height * 0.1,
        groundImgSrc
    );

    player = new Player(0, 60, 60, playerImgSrc);

    scoreText = new TextLabel(
        "Punkty: " + score,
        canvas.width - 232,
        55,
        "left",
        "#212121",
        "20"
    );
    highScoreText = new TextLabel(
        "Najwyższy wynik: " + highScore,
        canvas.width - 25,
        30,
        "right",
        "#212121",
        "20"
    );

    requestAnimationFrame(update);
}

function drawGameOver() {
    ctx.drawImage(
        gameOverImage,
        canvas.width / 2 - gameOverImage.width / 2,
        canvas.height / 2 - gameOverImage.height / 2 - 40
    );
    ctx.drawImage(
        resetImage,
        canvas.width / 2 - resetImage.width / 2,
        canvas.height / 2 - resetImage.height / 2 + 20
    );
}

function update() {
    if (isGameOver) {
        drawGameOver();
        return;
    }
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;

    if (spawnTimer <= 0) {
        spawnObject();
        spawnCloud();
        spawnTimer = initialSpawnTimer - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    ground.draw();
    ground.update(gameSpeed);

    // Spawn clouds
    for (let i = 0; i < cloudList.length; i++) {
        let c = cloudList[i];

        if (c.x + c.w < 0) {
            cloudList.splice(i, 1);
        }

        c.update();
    }

    // Spawn objects
    for (let i = 0; i < objectList.length; i++) {
        let obj = objectList[i];

        if (obj instanceof Bird) {
            obj.animate();
        }

        if (obj.x + obj.w < 0) {
            objectList.splice(i, 1);
        }

        if (
            player.x < obj.x + obj.w &&
            player.x + player.w > obj.x &&
            player.y < obj.y + obj.h &&
            player.y + player.h > obj.y
        ) {
            objectList = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem("highScore", highScore);
            isGameOver = true;
        }

        obj.update();
    }

    player.animate();

    score++;
    scoreText.t = "Punkty: " + score;
    scoreText.draw();

    if (score > highScore) {
        highScore = score;
        highScoreText.t = "Najwyższy wynik: " + highScore;
    }

    highScoreText.draw();

    gameSpeed += 0.003;
}

start();
