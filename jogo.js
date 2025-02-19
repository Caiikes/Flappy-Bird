// Aqui teremos a programação do Flappy Bird :D
const Jogo = {};

const sprites = new Image();
sprites.src = "./sprites.png";

const som_batida = new Audio();
som_batida.src = './sons/punch.wav'

let Quadro_Animacao = 0;

const TelaInicio = {
    Desenha() {
        Jogo.Cidade.Desenha();
        Jogo.Chao.Desenha();
        Jogo.FlappyBird.Desenha();
        Inicio.Desenha();
    },
    Click() {
        TelaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    Desenha() {
        Jogo.Cidade.Desenha();
        Jogo.Cidade.Atualizar();
        Jogo.FlappyBird.Desenha();
        Jogo.FlappyBird.Atualizar();
        Jogo.Canos.Desenha();
        Jogo.Canos.Atualizar();
        Jogo.Chao.Desenha();
        Jogo.Chao.Atualizar();
        Jogo.Placar.Desenha();
        Jogo.Placar.Atualizar();
    },
    Click() {
        Jogo.FlappyBird.Pula();
    }
}

const TelaGameOver = {
    Desenha() {
        GameOver.Desenha();
    },
    Click() {
        Jogo.Placar.Resetar();
        Inicializa();
        TelaAtiva = TelaJogo;
    }
};


const canvas = document.querySelector("#game-canvas");
const contexto = canvas.getContext("2d");
var TelaAtiva = TelaInicio;

function FazColisao() {
    if (Jogo.FlappyBird.Y + Jogo.FlappyBird.Altura >= Jogo.Chao.Y) {
        return true;
    } else {
        return false;
    }
}

function FazColisaoObstaculo(Par) {
    if (Jogo.FlappyBird.X >= Par.X) {

        const AlturaCabecaFlappy = Jogo.FlappyBird.Y;
        const AlturaPeFlappy = Jogo.FlappyBird.Y + Jogo.FlappyBird.Altura;
        const BocaCanoCeuY = Par.Y + Jogo.Canos.Altura;
        const BocaCanoChaoY = Par.Y + Jogo.Canos.Altura + Jogo.Canos.EspacamentoEntreCanos;

        if (AlturaCabecaFlappy <= BocaCanoCeuY) {
            return false;
        }

        if (AlturaPeFlappy >= BocaCanoChaoY) {
            return false;
        }
    }
    return false;
}

function Inicializa() {
    Jogo.FlappyBird = CriaFlappyBird();
    Jogo.Cidade = CriaCidade();
    Jogo.Chao = CriaChao();
    Jogo.Canos = CriaCanos();
    Jogo.Placar = CriaPlacar();
}

function CriaFlappyBird() {

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
                TelaAtiva = TelaGameOver;
                return;
            }
            FlappyBird.Velocidade += FlappyBird.Gravidade;
            FlappyBird.Y = FlappyBird.Y + FlappyBird.Velocidade;
            FlappyBird.AtualizarFrame();
        }
    }
    return FlappyBird;
}

function CriaChao() {

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
    }
    return Chao;
}

function CriaCidade() {

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

    }
    return Cidade;
}

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

function CriaCanos() {

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

        EspacamentoEntreCanos: 80,

        Desenha() {
            for (ck = 0; ck < Canos.Pares.length; ck++) {
                Canos.Ceu.X = Canos.Pares[ck].X;
                Canos.Ceu.Y = Canos.Pares[ck].Y;


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
                const CanoChaoY = Canos.Altura + Canos.EspacamentoEntreCanos + Canos.Ceu.Y;

                contexto.drawImage(
                    sprites,
                    Canos.Chao.SpriteX, Canos.Chao.SpriteY,
                    Canos.Largura, Canos.Altura,
                    CanoChaoX, CanoChaoY,
                    Canos.Largura, Canos.Altura,
                )
            }
        },

        Atualizar() {

            const Passou100Frames = (Quadro_Animacao % 100 === 0);

            if (Passou100Frames) {
                const NovoPar = {
                    X: canvas.width,
                    Y: -150 * (Math.random() + 1),
                }
                Canos.Pares.push(NovoPar);
            };

            for (ck = 0; ck < Canos.Pares.length; ck++) {
                const Par = Canos.Pares[ck];
                Par.X = Par.X - 2;

                if (Canos.Pares.length > 0) {
                    const PrimeiroPar = Canos.Pares[0];
                    if (PrimeiroPar.X < -Canos.Largura) {
                        Canos.Pares.shift();
                    }
                }

                if (FazColisaoObstaculo(Par)) {
                    som_batida.play();
                    TelaAtiva = TelaGameOver;
                    return;
                }
            }
        }
    }
    return Canos;
}

function CriaPlacar() {
    const Placar = {
        Pontos: 0,
        Melhor: 0,
        Desenha() {
            contexto.font = '30px "VT323"';
            contexto.textAlign = 'left';
            contexto.fillStyle = 'white'; 
            contexto.fillText("Pontuação: " + Placar.Pontos, 10, 30);
        },
        Atualizar() {
            const IntervaloDeFrames = 20;
            const PassouOIntervalo = Quadro_Animacao % IntervaloDeFrames === 0;
            if (PassouOIntervalo) {
                Placar.Pontos = Placar.Pontos + 1;
            }
        },
        Resetar() {
            if (Placar.Pontos > Placar.Melhor) {
                Placar.Melhor = Placar.Pontos;
            }
            Placar.Pontos = 0;
        }
    }
    return Placar;
}

const GameOver = {
    SpriteX: 134,
    SpriteY: 153,
    Largura: 226,
    Altura: 200,
    X: (320 - 226) / 2, 
    Y: 90,

    Desenha() {
        contexto.drawImage(
            sprites,
            GameOver.SpriteX, GameOver.SpriteY,
            GameOver.Largura, GameOver.Altura,
            GameOver.X, GameOver.Y,
            GameOver.Largura, GameOver.Altura
        );

        contexto.font = '20px "VT323"';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'black';
        contexto.fillText(Jogo.Placar.Pontos, GameOver.X + 190, GameOver.Y + 45);
        contexto.fillText(Jogo.Placar.Melhor, GameOver.X + 190, GameOver.Y + 90);

        let MedalhaX = 0;
        if (Jogo.Placar.Pontos > 20) {
            MedalhaX = 48; // medalha de bronze
        }
        if (Jogo.Placar.Pontos >= 50) {
            MedalhaX = 96; // medalha de prata
        }
        if (Jogo.Placar.Pontos >= 100) {
            MedalhaX = 144; // medalha de ouro
        }

        contexto.drawImage(
            sprites,
            MedalhaX, 78, 
            44, 44, 
            GameOver.X + 25, GameOver.Y + 75, 
            44, 44
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
    Quadro_Animacao = Quadro_Animacao + 1;
};

Inicializa();

loop();
