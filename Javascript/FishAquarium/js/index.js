import Game from "./game.js";
const loading = document.getElementById("loading");
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = window.innerWidth - 7;
const GAME_HEIGHT = window.innerHeight - 7;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.style.border = "2px solid #000";
let game;
const loadedAssets = {};
const startGame = () => {
    game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas, loadedAssets);
    game.start();

    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "Are you sure you want to leave the game?";

        // localStorage.setItem("restart", "yes");

        game.save.saveFishes();
        game.save.saveCoins();
        game.save.saveJunks();
        game.save.saveMoney();
        game.save.saveBgIndex();

        e.returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });

    let lastTime = 0;
    let deltaTime;
    let gameLoop = (timestamp) => {
        deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    //! REMOVE
    window.game = game;
};

const assets = [
    //background
    "./assets/otherObjects/bg.jpg",
    // "./assets/otherObjects/bg2.png",

    //fishes
    "./assets/fishes/blue_left.png",
    "./assets/fishes/blue_right.png",
    "./assets/fishes/black_left.png",
    "./assets/fishes/black_right.png",
    "./assets/fishes/green_left.png",
    "./assets/fishes/green_right.png",
    "./assets/fishes/purple_left.png",
    "./assets/fishes/purple_right.png",
    "./assets/fishes/red_left.png",
    "./assets/fishes/red_right.png",
    "./assets/fishes/yellow_left.png",
    "./assets/fishes/yellow_right.png",

    //coins
    "./assets/coins/coin-0.png",
    "./assets/coins/coin-1.png",
    "./assets/coins/coin-2.png",
    "./assets/coins/coin-3.png",
    "./assets/coins/coin-4.png",
    "./assets/coins/coin-5.png",

    //junk
    "./assets/otherObjects/junk0.png",
    "./assets/otherObjects/junk1.png",

    //food
    "./assets/otherObjects/food.png",

    //Fish Info
    "./assets/otherObjects/panel1.png",

    //Shop
    "./assets/otherObjects/shopPanel.png",
    "./assets/otherObjects/shopPanelHeader.png",
    "./assets/otherObjects/buyBtn.png",

    //Menu
    "./assets/menu/menu-bubble.png",
    "./assets/menu/menu-food.png",
    "./assets/menu/menu-select.png",
    "./assets/menu/menu-clean.png",
    "./assets/menu/menu-fishShop.png",
    "./assets/menu/menu-shop.png",
    "./assets/menu/menu-pill.png",

    //pill
    "./assets/otherObjects/pill.png",

    //additional backgrounds
    "./assets/otherObjects/bg1.png",
    "./assets/otherObjects/bg2.png",
    "./assets/otherObjects/bg3.png",
    "./assets/otherObjects/bg4.png",

    //money bg
    "./assets/otherObjects/btn2.png",
];
const assetsLoaded = assets.map(
    (url) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(`${url} failed to load`);
            img.onload = (e) => resolve(img);
            img.src = url;
        })
);

Promise.all(assetsLoaded)
    .then((images) => {
        loading.style.display = "none";

        //background
        loadedAssets.background0 = images[0];

        //fishes
        loadedAssets.blue_left = images[1];
        loadedAssets.blue_right = images[2];
        loadedAssets.black_left = images[3];
        loadedAssets.black_right = images[4];
        loadedAssets.green_left = images[5];
        loadedAssets.green_right = images[6];
        loadedAssets.purple_left = images[7];
        loadedAssets.purple_right = images[8];
        loadedAssets.red_left = images[9];
        loadedAssets.red_right = images[10];
        loadedAssets.yellow_left = images[11];
        loadedAssets.yellow_right = images[12];

        //coins
        loadedAssets.coin0 = images[13];
        loadedAssets.coin1 = images[14];
        loadedAssets.coin2 = images[15];
        loadedAssets.coin3 = images[16];
        loadedAssets.coin4 = images[17];
        loadedAssets.coin5 = images[18];

        //junk
        loadedAssets.junk0 = images[19];
        loadedAssets.junk1 = images[20];

        //food
        loadedAssets.food = images[21];

        //Fish Info
        loadedAssets.infoPanel = images[22];

        //Shop
        loadedAssets.shopPanel = images[23];
        loadedAssets.shopPanelHeader = images[24];
        loadedAssets.shopBtn = images[25];

        //Menu
        loadedAssets.menuBubble = images[26];
        loadedAssets.menu_food = images[27];
        loadedAssets.menu_select = images[28];
        loadedAssets.menu_clean = images[29];
        loadedAssets.menu_fishShop = images[30];
        loadedAssets.menu_shop = images[31];
        loadedAssets.menu_pill = images[32];

        //pill
        loadedAssets.pill = images[33];

        //additional Backgrounds
        loadedAssets.background1 = images[34];
        loadedAssets.background2 = images[35];
        loadedAssets.background3 = images[36];
        loadedAssets.background4 = images[37];

        //money bg
        loadedAssets.btn2 = images[38];

        console.log(loadedAssets);
        startGame();
    })
    .catch((err) => console.error(err));

// startGame();

const resetGame = () => {
    localStorage.removeItem("junks");
    localStorage.removeItem("coins");
    localStorage.removeItem("fishes");
    localStorage.removeItem("money");
    localStorage.removeItem("bgIndex");
    game = undefined;
    startGame();
};

window.resetGame = resetGame;
