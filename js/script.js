document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item');
    const nextArrow = document.getElementById('nextVideoArrow');

    console.log('Video Items encontrados:', videoItems); // Linha para depuração
    console.log('Seta de Próximo Vídeo encontrada:', nextArrow); // Linha para depuração

    let currentVideoIndex = 0;

    function showVideo(index) {
        console.log('Tentando mostrar vídeo de índice:', index); // Linha para depuração
        videoItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                console.log('Adicionada classe active ao vídeo:', item.id); // Linha para depuração
            } else {
                item.classList.remove('active');
                console.log('Removida classe active do vídeo:', item.id); // Linha para depuração
            }
        });
    }

    if (videoItems.length > 0) {
        showVideo(currentVideoIndex);
    } else {
        console.warn('Nenhum elemento .video-item encontrado no DOM.'); // Aviso se não encontrar vídeos
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            console.log('Seta clicada!'); // Linha para depuração
            // Esconder o vídeo atual (para que ele não pisque na transição)
            videoItems[currentVideoIndex].classList.remove('active');

            currentVideoIndex++;
            if (currentVideoIndex >= videoItems.length) {
                currentVideoIndex = 0;
            }

            showVideo(currentVideoIndex);
        });
    } else {
        console.warn('Elemento #nextVideoArrow não encontrado no DOM. A navegação por seta não funcionará.'); // Aviso se a seta não for encontrada
    }
});