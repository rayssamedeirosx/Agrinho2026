
// 1. BASE DE DADOS PARA A CONSULTA INTELIGENTE

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
        descarte: "Limpar os resíduos orgânicos excessivos, compactar e encaminhar para a coleta seletiva.",
        reciclagem: "Altamente reciclável.",
        tempo: "Aproximadamente 450 anos."
    }
};


// 2. AÇÃO FUNCIONAL DA BUSCA

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


// 3. AÇÃO FUNCIONAL DA CALCULADORA 

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
            beneficio = `Evitou a contaminação de aproximadamente ${qtd * 1000000} litros de água límpida!`;
            break;
        case "pilhas":
            desvio = `${qtd} Unidades de pilhas retidas`;
            tempoEvitado = qtd * 450;
            beneficio = `Impediu o vazamento de metais pesados em aproximadamente ${qtd} pontos do lençol freático.`;
            break;
        case "pneus":
            desvio = `${qtd} Pneus reciclados`;
            tempoEvitado = qtd * 400;
            beneficio = `Eliminou aproximadamente ${qtd} focos críticos de reprodução do mosquito da Dengue.`;
            break;
        case "embalagens":
            desvio = `${qtd} Embalagens com tríplice lavagem concluída`;
            tempoEvitado = qtd * 450;
            beneficio = `Garantia de segurança em conformidade com as diretrizes do agronegócio sustentável.`;
            break;
        case "plastico":
            desvio = `${qtd} Kg de plástico descartado corretamente`;
            tempoEvitado = qtd * 450;
            beneficio = `Evitou o acúmulo de fragmentos plásticos em aproximadamente ${qtd * 2} metros quadrados de solo.`;
            break;
    }

    // Mostra os resultados na tela 
    document.querySelector('.calc-placeholder').classList.add('hidden');
    document.getElementById('dadosCalc').classList.remove('hidden');
    
    document.getElementById('calcResiduos').innerText = desvio;
    document.getElementById('calcTempo').innerText = `${tempoEvitado} anos`;
    document.getElementById('calcBeneficio').innerText = beneficio;
}


// 4. CONFIGURAÇÃO DOS GRÁFICOS DINÂMICOS

window.addEventListener('DOMContentLoaded', () => {
    // Gráfico de Decomposição
    const ctxDecomp = document.getElementById('chartDecomposicao').getContext('2d');
    new Chart(ctxDecomp, {
        type: 'bar',
        data: {
            labels: ['Óleo (Décadas)', 'Pneus', 'Plásticos', 'Embalagens', 'Pilhas'],
            datasets: [{
                label: 'Tempo Médio de Decomposição (Anos)',
                data: [20, 400, 450, 450, 500],
                backgroundColor: ['#f57c00', '#0b5125', '#148f43', '#07401c', '#d32f2f']
            }]
        },
        options: { 
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Gráfico de Resíduos Mais Buscados
    const ctxBuscados = document.getElementById('chartMaisBuscados').getContext('2d');
    new Chart(ctxBuscados, {
        type: 'doughnut',
        data: {
            labels: ['Embalagens', 'Óleos', 'Pilhas', 'Pneus', 'Outros'],
            datasets: [{
                data: [42, 23, 17, 13, 5],
                backgroundColor: ['#0b5125', '#148f43', '#f57c00', '#81c784', '#757575']
            }]
        },
        options: { 
            responsive: true,
            maintainAspectRatio: false
        }
    });
});