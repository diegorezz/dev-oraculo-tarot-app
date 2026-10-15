// ========================================================
// APLICAÇÃO: ORÁCULO DO TARÔ & GESTOR DE TAREFAS (TO-DO)
// ========================================================

// Estado Global da Aplicação
const AppState = {
    audioEnabled: true,
    audioCtx: null,
    currentReading: null,
    tasks: [],
    history: [],
    currentFilter: 'all',
    currentCategoryFilter: 'all'
};

// ========================================================
// SISTEMA DE ÁUDIO PROCEDURAL (Web Audio API)
// Sons de sinos tibetanos, chimes e cliques mágicos sem dependências
// ========================================================
function initAudio() {
    if (!AppState.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            AppState.audioCtx = new AudioContext();
        }
    }
    if (AppState.audioCtx && AppState.audioCtx.state === 'suspended') {
        AppState.audioCtx.resume();
    }
}

function playMysticChime(freq = 528, duration = 1.6) {
    if (!AppState.audioEnabled) return;
    try {
        initAudio();
        if (!AppState.audioCtx) return;
        
        const ctx = AppState.audioCtx;
        const now = ctx.currentTime;
        
        // Oscilador principal harmônico
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc1.frequency.exponentialRampToValueAtTime(freq * 0.98, now + duration);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(freq * 1.48, now + duration);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(0.18, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    } catch (e) {
        console.warn('Audio play error:', e);
    }
}

function playTaskSuccessSound() {
    if (!AppState.audioEnabled) return;
    try {
        initAudio();
        if (!AppState.audioCtx) return;
        const ctx = AppState.audioCtx;
        const now = ctx.currentTime;
        
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // Acorde C Maior reluzente
        freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + (idx * 0.06);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, start);
            
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.8);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(start);
            osc.stop(start + 0.8);
        });
    } catch (e) {
        console.warn('Task audio error:', e);
    }
}

// ========================================================
// PERSISTÊNCIA LOCAL (LOCAL STORAGE)
// ========================================================
const STORAGE_KEYS = {
    TASKS: 'oraculo_tarefas_v1',
    HISTORY: 'oraculo_historico_v1',
    AUDIO: 'oraculo_audio_enabled_v1'
};

function loadStoredData() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (savedTasks) {
            AppState.tasks = JSON.parse(savedTasks);
        } else {
            // Tarefas padrão iniciais inspiradas nos Arcanos para demonstrar o valor do app
            AppState.tasks = [
                {
                    id: 'default-1',
                    title: 'Fazer a tiragem do Arcano do Dia para orientar as prioridades',
                    category: 'espiritual',
                    priority: 'alta',
                    completed: false,
                    arcanoOrigin: 'O Mago',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'default-2',
                    title: 'Organizar as pendências mais urgentes com clareza e foco',
                    category: 'trabalho',
                    priority: 'media',
                    completed: false,
                    arcanoOrigin: 'A Justiça',
                    createdAt: new Date().toISOString()
                }
            ];
            saveTasks();
        }

        const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (savedHistory) {
            AppState.history = JSON.parse(savedHistory);
        }

        const savedAudio = localStorage.getItem(STORAGE_KEYS.AUDIO);
        if (savedAudio !== null) {
            AppState.audioEnabled = JSON.parse(savedAudio);
        }
        updateAudioButtonUI();
    } catch (e) {
        console.error('Erro ao carregar dados do LocalStorage:', e);
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(AppState.tasks));
        updateTaskStats();
        updateTaskTabBadge();
    } catch (e) {
        console.error('Erro ao salvar tarefas:', e);
    }
}

function saveHistory() {
    try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(AppState.history));
    } catch (e) {
        console.error('Erro ao salvar histórico:', e);
    }
}

// ========================================================
// GESTÃO DE TAREFAS (TO-DO)
// ========================================================
function addTask(title, category = 'espiritual', priority = 'media', arcanoOrigin = null) {
    if (!title || !title.trim()) return false;
    
    const newTask = {
        id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        title: title.trim(),
        category: category,
        priority: priority,
        completed: false,
        arcanoOrigin: arcanoOrigin,
        createdAt: new Date().toISOString()
    };

    AppState.tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    showToast(`Tarefa adicionada: "${newTask.title.substring(0, 30)}..."`);
    return true;
}

function toggleTaskStatus(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            playTaskSuccessSound();
        }
        saveTasks();
        renderTasks();
    }
}

function deleteTask(taskId) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
    showToast('Tarefa removida.');
}

function renderTasks() {
    const listContainer = document.getElementById('taskList');
    const emptyState = document.getElementById('taskEmptyState');
    if (!listContainer) return;

    let filtered = AppState.tasks;

    // Filtro por status
    if (AppState.currentFilter === 'pending') {
        filtered = filtered.filter(t => !t.completed);
    } else if (AppState.currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }

    // Filtro por categoria
    if (AppState.currentCategoryFilter !== 'all') {
        filtered = filtered.filter(t => t.category === AppState.currentCategoryFilter);
    }

    if (filtered.length === 0) {
        listContainer.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    listContainer.innerHTML = filtered.map(task => {
        const priorityLabels = {
            alta: '🔥 Alta',
            media: '⚡ Média',
            baixa: '🌱 Baixa'
        };

        const categoryLabels = {
            espiritual: '🔮 Espiritual',
            trabalho: '💼 Trabalho',
            pessoal: '🌿 Pessoal',
            mente: '🧘 Mente & Corpo'
        };

        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox-custom" onclick="toggleTaskStatus('${task.id}')" title="Marcar como ${task.completed ? 'pendente' : 'concluída'}"></div>
                <div class="task-content">
                    <div class="task-title" onclick="toggleTaskStatus('${task.id}')">${escapeHtml(task.title)}</div>
                    <div class="task-meta">
                        <span class="badge-tag badge-category">${categoryLabels[task.category] || task.category}</span>
                        <span class="badge-tag badge-priority-${task.priority}">${priorityLabels[task.priority] || task.priority}</span>
                        ${task.arcanoOrigin ? `
                            <span class="badge-tag badge-arcano-origin" title="Inspirado pelo Arcano">
                                <span>✦</span> ${escapeHtml(task.arcanoOrigin)}
                            </span>
                        ` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-delete-btn" onclick="deleteTask('${task.id}')" title="Excluir tarefa">✕</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateTaskStats() {
    const total = AppState.tasks.length;
    const completed = AppState.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const elTotal = document.getElementById('statTotalTasks');
    const elCompleted = document.getElementById('statCompletedTasks');
    const elPending = document.getElementById('statPendingTasks');
    const elProgress = document.getElementById('statProgressPercent');
    const elProgressBar = document.getElementById('statProgressBar');

    if (elTotal) elTotal.textContent = total;
    if (elCompleted) elCompleted.textContent = completed;
    if (elPending) elPending.textContent = pending;
    if (elProgress) elProgress.textContent = `${percentage}%`;
    if (elProgressBar) elProgressBar.style.width = `${percentage}%`;
}

function updateTaskTabBadge() {
    const pendingCount = AppState.tasks.filter(t => !t.completed).length;
    const badge = document.getElementById('tasksTabBadge');
    if (badge) {
        badge.textContent = pendingCount;
        badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
    }
}

// ========================================================
// ORÁCULO & TIRAGENS DO TARÔ
// ========================================================
function embaralhar(array) {
    let currentIndex = array.length, randomIndex;
    const newArr = [...array];
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]];
    }
    return newArr;
}

function realizarTiragem() {
    initAudio();
    const questionInput = document.getElementById('question');
    const spreadTypeSelect = document.getElementById('spreadType');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsDiv = document.getElementById('results');
    const spreadInfoDiv = document.getElementById('spreadInfo');
    const readingActionBar = document.getElementById('readingActionBar');

    const pergunta = questionInput.value.trim();
    const tipoTiragem = spreadTypeSelect.value;

    if (!pergunta) {
        questionInput.focus();
        showToast('Por favor, digite uma pergunta ou foco para a consulta.');
        return;
    }

    // Embaralha o baralho dos 22 Arcanos Maiores
    const baralho = embaralhar(ARCANOS_DATA);

    // Definição das posições segundo a tiragem
    let posicoes = [];
    let tituloTiragem = "";
    let subtituloTiragem = "";

    if (tipoTiragem === '5') {
        tituloTiragem = "Método Sagrado de 5 Cartas";
        subtituloTiragem = "Visão panorâmica: Raiz, Momento, Obstáculo, Conselho e Arcano Chave";
        posicoes = [
            { nome: "1. Raiz", desc: "A origem e base inconsciente da situação" },
            { nome: "2. Momento", desc: "A energia predominante no presente" },
            { nome: "3. Obstáculo", desc: "O desafio ou o que precisa ser superado" },
            { nome: "4. Conselho", desc: "A atitude prática recomendada" },
            { nome: "5. Arcano Chave", desc: "A síntese e o desfecho evolutivo" }
        ];
    } else if (tipoTiragem === '3') {
        tituloTiragem = "Tríade da Jornada (3 Cartas)";
        subtituloTiragem = "Situação atual, o que pede atenção e a orientação";
        posicoes = [
            { nome: "1. A Situação", desc: "O cenário atual em desenvolvimento" },
            { nome: "2. Pede Atenção", desc: "O ponto crítico ou cautela necessária" },
            { nome: "3. Orientação", desc: "O caminho e a ação indicada" }
        ];
    } else if (tipoTiragem === 'simnao') {
        tituloTiragem = "Oráculo de Decisão Rápida (1 Carta)";
        subtituloTiragem = "Clareza instantânea para escolhas pontuais";
        posicoes = [
            { nome: "Resposta & Conselho", desc: "A vibração que orienta sua decisão" }
        ];
    } else {
        // 1 Carta - Arcano do Dia
        tituloTiragem = "Arcano do Dia (1 Carta)";
        subtituloTiragem = "A energia e o foco de ação que guiarão seu dia";
        posicoes = [
            { nome: "Arcano Regente", desc: "Foco, aprendizado e ação inspirada do dia" }
        ];
    }

    // Monta os dados da tiragem sorteada
    const cartasTiradas = posicoes.map((pos, index) => {
        const carta = baralho[index];
        const invertida = Math.random() < 0.25; // 25% de chance de sair invertida conforme tradição
        return {
            posicaoNome: pos.nome,
            posicaoDesc: pos.desc,
            carta: carta,
            invertida: invertida
        };
    });

    // Salva no estado
    AppState.currentReading = {
        id: 'reading_' + Date.now(),
        data: new Date().toISOString(),
        pergunta: pergunta,
        tipoTiragem: tipoTiragem,
        tituloTiragem: tituloTiragem,
        cartas: cartasTiradas
    };

    // Salva no histórico
    AppState.history.unshift(AppState.currentReading);
    if (AppState.history.length > 30) AppState.history.pop();
    saveHistory();
    renderHistory();

    // Renderiza o cabeçalho da tiragem
    spreadInfoDiv.innerHTML = `
        <h3>🔮 ${tituloTiragem}</h3>
        <p>"${escapeHtml(pergunta)}"</p>
    `;

    // Renderiza os slots das cartas
    resultsDiv.innerHTML = cartasTiradas.map((item, idx) => {
        const c = item.carta;
        const significado = item.invertida ? c.invertido : c.direito;
        const orientacaoTexto = item.invertida ? 'Invertida' : 'Direita';
        const badgeClasse = item.invertida ? 'inverted' : 'upright';

        return `
            <div class="card-wrapper" data-index="${idx}">
                <div class="card-position-title">
                    <span>✦</span> ${item.posicaoNome}
                </div>
                <div class="tarot-card" id="tarotCard_${idx}" onclick="flipCard(${idx})">
                    <!-- Frente (Verso Místico antes de virar) -->
                    <div class="card-face front">
                        <div class="card-back-pattern">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
                                <circle cx="50" cy="50" r="38" stroke-width="1.5" stroke-dasharray="3 3"/>
                                <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" stroke-width="1.5"/>
                                <circle cx="50" cy="50" r="10" stroke-width="1.5"/>
                            </svg>
                            <span class="card-back-hint">Clique para Revelar</span>
                        </div>
                    </div>

                    <!-- Verso (Face do Arcano Revelada) -->
                    <div class="card-face back ${item.invertida ? 'inverted' : ''}">
                        <div class="card-inner-frame">
                            <div class="card-top-number">${c.numero}</div>
                            
                            <div class="card-svg-container ${item.invertida ? 'inverted' : ''}">
                                ${c.iconeSvg}
                            </div>
                            
                            <div class="card-name-title">${c.nome}</div>
                            
                            <div class="card-status-badge ${badgeClasse}">
                                ${orientacaoTexto}
                            </div>
                            
                            <div class="card-meaning-text" title="${escapeHtml(significado)}">
                                ${significado}
                            </div>

                            <button type="button" class="card-action-btn" onclick="event.stopPropagation(); addTaskFromCard(${idx})">
                                <span>➕</span> Criar Tarefa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    resultsContainer.style.display = 'flex';
    readingActionBar.style.display = 'flex';

    // Rola suavemente até os resultados
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Animação de revelação automática sequencial suave das cartas
    cartasTiradas.forEach((_, idx) => {
        setTimeout(() => {
            const cardEl = document.getElementById(`tarotCard_${idx}`);
            if (cardEl && !cardEl.classList.contains('flipped')) {
                cardEl.classList.add('flipped');
                playMysticChime(432 + (idx * 60), 1.4);
            }
        }, 400 + (idx * 450));
    });
}

function flipCard(idx) {
    const cardEl = document.getElementById(`tarotCard_${idx}`);
    if (cardEl) {
        cardEl.classList.toggle('flipped');
        if (cardEl.classList.contains('flipped')) {
            playMysticChime(528, 1.2);
        }
    }
}

function addTaskFromCard(idx) {
    if (!AppState.currentReading || !AppState.currentReading.cartas[idx]) return;
    const item = AppState.currentReading.cartas[idx];
    const carta = item.carta;
    
    // Sugestão prática orientada pelo Arcano
    const taskTitle = `${carta.nome}: ${carta.acaoSugerida}`;
    addTask(taskTitle, 'espiritual', 'alta', carta.nome);
}

function addAllReadingAsTasks() {
    if (!AppState.currentReading || !AppState.currentReading.cartas.length) return;
    
    let count = 0;
    AppState.currentReading.cartas.forEach((item) => {
        const carta = item.carta;
        const taskTitle = `${item.posicaoNome} (${carta.nome}): ${carta.acaoSugerida}`;
        addTask(taskTitle, 'espiritual', 'alta', carta.nome);
        count++;
    });

    showToast(`🪄 ${count} tarefas inspiradas criadas com sucesso!`);
    switchTab('tasks');
}

// ========================================================
// GRIMÓRIO / BIBLIOTECA DOS ARCANOS
// ========================================================
function renderGrimorio(filterQuery = '') {
    const grid = document.getElementById('grimorioGrid');
    if (!grid) return;

    const query = filterQuery.toLowerCase().trim();
    const filtered = ARCANOS_DATA.filter(arcano => {
        if (!query) return true;
        const inName = arcano.nome.toLowerCase().includes(query);
        const inNum = arcano.numero.toLowerCase().includes(query);
        const inKeywords = arcano.palavrasChave.some(k => k.toLowerCase().includes(query));
        const inElem = arcano.elemento.toLowerCase().includes(query);
        return inName || inNum || inKeywords || inElem;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                Nenhum Arcano encontrado para "${escapeHtml(filterQuery)}".
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(c => `
        <div class="grimorio-card-item" onclick="openArcanoModal(${c.id})">
            <div class="grimorio-card-number">${c.numero}</div>
            <div class="grimorio-card-svg">${c.iconeSvg}</div>
            <div class="grimorio-card-title">${c.nome}</div>
            <div class="grimorio-card-element">${c.elemento}</div>
        </div>
    `).join('');
}

function openArcanoModal(arcanoId) {
    const arcano = getArcanoById(arcanoId);
    if (!arcano) return;

    const modal = document.getElementById('arcanoModal');
    const modalContent = document.getElementById('arcanoModalContent');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <button class="modal-close-btn" onclick="closeArcanoModal()">✕</button>
        <div class="modal-card-header">
            <div class="modal-card-svg">${arcano.iconeSvg}</div>
            <div class="modal-title">${arcano.numero}. ${arcano.nome}</div>
            <div class="modal-subtitle">Elemento / Regência: ${arcano.elemento}</div>
            <div class="modal-tags">
                ${arcano.palavrasChave.map(k => `<span class="badge-tag badge-category">✦ ${k}</span>`).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h4><span style="color: var(--gold-light);">✦</span> Posição Direita (Luz & Potencial)</h4>
            <p>${arcano.direito}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: var(--danger);">✦</span> Posição Invertida (Atenção & Sombra)</h4>
            <p>${arcano.invertido}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: #68d391;">✦</span> Ação Prática / Tarefa Sugerida</h4>
            <p>${arcano.acaoSugerida}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: var(--accent-hover);">✦</span> Afirmação do Dia</h4>
            <p><em>"${arcano.afirmacao}"</em></p>
        </div>

        <div class="modal-actions">
            <button class="btn-primary" style="flex: 1;" onclick="addCardToTasksFromModal(${arcano.id})">
                <span>➕</span> Transformar em Tarefa
            </button>
        </div>
    `;

    modal.classList.add('active');
    playMysticChime(660, 0.8);
}

function closeArcanoModal() {
    const modal = document.getElementById('arcanoModal');
    if (modal) modal.classList.remove('active');
}

function addCardToTasksFromModal(arcanoId) {
    const arcano = getArcanoById(arcanoId);
    if (!arcano) return;
    addTask(`${arcano.nome}: ${arcano.acaoSugerida}`, 'espiritual', 'media', arcano.nome);
    closeArcanoModal();
    switchTab('tasks');
}

// ========================================================
// HISTÓRICO DE LEITURAS
// ========================================================
function renderHistory() {
    const container = document.getElementById('historyList');
    const emptyState = document.getElementById('historyEmptyState');
    if (!container) return;

    if (AppState.history.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = AppState.history.map(item => {
        const dataFormatada = new Date(item.data).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        const cardsBadges = item.cartas.map(c => `
            <div class="history-mini-card ${c.invertida ? 'inverted' : ''}">
                <span>${c.carta.numero}</span>
                <strong>${c.carta.nome}</strong>
                <span>(${c.invertida ? 'Inv.' : 'Dir.'})</span>
            </div>
        `).join('');

        return `
            <div class="history-item">
                <div class="history-item-top">
                    <div>
                        <div class="history-question">"${escapeHtml(item.pergunta)}"</div>
                        <div class="history-date">🔮 ${item.tituloTiragem} • ${dataFormatada}</div>
                    </div>
                </div>
                <div class="history-cards-preview">
                    ${cardsBadges}
                </div>
            </div>
        `;
    }).join('');
}

function clearHistory() {
    if (confirm('Deseja realmente limpar todo o histórico de consultas?')) {
        AppState.history = [];
        saveHistory();
        renderHistory();
        showToast('Histórico limpo com sucesso.');
    }
}

// ========================================================
// CONTROLE DE NAVEGAÇÃO E ABAS
// ========================================================
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabName}`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAudio() {
    AppState.audioEnabled = !AppState.audioEnabled;
    try {
        localStorage.setItem(STORAGE_KEYS.AUDIO, JSON.stringify(AppState.audioEnabled));
    } catch(e) {}
    updateAudioButtonUI();
    if (AppState.audioEnabled) {
        playMysticChime(528, 0.8);
        showToast('Sons místicos ativados');
    } else {
        showToast('Sons desativados');
    }
}

function updateAudioButtonUI() {
    const btn = document.getElementById('toggleAudioBtn');
    if (btn) {
        btn.textContent = AppState.audioEnabled ? '🔊' : '🔇';
        btn.title = AppState.audioEnabled ? 'Silenciar sons' : 'Ativar sons';
    }
}

// ========================================================
// UTILITÁRIOS: TOAST NOTIFICATIONS & SANITIZAÇÃO
// ========================================================
let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ========================================================
// INICIALIZAÇÃO DA APLICAÇÃO (DOM READY)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    loadStoredData();
    renderTasks();
    renderGrimorio();
    renderHistory();

    // Eventos de Abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Form de Nova Tarefa
    const newTaskForm = document.getElementById('newTaskForm');
    if (newTaskForm) {
        newTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('newTaskInput');
            const categorySelect = document.getElementById('newTaskCategory');
            const prioritySelect = document.getElementById('newTaskPriority');

            if (addTask(input.value, categorySelect.value, prioritySelect.value)) {
                input.value = '';
                input.focus();
            }
        });
    }

    // Filtros de Tarefas
    document.querySelectorAll('.filter-pill[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill[data-filter]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    const categoryFilterSelect = document.getElementById('taskCategoryFilter');
    if (categoryFilterSelect) {
        categoryFilterSelect.addEventListener('change', (e) => {
            AppState.currentCategoryFilter = e.target.value;
            renderTasks();
        });
    }

    // Busca no Grimório
    const grimorioSearch = document.getElementById('grimorioSearch');
    if (grimorioSearch) {
        grimorioSearch.addEventListener('input', (e) => {
            renderGrimorio(e.target.value);
        });
    }

    // Sugestões de Perguntas Rápidas (Chips)
    document.querySelectorAll('.chip[data-question]').forEach(chip => {
        chip.addEventListener('click', () => {
            const questionInput = document.getElementById('question');
            if (questionInput) {
                questionInput.value = chip.dataset.question;
                questionInput.focus();
            }
        });
    });

    // Fechar Modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeArcanoModal();
        }
    });

    // Fechar modal ao clicar fora
    const modal = document.getElementById('arcanoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeArcanoModal();
            }
        });
    }
});
