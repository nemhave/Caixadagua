document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const balloon = document.getElementById('balloon');
    const balloonGround = document.getElementById('balloonGround');
    const background = document.querySelector('.background');
    
    // Caminhos das imagens do balão
    const balloonImages = [
        'imagens/balloon1.png', // Imagem inicial
        'imagens/balloon2.png', // Imagem em 25%
        'imagens/balloon3.png', // Imagem em 75%
        'imagens/balloon4.png', // Imagem em 75%
    ];
    
    // Flag para controlar se o balão já tocou a linha
    let hasTouchedLine = false;
    
    // Inicia a animação
    balloon.classList.add('balloon-animate');
    
    // Verifica a posição do balão durante a animação
    function checkBalloonPosition() {
        if (hasTouchedLine) return;
        
        // Obtém a posição atual do balão
        const balloonRect = balloon.getBoundingClientRect();
        const backgroundRect = background.getBoundingClientRect();
        
        // Posição aproximada da linha de transmissão (ajuste conforme sua imagem)
        const linePosition = backgroundRect.height * 0.2;
        
        // Verifica se o balão tocou a linha de transmissão
        if (balloonRect.bottom <= linePosition) {
            hasTouchedLine = true;
            
            // Para a animação
            balloon.style.animation = 'none';
            
            // Esconde o balão que estava subindo
            balloon.style.display = 'none';
            
            // Mostra o balão no chão
            balloonGround.style.display = 'block';
            
            return;
        }
        
        // Calcula o progresso da animação (0 a 1)
        const progress = 1 - (balloonRect.bottom / backgroundRect.height);
        
        // Troca as imagens nos pontos especificados
        if (progress > 0.60 && balloon.src.indexOf(balloonImages[3]) === -1) {
            balloon.src = balloonImages[3]; // Imagem 3 em 75%
        } else if (progress > 0.40 && progress <= 0.60 && balloon.src.indexOf(balloonImages[2]) === -1) {
            balloon.src = balloonImages[2]; // Imagem 2 em 25%
        } else if (progress > 0.20 && progress <= 0.40 && balloon.src.indexOf(balloonImages[1]) === -1) {
            balloon.src = balloonImages[1]; // Imagem 2 em 25%
        }
        
        // Continua verificando
        requestAnimationFrame(checkBalloonPosition);
    }
    
    // Inicia a verificação de posição
    setTimeout(() => {
        requestAnimationFrame(checkBalloonPosition);
    }, 100);
});