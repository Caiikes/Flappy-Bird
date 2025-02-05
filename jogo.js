// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = "./sprites.png";

const som_batida = new Audio();
som_batida.src = './sons/punch.wav'

let Quadro_Animacao = 0;

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
        Cidade.Atualizar();
        Canos.Desenha();
        Chao.Desenha();
        Chao.Atualizar();
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

function FazColisao() {
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

    Movimentos: [
        { SpriteX: 0, SpriteY: 0, }, // Asa para Cima
        { SpriteX: 0, SpriteY: 26, }, // Asa no Meio
        { SpriteX: 0, SpriteY: 52, }, // Asa para Baixo
        { SpriteX: 0, SpriteY: 26, }, // Asa no Meio
    ],

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
    FrameAtual: 0,

    AtualizarFrame() {
        if ((Quadro_Animacao % 10) === 0) {
            FlappyBird.FrameAtual = FlappyBird.FrameAtual + 1;
            FlappyBird.FrameAtual = FlappyBird.FrameAtual % FlappyBird.Movimentos.length;
            FlappyBird.SpriteX = FlappyBird.Movimentos[FlappyBird.FrameAtual].SpriteX;
            FlappyBird.SpriteY = FlappyBird.Movimentos[FlappyBird.FrameAtual].SpriteY;
        }
    },

    Atualizar() {
        if (FazColisao()) {
            som_batida.play();
            TelaAtiva = TelaInicio;
            return;
        }
        FlappyBird.Velocidade += FlappyBird.Gravidade;
        FlappyBird.Y = FlappyBird.Y + FlappyBird.Velocidade;
        FlappyBird.AtualizarFrame();
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
    },

    Atualizar() {
        Chao.X = Chao.X - 1;
        Chao.X = Chao.X % (Chao.Largura / 2);
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
        contexto.fillRect(0, 0, canvas.width, canvas.height);

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

        contexto.drawImage(
            sprites,
            Cidade.SpriteX, Cidade.SpriteY,
            Cidade.Largura, Cidade.Altura,
            Cidade.X + (Cidade.Largura * 2), Cidade.Y,
            Cidade.Largura, Cidade.Altura,
        );

    },

    Atualizar() {
        Cidade.X = Cidade.X - 0.5;
        Cidade.X = Cidade.X % Cidade.Largura;
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

const Canos = {

    Largura: 52,
    Altura: 400,
    Ceu: {
        SpriteX: 52,
        SpriteY: 169,
        X: 120,
        Y: -150
    },
    Chao: {
        SpriteX: 0,
        SpriteY: 169
    },
    Pares: [],

    Desenha() {
        const EspacamentoEntreCanos = 80;

        for(ck=0;ck<Canos.Pares.length;ck++){
            Canos.Ceu.X = Canos.Pares[ck].x;
            Canos.Ceu.Y = Canos.Pares[ck].Y;
        }

        // [Cano do Céu]

        contexto.drawImage(
            sprites,
            Canos.Ceu.SpriteX, Canos.Ceu.SpriteY,
            Canos.Largura, Canos.Altura,
            Canos.Ceu.X, Canos.Ceu.Y,
            Canos.Largura, Canos.Altura,
        )

        // [Cano do Chão]

        const CanoChaoX = Canos.Ceu.X;
        const CanoChaoY = Canos.Altura + EspacamentoEntreCanos + Canos.Ceu.Y;

        contexto.drawImage(
            sprites,
            Canos.Chao.SpriteX, Canos.Chao.SpriteY,
            Canos.Largura, Canos.Altura,
            CanoChaoX, CanoChaoY,
            Canos.Largura, Canos.Altura,
        )
    },

    Atualizar() {
        Canos.Ceu.X = Canos.Ceu.X - 2;
        const Passou100Frames = (Quadro_Animacao % 100 === 0);
        if(Passou100Frames) {
            const NovoPar = {
                X: canvas.width,
                Y: -150,
            }
            Canos.Pares.push(NovoPar);
        }
    }
}

function MudarTelaAtiva() {
    TelaAtiva.Click();
}

window.addEventListener("click", MudarTelaAtiva);

function loop() {
    contexto.fillStyle = '#79c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)
    TelaAtiva.Desenha();
    requestAnimationFrame(loop);
    Quadro_Animacao = Quadro_Animacao + 1;
};

loop();
