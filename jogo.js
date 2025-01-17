// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";

const TelaInicio = {
    desenha(){
        Cidade.desenha();
        Chao.desenha();
        FlappyBird.desenha();
        Inicio.desenha();
    },
    click(){
        TelaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha(){
        Cidade.desenha();
        Chao.desenha();
        FlappyBird.desenha();
        FlappyBird.Atualizar();
    },
    click(){}
}

const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext("2d");
var TelaAtiva = TelaInicio;

contexto.fillStyle = '#79c5ce'
contexto.fillRect(0,0, canvas.width, canvas.height)

const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
        desenha(){
            contexto.drawImage(
                sprites,
                FlappyBird.spriteX, FlappyBird.spriteY,
                FlappyBird.largura, FlappyBird.altura,
                FlappyBird.x, FlappyBird.y,
                FlappyBird.largura, FlappyBird.altura,
            );
        },
        Atualizar(){
            FlappyBird.y = FlappyBird.y + 1
        }

};

const Chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: 368,
        desenha(){
            contexto.drawImage(
                sprites,
                Chao.spriteX, Chao.spriteY,
                Chao.largura, Chao.altura,
                Chao.x, Chao.y,
                Chao.largura, Chao.altura,
            );

            contexto.drawImage(
                sprites,
                Chao.spriteX, Chao.spriteY,
                Chao.largura, Chao.altura,
                Chao.x+Chao.largura, Chao.y,
                Chao.largura, Chao.altura,
            );

        }
};

const Cidade = {
    spriteX: 390,
    spriteY: 0,
    largura: 274,
    altura: 202, 
    x: 0,
    y: 280,
        desenha(){
            contexto.drawImage(
                sprites,
                Cidade.spriteX, Cidade.spriteY,
                Cidade.largura, Cidade.altura,
                Cidade.x, Cidade.y,
                Cidade.largura, Cidade.altura,
            );

            contexto.drawImage(
                sprites,
                Cidade.spriteX, Cidade.spriteY,
                Cidade.largura, Cidade.altura,
                Cidade.x+Cidade.largura, Cidade.y,
                Cidade.largura, Cidade.altura,
            );

        }
};

const Inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152, 
    x: 70,
    y: 70,
        desenha(){
            contexto.drawImage(
                sprites,
                Inicio.spriteX, Inicio.spriteY,
                Inicio.largura, Inicio.altura,
                Inicio.x, Inicio.y,
                Inicio.largura, Inicio.altura,
            );
        }
};


function MudarTelaAtiva(){
    TelaAtiva.click();
}

window.addEventListener("click", MudarTelaAtiva);

function loop(){
    TelaAtiva.desenha();
    requestAnimationFrame(loop);
};

loop();
