

//jogo
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dinossauro
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//cactus
//Essa parte do código trata da inicialização de imagens dos cactos, configuração de funções para a atualização contínua do jogo.

let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//fisica e movimento
let velocityX = -8; 
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = 250;
    board.width = boardWidth;

    context = board.getContext("2d"); //usado para desenhar no tabuleiro

   //desenha o dinossauro inicialmente para começar o game

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); 
    document.addEventListener("keydown", moveDino);

    if (gameOver) {
        btn.style.display = "block"
        board.style.display = "none"
    }
}

//A função update é responsável por manter a animação contínua do jogo.
// Ela aplica a gravidade ao dinossauro, atualiza sua posição, desenha-o no quadro, move e desenha os cactos, verificando se há colisões. 

function resetGame() {
    
    location.reload();
    
}


function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        botao.style.display = "block"
        board.style.display = "none"
    }
    context.clearRect(0, 0, board.width, board.height);



    //dinossauro
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);  //aplica a gravidade à posição y atual do dinossauro, garantindo que não ultrapasse o solo
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        if (detectCollision(dino, cactus)) {
            gameOver = true;
            
            dinoImg.src = "./img/dino-dead.png";
            document.getElementById("ibtnreset").style.display = "inline-block"
            document.getElementById("board").style.display = "none"
            
            // Atualiza o estado do jogo antes de carregar a imagem do dinossauro "morto"
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
                // Adiciona a mensagem "Game Over" ao canvas
                context.fillStyle = "red";
                context.font = "40px Courier New";
                context.fillText(gameOverMessage, board.width / 2 - 100, board.height / 2);
                // Exibe o botão de "Game Over"
                
            };

            
        }
        
    }

    //pontuação
    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        //pula
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && dino.y == dinoY) {
        //abaixa
    }

}

function placeCactus() {
    if (gameOver) {
        return;
    }

    //so os cacto
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height: cactusHeight
    }

    let placeCactusChance = Math.random(); 

    if (placeCactusChance > .90) { //10% de chance de obter cactus3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70) {//30% de chance de obter cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift(); 
    }
}

//Esta função detectCollision verifica se dois objetos retangulares, representados por a e b, estão colidindo. 
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&  
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;   
}

