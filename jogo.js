// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";

const som_batida = new Audio();
som_batida.src = './sons/punch.wav'

const TelaInicio = {
    Desenha() {
        Cidade.Desenha();
        Chao.Desenha();
        FlappyBird.Desenha();
        Inicio.Desenha();
    },
    Click() {
        TelaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    Desenha() {
        Cidade.Desenha();
        Chao.Desenha();
        FlappyBird.Desenha();
        FlappyBird.Atualizar();
    },
    Click() {
        FlappyBird.Pula();
    }
}

const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext("2d");
var TelaAtiva = TelaInicio;

function FazColisao(){
    if (FlappyBird.Y + FlappyBird.Altura >= Chao.Y) {
        return true;
    } else {
        return false;
    }
}

const FlappyBird = {
    SpriteX: 0,
    SpriteY: 0,
    Largura: 35,
    Altura: 25,
    X: 10,
    Y: 50,
    Pulo: 4.6,
    Pula() {
        FlappyBird.Velocidade = -FlappyBird.Pulo;
    },
    Desenha() {
        contexto.drawImage(
            sprites,
            FlappyBird.SpriteX, FlappyBird.SpriteY,
            FlappyBird.Largura, FlappyBird.Altura,
            FlappyBird.X, FlappyBird.Y,
            FlappyBird.Largura, FlappyBird.Altura,
        );
    },
    Gravidade: 0.25,
    Velocidade: 0,
    Atualizar() {
        if (FazColisao()) {
            som_batida.play();
            TelaAtiva = TelaInicio;
            return;
        }
        FlappyBird.Velocidade += FlappyBird.Gravidade;
        FlappyBird.Y = FlappyBird.Y + FlappyBird.Velocidade;
    }

};

const Chao = {
    SpriteX: 0,
    SpriteY: 610,
    Largura: 224,
    Altura: 112,
    X: 0,
    Y: 368,
    Desenha() {
        contexto.drawImage(
            sprites,
            Chao.SpriteX, Chao.SpriteY,
            Chao.Largura, Chao.Altura,
            Chao.X, Chao.Y,
            Chao.Largura, Chao.Altura,
        );

        contexto.drawImage(
            sprites,
            Chao.SpriteX, Chao.SpriteY,
            Chao.Largura, Chao.Altura,
            Chao.X + Chao.Largura, Chao.Y,
            Chao.Largura, Chao.Altura,
        );

    }
};

const Cidade = {
    SpriteX: 390,
    SpriteY: 0,
    Largura: 274,
    Altura: 202,
    X: 0,
    Y: 280,
    Desenha() {
        contexto.drawImage(
            sprites,
            Cidade.SpriteX, Cidade.SpriteY,
            Cidade.Largura, Cidade.Altura,
            Cidade.X, Cidade.Y,
            Cidade.Largura, Cidade.Altura,
        );

        contexto.drawImage(
            sprites,
            Cidade.SpriteX, Cidade.SpriteY,
            Cidade.Largura, Cidade.Altura,
            Cidade.X + Cidade.Largura, Cidade.Y,
            Cidade.Largura, Cidade.Altura,
        );

    }
};

const Inicio = {
    SpriteX: 130,
    SpriteY: 0,
    Largura: 180,
    Altura: 152,
    X: 70,
    Y: 70,
    Desenha() {
        contexto.drawImage(
            sprites,
            Inicio.SpriteX, Inicio.SpriteY,
            Inicio.Largura, Inicio.Altura,
            Inicio.X, Inicio.Y,
            Inicio.Largura, Inicio.Altura,
        );
    }
};


function MudarTelaAtiva() {
    TelaAtiva.Click();
}

window.addEventListener("click", MudarTelaAtiva);

function loop() {
    contexto.fillStyle = '#79c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)
    TelaAtiva.Desenha();
    requestAnimationFrame(loop);
};

loop();
