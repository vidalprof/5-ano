/*
* ATUALIZAÇÃO FINAL: Corrigida a lógica da animação de condensação.
* Agora, a classe .escondido é removida antes de a animação de crescimento ser ativada.
*/

// Variáveis Globais
let nomeAluno = "";
let quizResultados = [];
const totalPerguntasQuiz = 10;
const gabarito = [
    { q: 'q1', resp: 'c', pergunta: 'Quem é o "grande motor" do ciclo?', explicacao: 'O Sol fornece a energia (calor) para a água evaporar e iniciar o ciclo.' },
    { q: 'q2', resp: 'b', pergunta: 'O que é a evaporação?', explicacao: 'Evaporação é a transformação da água do estado líquido para o gasoso (vapor).' },
    { q: 'q3', resp: 'a', pergunta: 'Como as plantas participam?', explicacao: 'As plantas liberam vapor de água pelas folhas no processo de transpiração.' },
    { q: 'q4', resp: 'b', pergunta: 'Quando acontece a condensação?', explicacao: 'A condensação ocorre quando o vapor esfria no céu e forma as gotículas das nuvens.' },
    { q: 'q5', resp: 'b', pergunta: 'Qual o exemplo de condensação?', explicacao: 'O espelho fica embaçado porque o vapor quente do chuveiro se condensa no espelho frio.' },
    { q: 'q6', resp: 'b', pergunta: 'Como se chama a queda da água?', explicacao: 'Precipitação é o nome dado a toda água que cai das nuvens, seja chuva, neve ou granizo.' },
    { q: 'q7', resp: 'b', pergunta: 'Por que a água cai das nuvens?', explicacao: 'As nuvens deixam a água cair quando as gotículas se juntam e ficam pesadas demais.' },
    { q: 'q8', resp: 'a', pergunta: 'O que é a infiltração?', explicacao: 'Infiltração é quando a água da chuva entra no solo, como se ele fosse uma esponja.' },
    { q: 'q9', resp: 'c', pergunta: 'O que é a "Coleta"?', explicacao: 'Coleta é quando a água se junta novamente nos rios, lagos e oceanos.' },
    { q: 'q10', resp: 'b', pergunta: 'O que significa "a viagem nunca para"?', explicacao: 'Significa que o ciclo da água é contínuo, sempre se repetindo na natureza.' }
];

// Função para trocar de tela
function mostrarTela(idTela) {
    document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
    document.getElementById(idTela).classList.add('ativa');
}

// --- TELA 1: INÍCIO ---
document.getElementById('btn-comecar').addEventListener('click', () => {
    nomeAluno = document.getElementById('nome-aluno').value;
    if (nomeAluno.trim() === "") { nomeAluno = "Explorador(a)"; }
    document.querySelectorAll('.nome-placeholder').forEach(span => span.textContent = nomeAluno);
    mostrarTela('tela-texto');
});

// --- FASES INTERATIVAS (ANIMAÇÕES) ---
document.getElementById('sol').addEventListener('click', (e) => {
    document.getElementById('gota-cristalina').classList.add('subindo');
    setTimeout(() => { document.getElementById('btn-avancar-evaporacao').classList.remove('escondido'); }, 1500);
    e.target.style.pointerEvents = 'none';
});

// CORREÇÃO APLICADA AQUI
document.getElementById('btn-condensar').addEventListener('click', (e) => {
    const nuvem = document.getElementById('nuvem-formada');
    e.target.classList.add('escondido');
    
    // Anima os vapores se juntando
    document.querySelectorAll('.vapor').forEach(v => v.classList.add('juntando'));
    
    // A mágica acontece aqui:
    // 1. Removemos a classe que esconde a nuvem
    nuvem.classList.remove('escondido'); 
    
    // 2. Um instante depois, adicionamos a classe que faz ela crescer
    setTimeout(() => {
        nuvem.classList.add('crescendo');
    }, 100); // Um pequeno delay para garantir que o navegador processe a remoção da classe primeiro

    // Mostra o botão para avançar depois que a animação terminar
    setTimeout(() => {
        document.getElementById('btn-avancar-condensacao').classList.remove('escondido');
    }, 2500);
});

document.getElementById('nuvem-carregada').addEventListener('click', (e) => {
    const containerChuva = document.getElementById('chuva-container');
    for (let i = 0; i < 15; i++) {
        const gota = document.createElement('div');
        gota.innerHTML = '💧'; gota.className = 'gota-chuva'; gota.style.left = `${Math.random() * 100}%`;
        gota.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`; gota.style.animationDelay = `${Math.random() * 1}s`;
        containerChuva.appendChild(gota);
    }
    setTimeout(() => { document.getElementById('btn-avancar-precipitacao').classList.remove('escondido'); }, 1000);
    e.target.style.pointerEvents = 'none';
});

// --- QUIZ FINAL E RELATÓRIO ---
function verificarQuizFinal() {
    quizResultados = [];
    let perguntasRespondidas = 0;
    
    gabarito.forEach((item, index) => {
        const perguntaNum = index + 1;
        const respostaSelecionadaNode = document.querySelector(`input[name="q${perguntaNum}"]:checked`);
        if (respostaSelecionadaNode) {
            perguntasRespondidas++;
            const respostaSelecionada = respostaSelecionadaNode.value;
            const acertou = respostaSelecionada === item.resp;
            quizResultados.push({
                pergunta: item.pergunta,
                respostaUsuario: respostaSelecionadaNode.parentElement.textContent.trim(),
                acertou: acertou,
                explicacao: item.explicacao
            });
        }
    });

    if (perguntasRespondidas < totalPerguntasQuiz) {
        alert("Por favor, responda a todas as 10 questões antes de continuar!");
        return;
    }
    mostrarRelatorio();
}

function mostrarRelatorio() {
    const pontuacaoFinal = quizResultados.filter(r => r.acertou).length;
    const nota = (pontuacaoFinal / totalPerguntasQuiz) * 10;
    document.getElementById('nota-final').textContent = `Sua nota: ${nota.toFixed(1)}`;
    document.getElementById('resultado-final').textContent = `Você acertou ${pontuacaoFinal} de ${totalPerguntasQuiz} perguntas.`;
    
    let feedback = "";
    const maos = document.getElementById('maos-aplaudindo');
    maos.innerHTML = "";
    maos.classList.remove('animar');

    if (nota >= 8) {
        feedback = "<p>EXCELENTE! Você é um verdadeiro especialista no ciclo da água!</p>";
        maos.innerHTML = "👏";
        maos.classList.add('animar');
        criarConfetes();
    } else if (nota >= 6) {
        feedback = "<p>MUITO BEM! Você aprendeu os pontos mais importantes do ciclo.</p>";
    } else {
        feedback = "<p>CONTINUE ESTUDANDO! Que tal ler o texto novamente para reforçar o aprendizado?</p>";
    }
    document.getElementById('resumo-feedback').innerHTML = feedback;

    const containerDetalhes = document.getElementById('respostas-detalhadas');
    containerDetalhes.innerHTML = '<h4>Revisão das suas respostas:</h4>';
    quizResultados.forEach((resultado, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-resposta');
        if (resultado.acertou) {
            itemDiv.classList.add('correta');
            itemDiv.innerHTML = `<p>✅ Questão ${index + 1}: Correto!</p>`;
        } else {
            itemDiv.classList.add('errada');
            itemDiv.innerHTML = `<p>❌ Questão ${index + 1}: Errado!</p><span>Sua resposta: "${resultado.respostaUsuario}"</span><div class="explicacao-erro"><strong>Explicação:</strong> ${resultado.explicacao}</div>`;
        }
        containerDetalhes.appendChild(itemDiv);
    });
    
    mostrarTela('tela-relatorio');
}

// --- FUNÇÃO PARA CRIAR CONFETES ---
function criarConfetes() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = "";
    const cores = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'];
    
    for (let i = 0; i < 30; i++) {
        const confete = document.createElement('div');
        confete.classList.add('confete');
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.setProperty('--x', `${(Math.random() - 0.5) * 400}px`);
        confete.style.setProperty('--y', `${(Math.random() - 0.5) * 400}px`);
        confete.style.setProperty('--r', `${Math.random() * 360}deg`);
        container.appendChild(confete);
    }
}

// --- FUNÇÃO PARA SALVAR PDF ---
function salvarPDF() {
    const btnPDF = document.getElementById('btn-pdf');
    btnPDF.textContent = "Gerando PDF...";
    btnPDF.disabled = true;

    const relatorio = document.getElementById('relatorio-conteudo');
    
    window.html2canvas(relatorio, { scale: 2, useCORS: true }).then(canvas => {
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
            pdf.save(`relatorio_${nomeAluno.trim().replace(/\s/g, '_') || 'aluno'}.pdf`);
        } catch (error) {
            console.error("Erro ao gerar o PDF:", error);
            alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.");
        } finally {
            btnPDF.textContent = "Salvar Relatório em PDF";
            btnPDF.disabled = false;
        }
    });
}

// Inicia a aplicação na primeira tela
mostrarTela('tela-inicio');