document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário e a seção de entradas
    const titleInput = document.getElementById('entry-title');
    const textInput = document.getElementById('entry-text');
    const saveButton = document.getElementById('save-entry-btn');
    const entriesSection = document.querySelector('#entries-section');

    // Dicionário de palavras-chave para cada sentimento
    const sentimentKeywords = {
        esperancoso: ['feliz', 'alegre', 'esperançoso', 'energia', 'expectativas', 'ótimo', 'maravilhoso', 'sol'],
        desafiador: ['difícil', 'problema', 'triste', 'cansado', 'desafiador', 'preocupado', 'ruim', 'complicado'],
        reflexivo: ['pensei', 'refletir', 'lembrei', 'talvez', 'interessante', 'analisando', 'sentimento', 'jornada'],
        grato: ['grato', 'gratidão', 'agradecer', 'aprecio', 'obrigado', 'sorte', 'benção'],
        inspirado: ['inspirado', 'motivado', 'criativo', 'ideia', 'sonho', 'inspiração', 'motivação', 'empolgado'],
        confuso: ['confuso', 'incerto', 'dúvida', 'não sei', 'perdido', 'inseguro', 'indeciso'],
        amoroso: ['amor', 'apaixonado', 'carinho', 'saudade', 'coração', 'especial', 'querido', 'romance'],
    };

    // Função que analisa o texto e retorna o sentimento
    function analyzeSentiment(text) {
        const lowerCaseText = text.toLowerCase();

        for (const sentiment in sentimentKeywords) {
            // Para cada sentimento, verifica se alguma de suas palavras-chave está no texto
            const keywords = sentimentKeywords[sentiment];
            if (keywords.some(keyword => lowerCaseText.includes(keyword))) {
                return sentiment; // Retorna o primeiro sentimento encontrado
            }
        }
        return 'neutro'; // Se nenhuma palavra-chave for encontrada, retorna 'neutro'
    }

    // Adiciona o evento de clique ao botão "Salvar"
    saveButton.addEventListener('click', () => {
        const title = titleInput.value;
        const text = textInput.value;

        // Verifica se o título e o texto não estão vazios
        if (title.trim() === '' || text.trim() === '') {
            alert('Por favor, preencha o título e o texto da entrada.');
            return;
        }

        // Analisa o sentimento do texto
        const sentiment = analyzeSentiment(text);

        // Formata a data atual
        const now = new Date();
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('pt-BR', dateOptions);

        // Cria o elemento HTML para a nova entrada
        const entryArticle = document.createElement('article');
        entryArticle.className = 'diary-entry';

        // Mapeia o nome do sentimento para o texto da tag e a classe 
        const sentimentMapping = {
            esperancoso: { text: 'Esperançoso', cssClass: 'tag-esperancoso' },
            desafiador: { text: 'Desafiador', cssClass: 'tag-desafiador' },
            reflexivo: { text: 'Reflexivo', cssClass: 'tag-reflexivo' },
            grato: { text: 'Grato', cssClass: 'tag-grato' },
            inspirado: { text: 'Inspirado', cssClass: 'tag-inspirado' },
            confuso: { text: 'Confuso', cssClass: 'tag-confuso' },
            amoroso: { text: 'Amoroso', cssClass: 'tag-amoroso' },
            neutro: { text: 'Diário', cssClass: 'tag-neutro' }
        };

        const tagInfo = sentimentMapping[sentiment];

        entryArticle.innerHTML = `
            <div class="entry-header">
                <h3>${title}</h3>
                <time datetime="${now.toISOString()}">${formattedDate}</time>
            </div>
            <div class="entry-content">
                <p>${text.replace(/\n/g, '<br>')}</p> 
            </div>
            <div class="entry-footer">
                <span class="tag ${tagInfo.cssClass}">${tagInfo.text}</span>
            </div>
        `;

        // Adiciona a nova entrada no início da lista
        entriesSection.appendChild(entryArticle);

        // Limpa os campos do formulário
        titleInput.value = '';
        textInput.value = '';
    });
});

// Dark mode 
document.addEventListener('DOMContentLoaded', () => {

    const darkModeToggle = document.getElementById('darkModeToggle');
    // Pega o ícone dentro do botão
    const themeIcon = darkModeToggle.querySelector('i');
    const body = document.body;

    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        // Troca a classe do ícone para sol
        themeIcon.className = 'fa-solid fa-sun';
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        // Troca a classe do ícone para lua
        themeIcon.className = 'fa-solid fa-moon';
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

});