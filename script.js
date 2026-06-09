// Base de dados para a consulta inteligente
const baseResiduos = {
    "oleo": {
        nome: "Óleo de Cozinha e Lubrificantes",
        riscos: "Contaminação severa de lençóis freáticos, impermeabilização do solo e morte de microrganismos úteis à terra.",
        descarte: "Armazenar em garrafas PET bem vedadas e entregar em cooperativas ou postos de coleta cadastrados.",
        reciclagem: "Sim! Pode ser transformado em biodiesel, sabão ecológico ou tintas.",
        tempo: "Mais de 20 anos para se degradar na natureza."
    },
    "pilhas": {
        nome: "Pilhas e Baterias",
        riscos: "Liberação de metais pesados tóxicos (chumbo, mercúrio, cádmio) que contaminam o solo e a água.",
        descarte: "Nunca jogar no lixo comum. Armazenar em potes secos e levar a pontos de coleta de lixo eletrônico.",
        reciclagem: "Sim, reciclagem industrial para recuperação dos componentes químicos metálicos.",
        tempo: "De 100 a 500 anos."
    },
    "pneus": {
        nome: "Pneus Velhos",
        riscos: "Acúmulo de água parada (foco de mosquitos da Dengue) e riscos de incêndios com fumaça altamente tóxica.",
        descarte: "Devem ser devolvidos aos revendedores (Logística Reversa) ou ecopontos municipais.",
        reciclagem: "Sim, triturados servem para asfalto, solados de sapato ou tapetes de borracha.",
        tempo: "Tempo indeterminado (superior a 400 anos)."
    },
    "embalagens": {
        nome: "Embalagens de Defensivos Agrícolas",
        riscos: "Intoxicação humana residual, contaminação química de rios e riscos severos à fauna silvestre.",
        descarte: "Obrigatório realizar a Tríplice Lavagem, furar o fundo e devolver ao distribuidor em até 1 ano.",
        reciclagem: "Sim, são transformadas de forma segura em tubulações industriais pela central do InPEV.",
        tempo: "Mais de 450 anos."
    },
    "plastico": {
        nome: "Plásticos Gerais / Lonas de Silagem",
        riscos: "Fragmentação em microplásticos que asfixiam animais e poluem permanentemente as camadas aráveis do solo.",
        descarte: "Limpar detritos orgânicos excessivos, compactar e encaminhar para a coleta seletiva.",
        reciclagem: "Altamente reciclável.",
        tempo: "Aproximadamente 450 anos."
    }
};

// 1. Lógica da Busca
function buscarResiduo() {
    const termo = document.getElementById('inputBusca').value.toLowerCase().trim();
    const resultadoDiv = document.getElementById('resultadoBusca');
    let encontrado = null;

    for (let chave in baseResiduos) {
        if (termo.includes(chave) || chave.includes(termo)) {
            encontrado = baseResiduos[chave];
            break;
        }
    }

    if (encontrado && termo !== "") {
        document.getElementById('resNome').innerText = encontrado.nome;
        document.getElementById('resRiscos').innerText = encontrado.riscos;
        document.getElementById('resDescarte').innerText = encontrado.descarte;
        document.getElementById('resReciclagem').innerText = encontrado.reciclagem;
        document.getElementById('resTempo').innerText = encontrado.tempo;
        resultadoDiv.classList.remove('hidden');
    } else {
        alert("Resíduo não encontrado. Tente termos como: óleo, pilhas, pneus, embalagens ou plástico.");
        resultadoDiv.classList.add('hidden');
    }
}

// 2. Lógica da Calculadora
function calcularImpacto() {
    const material = document.getElementById('tipoMaterial').value;
    const qtd = parseFloat(document.getElementById('quantidadeMaterial').value);
    
    if (isNaN(qtd) || qtd <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    let desvio = "";
    let tempoEvitado = 0;
    let beneficio = "";

    switch(material) {
        case "oleo":
            desvio = `${qtd} Litros de óleo coletados`;
            tempoEvitado = qtd * 20;
            beneficio = `Evitou a contaminação direta de até ${qtd * 1000000} litros de água límpida!`;
            break;
        case "pilhas":
            desvio = `${qtd} Unidades de pilhas retidas`;
            tempoEvitado = qtd * 450;
            beneficio = `Impediu o vazamento de metais pesados na horta e lençóis freáticos locais.`;
            break;
        case "pneus":
            desvio = `${qtd} Pneus reciclados`;
            tempoEvitado = qtd * 400;
            beneficio = `Eliminou focos críticos de reprodução do mosquito transmissor da Dengue.`;
            break;
        case "embalagens":
            desvio = `${qtd} Embalagens com tríplice lavagem concluída`;
            tempoEvitado = qtd * 450;
            beneficio = `Garantia de segurança ambiental e cumprimento correto das diretrizes do agronegócio.`;
            break;
        case "plastico":
            desvio = `${qtd} Kg de plástico descartado corretamente`;
            tempoEvitado = qtd * 450;
            beneficio = `Impediu o acúmulo de resíduos indestrutíveis nas áreas de plantio da propriedade.`;
            break;
    }

    document.querySelector('.calc-placeholder').classList.add('hidden');
    document.getElementById('dadosCalc').classList.remove('hidden');
    document.getElementById('calcResiduos').innerText = desvio;
    document.getElementById('calcTempo').innerText = `~ ${tempoEvitado}`;
    document.getElementById('calcBeneficio').innerText = beneficio;
}

// 3. Lógica do Índice de Sustentabilidade
function calcularIndice() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');

    if (!q1 || !q2 || !q3) {
        alert("Responda todas as perguntas para ver o diagnóstico!");
        return;
    }

    const total = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value);
    const resultadoDiv = document.getElementById('resultadoQuiz');
    resultadoDiv.classList.remove('hidden');
    document.getElementById('scoreQuiz').innerText = total;

    const feedback = document.getElementById('feedbackQuiz');
    const sugestoes = document.getElementById('sugestoesQuiz');
    sugestoes.innerHTML = "<strong>💡 Recomendações práticas:</strong>";

    if (total === 30) {
        feedback.innerText = "🏆 Excelente! Suas práticas rurais servem de exemplo de sustentabilidade.";
        sugestoes.innerHTML += "<p>• Continue compartilhando esse conhecimento com produtores parceiros na sua região.</p>";
    } else if (total >= 10) {
        feedback.innerText = "⚠️ Regular/Alerta: Você já faz coisas boas, mas ainda há falhas críticas pendentes.";
        sugestoes.innerHTML += "<p>• Corrija as respostas onde assinalou a destinação errada e busque o posto de recebimento mais próximo.</p>";
    } else {
        feedback.innerText = "❌ Crítico: Atenção urgente! Práticas nocivas detectadas na propriedade.";
        sugestoes.innerHTML += "<p>• Interrompa imediatamente a queima ou enterro de químicos e organize um ponto de descarte seguro.</p>";
    }
}

// 4. Configuração dos Gráficos Dinâmicos
window.addEventListener('DOMContentLoaded', () => {
    const ctxDecomp = document.getElementById('chartDecomposicao').getContext('2d');
    new Chart(ctxDecomp, {
        type: 'bar',
        data: {
            labels: ['Óleo (Décadas)', 'Pneus', 'Plásticos', 'Embalagens', 'Pilhas'],
            datasets: [{
                label: 'Tempo Médio de Decomposição (Anos)',
                data: [20, 400, 450, 450, 500],
                backgroundColor: ['#f57c00', '#2e7d32', '#4caf50', '#1b5e20', '#d32f2f']
            }]
        },
        options: { responsive: true }
    });

    const ctxBuscados = document.getElementById('chartMaisBuscados').getContext('2d');
    new Chart(ctxBuscados, {
        type: 'doughnut',
        data: {
            labels: ['Embalagens', 'Óleos', 'Pilhas', 'Pneus', 'Outros'],
            datasets: [{
                data: [42, 23, 17, 13, 5],
                backgroundColor: ['#2e7d32', '#4caf50', '#f57c00', '#81c784', '#757575']
            }]
        },
        options: { responsive: true }
    });
});