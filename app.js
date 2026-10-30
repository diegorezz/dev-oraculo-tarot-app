// ========================================================
// APLICAÇÃO: ORÁCULO DO TARÔ & GESTOR DE TAREFAS SAGRADAS
// MESA INTERATIVA (ESTILO OTAROT.NET), RITUAL MATINAL,
// SISTEMA DE CONTAS, STREAKS, XP E DIÁRIO CÓSMICO
// ========================================================

// Estado Global da Aplicação
const AppState = {
    audioEnabled: true,
    ambientDroneEnabled: false,
    audioCtx: null,
    ambientOsc: null,
    ambientGain: null,
    
    // Usuário Ativo & Perfil
    user: null,
    usersList: [],

    // Estado da Tiragem Atual
    currentReading: null,
    tasks: [],
    history: [],
    currentFilter: 'all',
    currentCategoryFilter: 'all',
    currentHistoryFilter: 'all',

    // Mesa Interativa de Cartas
    interactiveDeck: {
        active: false,
        spreadType: '5',
        question: '',
        positions: [],
        tituloTiragem: '',
        subtituloTiragem: '',
        pickedCards: [],
        availableDeck: []
    },

    // Arcano do Dia (Ritual Matinal)
    dailyData: null
};

// ========================================================
// PERSISTÊNCIA LOCAL (LOCAL STORAGE)
// ========================================================
const STORAGE_KEYS = {
    TASKS: 'oraculo_tarefas_v2',
    HISTORY: 'oraculo_historico_v2',
    AUDIO: 'oraculo_audio_enabled_v2',
    USERS: 'oraculo_users_v2',
    ACTIVE_USER_ID: 'oraculo_active_user_id_v2',
    DAILY: 'oraculo_daily_v2'
};

// ========================================================
// SISTEMA DE ÁUDIO PROCEDURAL (Web Audio API)
// Sinos tibetanos, cliques místicos e drone harmônico 432Hz
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
        console.warn('Audio chime error:', e);
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
            gain.gain.linearRampToValueAtTime(0.14, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.7);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(start);
            osc.stop(start + 0.7);
        });
    } catch (e) {
        console.warn('Task audio error:', e);
    }
}

function playLevelUpSound() {
    if (!AppState.audioEnabled) return;
    try {
        initAudio();
        if (!AppState.audioCtx) return;
        const ctx = AppState.audioCtx;
        const now = ctx.currentTime;
        
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + (idx * 0.09);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, start);
            
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.2, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(start);
            osc.stop(start + 1.2);
        });
    } catch (e) {
        console.warn('Level up sound error:', e);
    }
}

function playShuffleSound() {
    if (!AppState.audioEnabled) return;
    try {
        initAudio();
        if (!AppState.audioCtx) return;
        const ctx = AppState.audioCtx;
        const now = ctx.currentTime;
        
        // Simulação suave de cartas deslizando
        for (let i = 0; i < 6; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + (i * 0.07);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(280 + (Math.random() * 220), start);
            osc.frequency.exponentialRampToValueAtTime(140, start + 0.06);
            
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.08, start + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.06);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(start);
            osc.stop(start + 0.07);
        }
    } catch (e) {
        console.warn('Shuffle sound error:', e);
    }
}

// Drone harmônico meditativo 432Hz puro
function toggleAmbientDrone() {
    initAudio();
    if (!AppState.audioCtx) return;
    const btn = document.getElementById('toggleDroneBtn');

    if (AppState.ambientDroneEnabled) {
        // Desligar drone
        if (AppState.ambientGain) {
            AppState.ambientGain.gain.exponentialRampToValueAtTime(0.0001, AppState.audioCtx.currentTime + 1.5);
            setTimeout(() => {
                try {
                    if (AppState.ambientOsc) AppState.ambientOsc.stop();
                    AppState.ambientOsc = null;
                    AppState.ambientGain = null;
                } catch(e) {}
            }, 1500);
        }
        AppState.ambientDroneEnabled = false;
        if (btn) btn.classList.remove('active');
        showToast('Música 432Hz desativada');
    } else {
        // Ligar drone 432Hz
        try {
            const ctx = AppState.audioCtx;
            const now = ctx.currentTime;
            
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(432, now); // Frequência harmônica sagrada

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(216, now); // Oitava abaixo

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(600, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.08, now + 2); // Entrada suave e etérea

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);

            AppState.ambientOsc = osc1;
            AppState.ambientGain = gain;
            AppState.ambientDroneEnabled = true;

            if (btn) btn.classList.add('active');
            showToast('Frequência sagrada 432Hz ativada 🧘');
        } catch(e) {
            console.warn('Drone error:', e);
        }
    }
}

// ========================================================
// SISTEMA DE CONTAS, PERFIL, STREAK & XP
// ========================================================
const DEFAULT_USER = {
    id: 'guest_user',
    name: 'Viajante Astral',
    email: 'convidado@oraculo.local',
    birthdate: '2000-01-01',
    avatar: '🧙‍♂️',
    soulCardId: 0,
    xp: 0,
    level: 1,
    levelTitle: 'Aprendiz do Véu',
    streak: 1,
    lastVisitDate: new Date().toISOString().split('T')[0],
    readingsCount: 0,
    tasksCompletedCount: 0,
    badges: ['despertar'], // 1ª conquista inicial
    humorHistory: []
};

const LEVELS = [
    { level: 1, title: 'Aprendiz do Véu', minXp: 0, maxXp: 99 },
    { level: 2, title: 'Neófito dos Mistérios', minXp: 100, maxXp: 249 },
    { level: 3, title: 'Praticante Cósmico', minXp: 250, maxXp: 499 },
    { level: 4, title: 'Guardião dos Portais', minXp: 500, maxXp: 999 },
    { level: 5, title: 'Grão-Oráculo Iluminado', minXp: 1000, maxXp: 9999 }
];

const BADGES_DEFINITIONS = [
    { id: 'despertar', name: 'Primeiro Despertar', desc: 'Iniciou sua jornada no Oráculo', icon: '🌟' },
    { id: 'streak3', name: 'Fogo Sagrado', desc: 'Manteve 3 dias seguidos de sequência', icon: '🔥' },
    { id: 'tarefas5', name: 'Mestre da Ação', desc: 'Completou 5 tarefas conscientes', icon: '⚡' },
    { id: 'amor', name: 'Coração Aberto', desc: 'Realizou a tiragem do Tarot do Amor', icon: '💖' },
    { id: 'cruz', name: 'Cruz dos Mistérios', desc: 'Realizou a Cruz Céltica de 10 cartas', icon: '🔮' },
    { id: 'diario', name: 'Cronista Astral', desc: 'Escreveu reflexões no diário', icon: '📜' },
    { id: 'solar', name: 'Ritual Solar', desc: 'Consultou o Arcano do Dia', icon: '☀️' }
];

function initUserAndStreak() {
    try {
        const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
        if (savedUsers) {
            AppState.usersList = JSON.parse(savedUsers);
        }

        const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
        let currentUser = AppState.usersList.find(u => u.id === activeId);

        if (!currentUser) {
            currentUser = { ...DEFAULT_USER };
            AppState.usersList.push(currentUser);
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(AppState.usersList));
            localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, currentUser.id);
        }

        AppState.user = currentUser;

        // Atualiza a Carta da Alma se houver data de nascimento
        if (AppState.user.birthdate) {
            const soulCard = calcularArcanoDeNascimento(AppState.user.birthdate);
            AppState.user.soulCardId = soulCard.id;
        }

        // Verifica a Sequência Diária (Daily Streak)
        atualizarStreakDiario();
        salvarUsuarioAtual();
        atualizarHeaderUserUI();
    } catch (e) {
        console.error('Erro ao carregar usuário:', e);
        AppState.user = { ...DEFAULT_USER };
    }
}

function atualizarStreakDiario() {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastVisit = AppState.user.lastVisitDate;

    if (!lastVisit) {
        AppState.user.lastVisitDate = todayStr;
        AppState.user.streak = 1;
        return;
    }

    if (lastVisit === todayStr) {
        // Já visitou hoje
        return;
    }

    const lastDate = new Date(lastVisit);
    const todayDate = new Date(todayStr);
    const diffTime = Math.abs(todayDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        // Consecutivo: incrementa sequência!
        AppState.user.streak = (AppState.user.streak || 1) + 1;
        addXP(20, 'Bônus de Sequência Diária mantida! 🔥');
        if (AppState.user.streak >= 3) {
            desbloquearBadge('streak3');
        }
    } else {
        // Quebrou a sequência
        AppState.user.streak = 1;
    }

    AppState.user.lastVisitDate = todayStr;
}

function salvarUsuarioAtual() {
    try {
        const index = AppState.usersList.findIndex(u => u.id === AppState.user.id);
        if (index !== -1) {
            AppState.usersList[index] = AppState.user;
        } else {
            AppState.usersList.push(AppState.user);
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(AppState.usersList));
        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, AppState.user.id);
    } catch(e) {
        console.error('Erro ao salvar usuário:', e);
    }
}

function addXP(amount, motivo = '') {
    if (!AppState.user) return;
    
    AppState.user.xp = (AppState.user.xp || 0) + amount;
    
    // Verifica subida de nível
    let currentLvl = LEVELS[0];
    for (let l of LEVELS) {
        if (AppState.user.xp >= l.minXp) {
            currentLvl = l;
        }
    }

    if (currentLvl.level > (AppState.user.level || 1)) {
        AppState.user.level = currentLvl.level;
        AppState.user.levelTitle = currentLvl.title;
        playLevelUpSound();
        showToast(`🎉 PARABÉNS! Você subiu para o Nível ${currentLvl.level}: ${currentLvl.title}!`);
    } else if (motivo) {
        showToast(`+${amount} XP: ${motivo}`);
    }

    salvarUsuarioAtual();
    atualizarHeaderUserUI();
}

function desbloquearBadge(badgeId) {
    if (!AppState.user) return;
    if (!AppState.user.badges) AppState.user.badges = [];
    if (!AppState.user.badges.includes(badgeId)) {
        AppState.user.badges.push(badgeId);
        salvarUsuarioAtual();
        const b = BADGES_DEFINITIONS.find(def => def.id === badgeId);
        if (b) {
            playLevelUpSound();
            showToast(`🏆 Conquista Desbloqueada: ${b.icon} ${b.name}!`);
        }
    }
}

function atualizarHeaderUserUI() {
    const u = AppState.user;
    if (!u) return;

    const streakCount = document.getElementById('headerStreakCount');
    const levelTitle = document.getElementById('headerLevelTitle');
    const xpCount = document.getElementById('headerXpCount');
    const avatarIcon = document.getElementById('headerAvatarIcon');
    const userName = document.getElementById('headerUserName');

    if (streakCount) streakCount.textContent = u.streak || 1;
    if (levelTitle) levelTitle.textContent = u.levelTitle || 'Aprendiz';
    if (xpCount) xpCount.textContent = u.xp || 0;
    if (avatarIcon) avatarIcon.textContent = u.avatar || '🧙‍♂️';
    if (userName) userName.textContent = (u.name || 'Viajante').split(' ')[0];
}

// Modal de Perfil & Sistema de Contas
function openProfileModal(initialTab = 'profile') {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    modal.classList.add('active');
    switchProfileModalTab(initialTab);
    renderProfileModalContent();
    playMysticChime(580, 0.6);
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('active');
}

function switchProfileModalTab(tab) {
    const tabProfileBtn = document.getElementById('profTabBtnProfile');
    const tabAuthBtn = document.getElementById('profTabBtnAuth');
    const secProfile = document.getElementById('profSectionProfile');
    const secAuth = document.getElementById('profSectionAuth');

    if (tab === 'profile') {
        if (tabProfileBtn) tabProfileBtn.classList.add('active');
        if (tabAuthBtn) tabAuthBtn.classList.remove('active');
        if (secProfile) secProfile.classList.add('active');
        if (secAuth) secAuth.classList.remove('active');
    } else {
        if (tabProfileBtn) tabProfileBtn.classList.remove('active');
        if (tabAuthBtn) tabAuthBtn.classList.add('active');
        if (secProfile) secProfile.classList.remove('active');
        if (secAuth) secAuth.classList.add('active');
    }
}

function toggleAuthMode(mode) {
    const regForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const regBtn = document.getElementById('authModeRegisterBtn');
    const loginBtn = document.getElementById('authModeLoginBtn');

    if (mode === 'register') {
        if (regForm) regForm.style.display = 'block';
        if (loginForm) loginForm.style.display = 'none';
        if (regBtn) regBtn.classList.add('active');
        if (loginBtn) loginBtn.classList.remove('active');
    } else {
        if (regForm) regForm.style.display = 'none';
        if (loginForm) loginForm.style.display = 'block';
        if (regBtn) regBtn.classList.remove('active');
        if (loginBtn) loginBtn.classList.add('active');
    }
}

function renderProfileModalContent() {
    const u = AppState.user;
    if (!u) return;

    // Avatar e dados
    const avatarEl = document.getElementById('profAvatarDisplay');
    const nameEl = document.getElementById('profNameDisplay');
    const emailEl = document.getElementById('profEmailDisplay');
    const lvlTitleTag = document.getElementById('profLevelTitleTag');
    const xpText = document.getElementById('profXpText');
    const xpProgressBar = document.getElementById('profXpProgressBar');

    if (avatarEl) avatarEl.textContent = u.avatar || '🧙‍♂️';
    if (nameEl) nameEl.textContent = u.name || 'Viajante Astral';
    if (emailEl) emailEl.textContent = u.email || 'Conta Convidado';
    if (lvlTitleTag) lvlTitleTag.textContent = u.levelTitle || 'Aprendiz do Véu';

    // Barra de Nível e XP
    let currentLvl = LEVELS[0];
    for (let l of LEVELS) {
        if (u.xp >= l.minXp) currentLvl = l;
    }
    const xpInLevel = u.xp - currentLvl.minXp;
    const range = (currentLvl.maxXp - currentLvl.minXp) + 1;
    const progressPercent = Math.min(100, Math.round((xpInLevel / range) * 100));

    if (xpText) xpText.textContent = `${u.xp} / ${currentLvl.maxXp + 1} XP`;
    if (xpProgressBar) xpProgressBar.style.width = `${progressPercent}%`;

    // Arcano da Alma
    const soulCard = getArcanoById(u.soulCardId || 0) || ARCANOS_DATA[0];
    const soulCardSvg = document.getElementById('profSoulCardSvg');
    const soulCardName = document.getElementById('profSoulCardName');
    const soulCardDesc = document.getElementById('profSoulCardDesc');

    if (soulCardSvg) soulCardSvg.innerHTML = soulCard.iconeSvg;
    if (soulCardName) soulCardName.textContent = `${soulCard.numero}. ${soulCard.nome}`;
    if (soulCardDesc) soulCardDesc.textContent = soulCard.arquetipoVida || soulCard.direito;

    // Estatísticas
    const streakStat = document.getElementById('profStreakStat');
    const readingsCount = document.getElementById('profReadingsCount');
    const tasksCount = document.getElementById('profTasksCompletedCount');
    const badgesCount = document.getElementById('profBadgesCount');

    if (streakStat) streakStat.textContent = `🔥 ${u.streak || 1} dia(s)`;
    if (readingsCount) readingsCount.textContent = u.readingsCount || AppState.history.length;
    if (tasksCount) tasksCount.textContent = u.tasksCompletedCount || AppState.tasks.filter(t => t.completed).length;
    if (badgesCount) badgesCount.textContent = `${(u.badges || []).length} / ${BADGES_DEFINITIONS.length}`;

    // Grid de Conquistas
    const badgesGrid = document.getElementById('profileBadgesGrid');
    if (badgesGrid) {
        badgesGrid.innerHTML = BADGES_DEFINITIONS.map(badge => {
            const unlocked = (u.badges || []).includes(badge.id);
            return `
                <div class="achievement-badge-card ${unlocked ? 'unlocked' : 'locked'}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${escapeHtml(badge.name)}</div>
                    <div class="badge-desc">${escapeHtml(badge.desc)}</div>
                </div>
            `;
        }).join('');
    }
}

function selecionarAvatarRapido(avatar) {
    if (!AppState.user) return;
    AppState.user.avatar = avatar;
    salvarUsuarioAtual();
    renderProfileModalContent();
    atualizarHeaderUserUI();
    showToast(`Avatar alterado para ${avatar}`);
}

function submeterCadastro() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const birthdate = document.getElementById('regBirthdate').value;
    const password = document.getElementById('regPassword').value;
    const avatar = document.querySelector('input[name="regAvatar"]:checked')?.value || '🧙‍♂️';

    if (!name || !email || !birthdate || !password) {
        showToast('Preencha todos os campos obrigatórios.');
        return;
    }

    const soulCard = calcularArcanoDeNascimento(birthdate);

    const newUser = {
        id: 'usr_' + Date.now(),
        name: name,
        email: email,
        password: password,
        birthdate: birthdate,
        avatar: avatar,
        soulCardId: soulCard.id,
        xp: 50, // Bônus de boas-vindas
        level: 1,
        levelTitle: 'Aprendiz do Véu',
        streak: 1,
        lastVisitDate: new Date().toISOString().split('T')[0],
        readingsCount: AppState.history.length,
        tasksCompletedCount: AppState.tasks.filter(t => t.completed).length,
        badges: ['despertar'],
        humorHistory: []
    };

    AppState.user = newUser;
    salvarUsuarioAtual();
    renderProfileModalContent();
    atualizarHeaderUserUI();
    switchProfileModalTab('profile');
    playLevelUpSound();
    showToast(`Conta criada com sucesso! Seu Arcano da Alma é ${soulCard.nome} ✦`);
}

function submeterLogin() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const found = AppState.usersList.find(u => u.email === email && u.password === password);
    if (found) {
        AppState.user = found;
        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, found.id);
        atualizarStreakDiario();
        salvarUsuarioAtual();
        renderProfileModalContent();
        atualizarHeaderUserUI();
        switchProfileModalTab('profile');
        playMysticChime(660, 1);
        showToast(`Bem-vindo(a) de volta, ${found.name}!`);
    } else {
        showToast('E-mail ou senha não encontrados.');
    }
}

function desconectarOuResetarConta() {
    if (confirm('Deseja sair desta conta neste navegador? Seus dados permanecerão salvos localmente.')) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
        initUserAndStreak();
        renderProfileModalContent();
        showToast('Você saiu da conta.');
    }
}

// Backup & Restauração JSON
function exportarDadosBackup() {
    const backupData = {
        app: 'OraculoDoTaro',
        version: '2.0',
        exportedAt: new Date().toISOString(),
        user: AppState.user,
        tasks: AppState.tasks,
        history: AppState.history,
        daily: AppState.dailyData
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `oraculo_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Backup exportado com sucesso! Guarde seu arquivo JSON.');
}

function importarDadosBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.tasks) {
                AppState.tasks = data.tasks;
                saveTasks();
            }
            if (data.history) {
                AppState.history = data.history;
                saveHistory();
            }
            if (data.user) {
                AppState.user = data.user;
                salvarUsuarioAtual();
            }
            if (data.daily) {
                AppState.dailyData = data.daily;
                salvarDailyData();
            }

            renderTasks();
            renderHistory();
            atualizarHeaderUserUI();
            renderProfileModalContent();
            renderDailyTab();
            showToast('Dados restaurados com sucesso!');
        } catch(err) {
            console.error(err);
            showToast('Erro ao importar arquivo JSON.');
        }
    };
    reader.readAsText(file);
}

// ========================================================
// RITUAL MATINAL & ARCANO DO DIA (RETENÇÃO DIÁRIA)
// ========================================================
function loadDailyData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.DAILY);
        if (saved) {
            AppState.dailyData = JSON.parse(saved);
        }
    } catch(e) {
        console.error('Erro ao ler dados diários:', e);
    }
    renderDailyTab();
}

function salvarDailyData() {
    try {
        localStorage.setItem(STORAGE_KEYS.DAILY, JSON.stringify(AppState.dailyData));
    } catch(e) {}
}

function renderDailyTab() {
    const todayStr = new Date().toISOString().split('T')[0];
    const isTodayDrawn = AppState.dailyData && AppState.dailyData.dataStr === todayStr;

    const lockedBox = document.getElementById('dailyLockedState');
    const revealedBox = document.getElementById('dailyRevealedState');
    const dailyBadge = document.getElementById('dailyNewBadge');

    // Título de data formatada
    const dailyDateTitle = document.getElementById('dailyDateTitle');
    if (dailyDateTitle) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dataHojeFormatada = new Date().toLocaleDateString('pt-BR', options);
        dailyDateTitle.textContent = `Arcano do Dia • ${dataHojeFormatada.charAt(0).toUpperCase() + dataHojeFormatada.slice(1)}`;
    }

    if (!isTodayDrawn) {
        if (lockedBox) lockedBox.style.display = 'flex';
        if (revealedBox) revealedBox.style.display = 'none';
        if (dailyBadge) dailyBadge.style.display = 'inline-block';
        return;
    }

    // Já tirou hoje
    if (lockedBox) lockedBox.style.display = 'none';
    if (revealedBox) revealedBox.style.display = 'block';
    if (dailyBadge) dailyBadge.style.display = 'none';

    const card = AppState.dailyData.carta;
    const invertida = AppState.dailyData.invertida;

    // Renderiza a carta
    const cardContainer = document.getElementById('dailyCardContainer');
    if (cardContainer) {
        cardContainer.innerHTML = `
            <div class="tarot-card flipped">
                <div class="card-face back ${invertida ? 'inverted' : ''}">
                    <div class="card-inner-frame">
                        <div class="card-top-number">${card.numero}</div>
                        <div class="card-svg-container ${invertida ? 'inverted' : ''}">
                            ${card.iconeSvg}
                        </div>
                        <div class="card-name-title">${card.nome}</div>
                        <div class="card-status-badge ${invertida ? 'inverted' : 'upright'}">
                            ${invertida ? 'Posição Invertida' : 'Posição Direita'}
                        </div>
                        <div class="card-meaning-text">
                            ${invertida ? card.invertido : card.direito}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Informações da orientação diária
    const energyText = document.getElementById('dailyEnergyText');
    const questText = document.getElementById('dailyQuestText');
    const mantraText = document.getElementById('dailyMantraText');

    if (energyText) {
        energyText.textContent = invertida 
            ? `Cuidado com: ${card.invertido}. Busque restaurar a harmonia desse arquétipo.`
            : `Potencial ativado: ${card.direito}. Conecte-se com as palavras-chave: ${card.palavrasChave.join(', ')}.`;
    }
    if (questText) questText.textContent = card.acaoSugerida;
    if (mantraText) mantraText.textContent = `"${card.afirmacao}"`;

    // Atualiza botão de humor se já votou
    const savedMood = AppState.dailyData.humor;
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mood === savedMood);
    });
    const moodFeedback = document.getElementById('dailyMoodSavedFeedback');
    if (moodFeedback && savedMood) {
        moodFeedback.textContent = `✦ Sintonia registrada: ${savedMood}`;
    }

    iniciarContadorRegressivoDiario();
}

function realizarRitualArcanoDoDia() {
    initAudio();
    const todayStr = new Date().toISOString().split('T')[0];

    // Sorteio aleatório dos 22 Arcanos
    const randomIndex = Math.floor(Math.random() * ARCANOS_DATA.length);
    const carta = ARCANOS_DATA[randomIndex];
    const invertida = Math.random() < 0.2;

    AppState.dailyData = {
        dataStr: todayStr,
        timestamp: new Date().toISOString(),
        carta: carta,
        invertida: invertida,
        humor: null
    };

    salvarDailyData();

    // Recompensa ao usuário: +30 XP e Conquista Solar
    addXP(30, 'Ritual do Arcano do Dia realizado com sucesso! ☀️');
    desbloquearBadge('solar');

    // Registra leitura no histórico
    const reading = {
        id: 'daily_' + Date.now(),
        data: new Date().toISOString(),
        pergunta: 'Arcano do Dia (Ritual Matinal)',
        tipoTiragem: 'daily',
        tituloTiragem: 'Arcano do Dia',
        isFavorite: false,
        notes: '',
        cartas: [{
            posicaoNome: 'Arcano Regente',
            posicaoDesc: 'Energia Cósmica do Dia',
            carta: carta,
            invertida: invertida
        }]
    };
    AppState.history.unshift(reading);
    saveHistory();
    renderHistory();

    playMysticChime(528, 2);
    renderDailyTab();
    showToast(`Seu Arcano de Hoje é ${carta.nome}! (+30 XP)`);
}

function adicionarMissaoDiariaComoTarefa() {
    if (!AppState.dailyData || !AppState.dailyData.carta) return;
    const c = AppState.dailyData.carta;
    const taskTitle = `Missão do Dia (${c.nome}): ${c.acaoSugerida}`;
    addTask(taskTitle, 'espiritual', 'alta', c.nome);
    const btn = document.getElementById('btnDailyQuestToTask');
    if (btn) {
        btn.innerHTML = '<span>✓</span> Adicionada às Tarefas';
        btn.disabled = true;
    }
}

function copiarMantraDoDia() {
    if (!AppState.dailyData || !AppState.dailyData.carta) return;
    const mantra = AppState.dailyData.carta.afirmacao;
    navigator.clipboard.writeText(mantra).then(() => {
        showToast('Mantra copiado para a área de transferência! 📋');
    }).catch(() => {
        showToast(`Mantra: "${mantra}"`);
    });
}

function registrarHumorDiario(moodKey, moodLabel) {
    if (!AppState.dailyData) return;
    AppState.dailyData.humor = moodLabel;
    salvarDailyData();
    renderDailyTab();
    addXP(10, 'Check-in astral diário registrado!');
}

let countdownInterval = null;
function iniciarContadorRegressivoDiario() {
    if (countdownInterval) clearInterval(countdownInterval);
    const timerEl = document.getElementById('dailyCountdownTimer');
    if (!timerEl) return;

    function atualizar() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;

        if (diff <= 0) {
            timerEl.textContent = '00:00:00 (Disponível agora!)';
            return;
        }

        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        timerEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }

    atualizar();
    countdownInterval = setInterval(atualizar, 1000);
}

// ========================================================
// MESA CÓSMICA INTERATIVA & TIRAGENS (ESTILO OTAROT.NET)
// ========================================================
const SPREAD_CONFIGS = {
    'cruz-celtica': {
        titulo: 'Cruz Céltica Completa (10 Cartas)',
        subtitulo: 'A tiragem mais clássica e aprofundada do Tarô para destino, bloqueios e perspectivas.',
        count: 10,
        posicoes: [
            { nome: "1. O Presente", desc: "A essência e energia central do seu momento" },
            { nome: "2. O Obstáculo", desc: "O que desafia ou cruza o seu caminho" },
            { nome: "3. A Raiz", desc: "A origem inconsciente ou o passado que construiu a situação" },
            { nome: "4. O Passado Recente", desc: "Eventos que acabaram de acontecer e ainda ressoam" },
            { nome: "5. O Objetivo", desc: "A melhor aspiração ou o coroamento possível" },
            { nome: "6. O Futuro Imediato", desc: "O próximo passo e tendência que se aproxima" },
            { nome: "7. O Conselho / Atitude", desc: "A postura mental e atitude recomendada a você" },
            { nome: "8. Forças Externas", desc: "Como o ambiente e as pessoas ao redor afetam a questão" },
            { nome: "9. Esperanças & Receios", desc: "Seus anseios íntimos e medos ocultos" },
            { nome: "10. O Desfecho Final", desc: "A síntese evolutiva e o resultado final provável" }
        ]
    },
    '5': {
        titulo: 'Método Sagrado de 5 Cartas',
        subtitulo: 'Visão equilibrada: Raiz, Momento Atual, Desafio, Conselho Prático e Arcano Chave.',
        count: 5,
        posicoes: [
            { nome: "1. Raiz", desc: "A base e origem oculta da situação" },
            { nome: "2. Momento", desc: "A energia predominante no presente" },
            { nome: "3. Obstáculo", desc: "O desafio ou o que precisa ser superado" },
            { nome: "4. Conselho", desc: "A atitude prática recomendada" },
            { nome: "5. Arcano Chave", desc: "A síntese e o desfecho evolutivo" }
        ]
    },
    'amor': {
        titulo: 'Tarot do Amor & Vínculos (3 Cartas)',
        subtitulo: 'Análise profunda da dinâmica de sentimentos, desejos e futuro da conexão afetiva.',
        count: 3,
        posicoes: [
            { nome: "1. Seus Sentimentos", desc: "Sua vibração afetiva, desejos e intenções" },
            { nome: "2. A Parceria / O Outro", desc: "Os sentimentos, expectativas e postura da outra pessoa" },
            { nome: "3. O Destino da Conexão", desc: "Para onde a relação caminha e o conselho do amor" }
        ]
    },
    'trabalho': {
        titulo: 'Tarot da Carreira & Prosperidade (3 Cartas)',
        subtitulo: 'Clareza estratégica para negócios, metas financeiras e decisões profissionais.',
        count: 3,
        posicoes: [
            { nome: "1. Cenário Atual", desc: "A energia do seu trabalho e posição profissional" },
            { nome: "2. Desafio / Atenção", desc: "Onde pode haver riscos ou exigência de foco redobrado" },
            { nome: "3. Chave do Sucesso", desc: "O caminho para a prosperidade e vitória profissional" }
        ]
    },
    'simnao': {
        titulo: 'Tarot Sim ou Não (1 Carta)',
        subtitulo: 'Resposta direta e objetiva com conselho imediato e termômetro intuitivo.',
        count: 1,
        posicoes: [
            { nome: "Resposta & Conselho", desc: "O veredito do oráculo sobre a sua pergunta" }
        ]
    },
    '3': {
        titulo: 'Tríade da Jornada (3 Cartas)',
        subtitulo: 'Situação atual, o que pede atenção consciente e a orientação de ação.',
        count: 3,
        posicoes: [
            { nome: "1. A Situação", desc: "O cenário em pleno desenvolvimento" },
            { nome: "2. Pede Atenção", desc: "O ponto crítico ou cautela necessária" },
            { nome: "3. Orientação", desc: "O caminho e a ação indicada" }
        ]
    },
    '1': {
        titulo: 'Reflexão Rápida (1 Arcano)',
        subtitulo: 'Um raio de luz oracular imediato para inspirar sua mente.',
        count: 1,
        posicoes: [
            { nome: "Arcano Regente", desc: "O foco essencial da sua indagação" }
        ]
    }
};

const SUGGESTIONS_BY_SPREAD = {
    'cruz-celtica': [
        "O que o destino me reserva para os próximos meses?",
        "Qual o panorama completo sobre a minha vida atual?",
        "Quais forças ocultas estão agindo no meu caminho?"
    ],
    'amor': [
        "O que essa pessoa sente verdadeiramente por mim?",
        "Qual o futuro da nossa relação e como harmonizá-la?",
        "O que preciso curar no meu coração para viver um amor pleno?"
    ],
    'trabalho': [
        "Qual o melhor caminho para expandir minha carreira?",
        "Devo aceitar uma nova oportunidade de trabalho ou negócio?",
        "Como destravar minhas finanças e atrair prosperidade?"
    ],
    'simnao': [
        "Devo tomar essa decisão agora?",
        "Esse projeto terá retorno positivo?",
        "Essa pessoa é confiável para essa aliança?"
    ],
    'default': [
        "O que preciso compreender sobre o meu momento atual?",
        "Qual conselho para destravar minhas metas de hoje?",
        "Como equilibrar minhas emoções e ter clareza nas escolhas?"
    ]
};

function atualizarDicasPergunta() {
    const spreadType = document.getElementById('spreadType').value;
    const chipsContainer = document.getElementById('suggestionChipsContainer');
    if (!chipsContainer) return;

    const list = SUGGESTIONS_BY_SPREAD[spreadType] || SUGGESTIONS_BY_SPREAD['default'];
    chipsContainer.innerHTML = list.map(sug => `
        <span class="chip" onclick="aplicarSugestaoPergunta('${escapeHtml(sug)}')">
            ✦ ${escapeHtml(sug)}
        </span>
    `).join('');
}

function aplicarSugestaoPergunta(texto) {
    const qInput = document.getElementById('question');
    if (qInput) {
        qInput.value = texto;
        qInput.focus();
    }
}

function iniciarTiragemEscolhida() {
    abrirMesaInterativa();
}

// Inicia o fluxo: abre o modal de respiração meditativa ou a mesa
function abrirMesaInterativa() {
    initAudio();
    const qInput = document.getElementById('question');
    const spreadSelect = document.getElementById('spreadType');

    const pergunta = qInput.value.trim();
    if (!pergunta) {
        qInput.focus();
        showToast('Por favor, digite sua pergunta antes de abrir o baralho.');
        return;
    }

    const spreadType = spreadSelect.value;
    const config = SPREAD_CONFIGS[spreadType] || SPREAD_CONFIGS['5'];

    AppState.interactiveDeck = {
        active: true,
        spreadType: spreadType,
        question: pergunta,
        positions: config.posicoes,
        tituloTiragem: config.titulo,
        subtituloTiragem: config.subtitulo,
        pickedCards: [],
        availableDeck: embaralhar([...ARCANOS_DATA])
    };

    // Abre o modal de respiração para sintonizar a intenção
    const breathModal = document.getElementById('breathModal');
    if (breathModal) {
        breathModal.classList.add('active');
        playMysticChime(432, 2.5);
    } else {
        concluirRespiracaoEIrParaMesa();
    }
}

function concluirRespiracaoEIrParaMesa() {
    const breathModal = document.getElementById('breathModal');
    if (breathModal) breathModal.classList.remove('active');

    const deckSection = document.getElementById('interactiveDeckSection');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (deckSection) {
        deckSection.style.display = 'block';
        deckSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    playShuffleSound();
    renderMesaInterativa();
}

function fecharMesaInterativa() {
    const deckSection = document.getElementById('interactiveDeckSection');
    if (deckSection) deckSection.style.display = 'none';
    AppState.interactiveDeck.active = false;
}

function renderMesaInterativa() {
    const state = AppState.interactiveDeck;
    const board = document.getElementById('interactiveDeckBoard');
    const tray = document.getElementById('pickedSlotsTray');
    const promptEl = document.getElementById('deckSelectionPrompt');

    if (!board || !tray) return;

    const totalNeeded = state.positions.length;
    const currentCount = state.pickedCards.length;
    const nextTargetPos = state.positions[currentCount];

    if (promptEl) {
        if (nextTargetPos) {
            promptEl.innerHTML = `Escolha a carta com sua intuição para: <strong>${nextTargetPos.nome}</strong> (${currentCount}/${totalNeeded})`;
        } else {
            promptEl.textContent = 'Todas as cartas foram escolhidas! Revelando o Oráculo...';
        }
    }

    // Bandeja de slots das posições
    tray.innerHTML = state.positions.map((pos, idx) => {
        const picked = state.pickedCards[idx];
        const isTarget = idx === currentCount;
        return `
            <div class="picked-slot-chip ${picked ? 'filled' : ''} ${isTarget ? 'current-target' : ''}">
                <div class="slot-pos-label">${pos.nome}</div>
                <div class="slot-card-status">
                    ${picked ? `✦ ${picked.carta.nome}` : (isTarget ? '👉 Escolha agora' : 'Aguardando')}
                </div>
            </div>
        `;
    }).join('');

    // Mesa com as 22 cartas
    board.innerHTML = state.availableDeck.map((carta, index) => {
        const isPicked = state.pickedCards.some(p => p.carta.id === carta.id);
        return `
            <div 
                class="deck-card-item ${isPicked ? 'picked' : ''}" 
                id="deckCardItem_${index}"
                onclick="escolherCartaDaMesa(${index})"
                title="${isPicked ? 'Já selecionada' : 'Clique para escolher esta carta'}"
            >
                <div class="deck-card-pattern">
                    <svg viewBox="0 0 40 60" width="28" height="42" fill="none" stroke="currentColor">
                        <circle cx="20" cy="30" r="14" stroke-width="1.2" stroke-dasharray="2 2"/>
                        <polygon points="20,10 27,25 40,30 27,35 20,50 13,35 0,30 13,25" stroke-width="1"/>
                        <circle cx="20" cy="30" r="4" fill="currentColor"/>
                    </svg>
                </div>
            </div>
        `;
    }).join('');
}

function escolherCartaDaMesa(cardIndex) {
    const state = AppState.interactiveDeck;
    if (!state.active) return;
    
    const carta = state.availableDeck[cardIndex];
    if (!carta) return;

    // Se já foi selecionada, ignora
    if (state.pickedCards.some(p => p.carta.id === carta.id)) return;

    const currentPosIndex = state.pickedCards.length;
    const targetPos = state.positions[currentPosIndex];
    if (!targetPos) return;

    const invertida = Math.random() < 0.22;
    state.pickedCards.push({
        posicaoNome: targetPos.nome,
        posicaoDesc: targetPos.desc,
        carta: carta,
        invertida: invertida
    });

    playMysticChime(420 + (currentPosIndex * 70), 1.2);
    renderMesaInterativa();

    // Se completou a tiragem
    if (state.pickedCards.length >= state.positions.length) {
        setTimeout(() => {
            finalizarTiragemDaMesa();
        }, 700);
    }
}

function embaralharMesaVisual() {
    playShuffleSound();
    const cards = document.querySelectorAll('.deck-card-item');
    cards.forEach(c => {
        c.style.setProperty('--rand-x', (Math.random() * 40 - 20));
        c.style.setProperty('--rand-y', (Math.random() * 40 - 20));
        c.style.setProperty('--rand-r', (Math.random() * 30 - 15));
        c.classList.add('shuffling');
    });

    setTimeout(() => {
        AppState.interactiveDeck.availableDeck = embaralhar(AppState.interactiveDeck.availableDeck);
        renderMesaInterativa();
    }, 600);
}

function completarEscolhaAutomatica() {
    const state = AppState.interactiveDeck;
    if (!state.active) return;

    while (state.pickedCards.length < state.positions.length) {
        const nextPos = state.positions[state.pickedCards.length];
        const unpicked = state.availableDeck.filter(c => !state.pickedCards.some(p => p.carta.id === c.id));
        if (unpicked.length === 0) break;
        const randomCard = unpicked[Math.floor(Math.random() * unpicked.length)];
        const invertida = Math.random() < 0.22;
        state.pickedCards.push({
            posicaoNome: nextPos.nome,
            posicaoDesc: nextPos.desc,
            carta: randomCard,
            invertida: invertida
        });
    }

    playShuffleSound();
    renderMesaInterativa();
    setTimeout(() => {
        finalizarTiragemDaMesa();
    }, 500);
}

function finalizarTiragemDaMesa() {
    const state = AppState.interactiveDeck;
    fecharMesaInterativa();
    exibirResultadosDaTiragem(state.question, state.spreadType, state.tituloTiragem, state.pickedCards);
}

// Tiragem Instantânea (sem mesa manual)
function realizarTiragemInstantanea() {
    initAudio();
    const qInput = document.getElementById('question');
    const spreadSelect = document.getElementById('spreadType');

    const pergunta = qInput.value.trim();
    if (!pergunta) {
        qInput.focus();
        showToast('Por favor, digite sua pergunta ou foco.');
        return;
    }

    const spreadType = spreadSelect.value;
    const config = SPREAD_CONFIGS[spreadType] || SPREAD_CONFIGS['5'];
    const baralho = embaralhar([...ARCANOS_DATA]);

    const cartasTiradas = config.posicoes.map((pos, idx) => ({
        posicaoNome: pos.nome,
        posicaoDesc: pos.desc,
        carta: baralho[idx],
        invertida: Math.random() < 0.22
    }));

    exibirResultadosDaTiragem(pergunta, spreadType, config.titulo, cartasTiradas);
}

function exibirResultadosDaTiragem(pergunta, tipoTiragem, tituloTiragem, cartasTiradas) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsDiv = document.getElementById('results');
    const spreadInfoDiv = document.getElementById('spreadInfo');
    const simNaoBanner = document.getElementById('simNaoBanner');
    const journalInput = document.getElementById('readingJournalInput');
    const favIconText = document.getElementById('favIconText');

    // Monta o objeto de leitura
    AppState.currentReading = {
        id: 'reading_' + Date.now(),
        data: new Date().toISOString(),
        pergunta: pergunta,
        tipoTiragem: tipoTiragem,
        tituloTiragem: tituloTiragem,
        cartas: cartasTiradas,
        isFavorite: false,
        notes: ''
    };

    // Salva no histórico
    AppState.history.unshift(AppState.currentReading);
    if (AppState.history.length > 50) AppState.history.pop();
    saveHistory();
    renderHistory();

    // Recompensas de Gamificação
    if (AppState.user) {
        AppState.user.readingsCount = (AppState.user.readingsCount || 0) + 1;
        addXP(25, 'Consulta oracular realizada (+25 XP)');
        desbloquearBadge('despertar');

        if (tipoTiragem === 'amor') desbloquearBadge('amor');
        if (tipoTiragem === 'cruz-celtica') desbloquearBadge('cruz');
    }

    // Header da Tiragem
    spreadInfoDiv.innerHTML = `
        <h3>🔮 ${tituloTiragem}</h3>
        <p>"${escapeHtml(pergunta)}"</p>
    `;

    // Banner Especial Sim ou Não
    if (tipoTiragem === 'simnao' && cartasTiradas[0]) {
        const c = cartasTiradas[0].carta;
        const inv = cartasTiradas[0].invertida;
        let resposta = c.simNao;
        if (inv && resposta === 'SIM') resposta = 'TALVEZ';
        else if (inv && resposta === 'TALVEZ') resposta = 'NÃO';

        const classeBadge = resposta.toLowerCase().replace(/ã/, 'a');
        simNaoBanner.style.display = 'flex';
        simNaoBanner.innerHTML = `
            <div class="sim-nao-badge ${classeBadge}">
                ${resposta}!
            </div>
            <div class="sim-nao-text">
                <h4>Veredito do Oráculo (${c.nome} • ${inv ? 'Invertida' : 'Direita'})</h4>
                <p>${c.simNaoDesc}</p>
            </div>
        `;
    } else {
        simNaoBanner.style.display = 'none';
    }

    // Renderiza as cartas
    resultsDiv.innerHTML = cartasTiradas.map((item, idx) => {
        const c = item.carta;
        const significado = item.invertida ? c.invertido : c.direito;
        const badgeClasse = item.invertida ? 'inverted' : 'upright';

        return `
            <div class="card-wrapper" data-index="${idx}">
                <div class="card-position-title">
                    <span>✦</span> ${item.posicaoNome}
                </div>
                <div class="tarot-card" id="tarotCard_${idx}" onclick="flipCard(${idx})">
                    <!-- Frente (Verso Cósmico) -->
                    <div class="card-face front">
                        <div class="card-back-pattern">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
                                <circle cx="50" cy="50" r="38" stroke-width="1.5" stroke-dasharray="3 3"/>
                                <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" stroke-width="1.5"/>
                                <circle cx="50" cy="50" r="10" stroke-width="1.5"/>
                            </svg>
                            <span class="card-back-hint">Clique para Virar</span>
                        </div>
                    </div>

                    <!-- Face do Arcano Revelada -->
                    <div class="card-face back ${item.invertida ? 'inverted' : ''}">
                        <div class="card-inner-frame">
                            <div class="card-top-number">${c.numero}</div>
                            
                            <div class="card-svg-container ${item.invertida ? 'inverted' : ''}">
                                ${c.iconeSvg}
                            </div>
                            
                            <div class="card-name-title">${c.nome}</div>
                            
                            <div class="card-status-badge ${badgeClasse}">
                                ${item.invertida ? 'Invertida' : 'Direita'}
                            </div>
                            
                            <div class="card-meaning-text" title="${escapeHtml(significado)}">
                                ${significado}
                            </div>

                            <div style="display: flex; gap: 4px; width: 100%;">
                                <button type="button" class="card-action-btn" onclick="event.stopPropagation(); addTaskFromCard(${idx})">
                                    <span>➕</span> Tarefa
                                </button>
                                <button type="button" class="card-action-btn" style="background: rgba(143, 127, 94, 0.06); border-color: var(--border-color);" onclick="event.stopPropagation(); openArcanoModal(${c.id})">
                                    <span>📖</span> Grimório
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Limpa caixa de diário e favoritos
    if (journalInput) journalInput.value = '';
    if (favIconText) favIconText.textContent = '⭐';

    resultsContainer.style.display = 'flex';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Sequência suave de revelação 3D
    cartasTiradas.forEach((_, idx) => {
        setTimeout(() => {
            const cardEl = document.getElementById(`tarotCard_${idx}`);
            if (cardEl && !cardEl.classList.contains('flipped')) {
                cardEl.classList.add('flipped');
                playMysticChime(420 + (idx * 50), 1.2);
            }
        }, 300 + (idx * 350));
    });
}

function flipCard(idx) {
    const cardEl = document.getElementById(`tarotCard_${idx}`);
    if (cardEl) {
        cardEl.classList.toggle('flipped');
        if (cardEl.classList.contains('flipped')) {
            playMysticChime(528, 1);
        }
    }
}

function addTaskFromCard(idx) {
    if (!AppState.currentReading || !AppState.currentReading.cartas[idx]) return;
    const item = AppState.currentReading.cartas[idx];
    const carta = item.carta;
    
    const taskTitle = `${carta.nome} (${item.posicaoNome}): ${carta.acaoSugerida}`;
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

function salvarAnotacaoLeituraAtual() {
    const input = document.getElementById('readingJournalInput');
    if (!input || !AppState.currentReading) return;

    AppState.currentReading.notes = input.value;
    const histItem = AppState.history.find(h => h.id === AppState.currentReading.id);
    if (histItem) {
        histItem.notes = input.value;
        saveHistory();
    }
    desbloquearBadge('diario');
}

function toggleFavoritoLeituraAtual() {
    if (!AppState.currentReading) return;
    AppState.currentReading.isFavorite = !AppState.currentReading.isFavorite;
    
    const histItem = AppState.history.find(h => h.id === AppState.currentReading.id);
    if (histItem) {
        histItem.isFavorite = AppState.currentReading.isFavorite;
        saveHistory();
    }

    const favIcon = document.getElementById('favIconText');
    if (favIcon) {
        favIcon.textContent = AppState.currentReading.isFavorite ? '🌟' : '⭐';
    }

    renderHistory();
    showToast(AppState.currentReading.isFavorite ? 'Consulta adicionada aos favoritos! ⭐' : 'Removida dos favoritos');
}

function compartilharLeituraAtual() {
    if (!AppState.currentReading) return;
    const r = AppState.currentReading;
    
    let text = `🔮 *Oráculo do Tarô • ${r.tituloTiragem}*\n`;
    text += `❓ Pergunta: "${r.pergunta}"\n\n`;
    text += `*Cartas Reveladas:*\n`;
    
    r.cartas.forEach(c => {
        text += `✦ ${c.posicaoNome}: ${c.carta.nome} (${c.invertida ? 'Invertida' : 'Direita'})\n`;
        text += `   _${c.invertida ? c.carta.invertido : c.carta.direito}_\n`;
    });

    text += `\n✨ Consulte seu futuro e ações diárias no Oráculo dos Arcanos!`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Resumo da consulta copiado para a área de transferência! 📤');
    }).catch(() => {
        showToast('Resumo gerado.');
    });
}

function abrirNovaConsulta() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) resultsContainer.style.display = 'none';
    const qInput = document.getElementById('question');
    if (qInput) {
        qInput.value = '';
        qInput.focus();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// GESTÃO DE TAREFAS SAGRADAS (TO-DO)
// ========================================================
function loadStoredTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (savedTasks) {
            AppState.tasks = JSON.parse(savedTasks);
        } else {
            AppState.tasks = [
                {
                    id: 'default-1',
                    title: 'Fazer a tiragem do Arcano do Dia para orientar as prioridades de hoje',
                    category: 'espiritual',
                    priority: 'alta',
                    completed: false,
                    arcanoOrigin: 'O Mago',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'default-2',
                    title: 'Organizar as pendências mais urgentes com clareza e mente focada',
                    category: 'trabalho',
                    priority: 'media',
                    completed: false,
                    arcanoOrigin: 'A Justiça',
                    createdAt: new Date().toISOString()
                }
            ];
            saveTasks();
        }
    } catch(e) {
        console.error('Erro ao ler tarefas:', e);
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
    showToast(`Tarefa adicionada: "${newTask.title.substring(0, 32)}..."`);
    return true;
}

function toggleTaskStatus(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) {
            playTaskSuccessSound();
            addXP(15, 'Tarefa sagrada concluída (+15 XP)');
            if (AppState.user) {
                AppState.user.tasksCompletedCount = (AppState.user.tasksCompletedCount || 0) + 1;
                salvarUsuarioAtual();
                if (AppState.user.tasksCompletedCount >= 5) {
                    desbloquearBadge('tarefas5');
                }
            }
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

    if (AppState.currentFilter === 'pending') {
        filtered = filtered.filter(t => !t.completed);
    } else if (AppState.currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }

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
// GRIMÓRIO, ELEMENTOS & ARCANO DE NASCIMENTO
// ========================================================
let currentGrimorioElementFilter = 'all';

function renderGrimorio(filterQuery = '') {
    const grid = document.getElementById('grimorioGrid');
    if (!grid) return;

    const query = filterQuery.toLowerCase().trim();
    const filtered = ARCANOS_DATA.filter(arcano => {
        // Filtro por Elemento
        if (currentGrimorioElementFilter !== 'all') {
            if (!arcano.elemento.includes(currentGrimorioElementFilter)) return false;
        }

        // Filtro de Busca
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
                Nenhum Arcano encontrado para a busca selecionada.
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

function filtrarGrimorioPorElemento(elem) {
    currentGrimorioElementFilter = elem;
    document.querySelectorAll('.elem-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.elem === elem);
    });
    const searchVal = document.getElementById('grimorioSearch')?.value || '';
    renderGrimorio(searchVal);
}

function calcularEVisualizarArcanoAlma() {
    const dateInput = document.getElementById('birthdateCalcInput');
    if (!dateInput || !dateInput.value) {
        showToast('Por favor, selecione sua data de nascimento.');
        return;
    }

    const soulCard = calcularArcanoDeNascimento(dateInput.value);
    openArcanoModal(soulCard.id, true);
    addXP(15, 'Numerologia do Tarô explorada!');
}

function openArcanoModal(arcanoId, isSoulCardModal = false) {
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

        ${isSoulCardModal ? `
            <div class="modal-section" style="border-color: var(--gold); background: rgba(201, 154, 46, 0.12);">
                <h4><span style="color: var(--gold-light);">✦</span> Seu Arquétipo da Alma / Propósito de Vida</h4>
                <p><strong>${arcano.arquetipoVida}</strong></p>
            </div>
        ` : ''}

        <div class="modal-section">
            <h4><span style="color: var(--gold-light);">✦</span> Posição Direita (Luz & Potencial)</h4>
            <p>${arcano.direito}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: var(--danger);">✦</span> Posição Invertida (Atenção & Sombra)</h4>
            <p>${arcano.invertido}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: #f472b6;">💖</span> Conselho no Amor & Relações</h4>
            <p>${arcano.amor}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: #38bdf8;">💼</span> Conselho na Carreira & Finanças</h4>
            <p>${arcano.trabalho}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: #fbbf24;">⚡</span> Oráculo Sim ou Não</h4>
            <p><strong>Resposta Geral: ${arcano.simNao}!</strong> — ${arcano.simNaoDesc}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: #4ade80;">✦</span> Missão Consciente / Tarefa Sugerida</h4>
            <p>${arcano.acaoSugerida}</p>
        </div>

        <div class="modal-section">
            <h4><span style="color: var(--accent-hover);">✦</span> Mantram de Alinhamento</h4>
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
// DIÁRIO CÓSMICO & HISTÓRICO DE LEITURAS
// ========================================================
function loadStoredHistory() {
    try {
        const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (savedHistory) {
            AppState.history = JSON.parse(savedHistory);
        }
    } catch(e) {
        console.error('Erro ao ler histórico:', e);
    }
}

function saveHistory() {
    try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(AppState.history));
    } catch (e) {
        console.error('Erro ao salvar histórico:', e);
    }
}

function renderHistory() {
    const container = document.getElementById('historyList');
    const emptyState = document.getElementById('historyEmptyState');
    if (!container) return;

    let filtered = AppState.history;

    if (AppState.currentHistoryFilter === 'favorites') {
        filtered = filtered.filter(h => h.isFavorite);
    } else if (AppState.currentHistoryFilter === 'daily') {
        filtered = filtered.filter(h => h.tipoTiragem === 'daily');
    }

    if (filtered.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(item => {
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
                    <div style="flex: 1;">
                        <div class="history-question">"${escapeHtml(item.pergunta)}"</div>
                        <div class="history-date">🔮 ${item.tituloTiragem} • ${dataFormatada}</div>
                    </div>
                    <div class="history-item-actions">
                        <button class="history-fav-btn ${item.isFavorite ? 'active' : ''}" onclick="toggleHistoryFavorite('${item.id}')" title="Favoritar">
                            ${item.isFavorite ? '🌟' : '⭐'}
                        </button>
                        <button class="icon-btn" style="width: 32px; height: 32px; font-size: 0.8rem;" onclick="compartilharItemHistorico('${item.id}')" title="Compartilhar">
                            📤
                        </button>
                    </div>
                </div>

                <div class="history-cards-preview">
                    ${cardsBadges}
                </div>

                ${item.notes ? `
                    <div class="history-notes-preview">
                        <strong>Minhas Reflexões:</strong> ${escapeHtml(item.notes)}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function filtrarHistorico(filtro) {
    AppState.currentHistoryFilter = filtro;
    document.querySelectorAll('.history-filters-bar .filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.histFilter === filtro);
    });
    renderHistory();
}

function toggleHistoryFavorite(readingId) {
    const item = AppState.history.find(h => h.id === readingId);
    if (item) {
        item.isFavorite = !item.isFavorite;
        saveHistory();
        renderHistory();
    }
}

function compartilharItemHistorico(readingId) {
    const item = AppState.history.find(h => h.id === readingId);
    if (!item) return;

    let text = `🔮 *Oráculo do Tarô • ${item.tituloTiragem}*\n`;
    text += `❓ Pergunta: "${item.pergunta}"\n`;
    text += `Cartas: ` + item.cartas.map(c => `${c.carta.nome} (${c.invertida ? 'Inv.' : 'Dir.'})`).join(', ') + `\n`;
    if (item.notes) text += `Minhas reflexões: "${item.notes}"\n`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Consulta copiada para a área de transferência! 📋');
    });
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
    document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
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
        showToast('Sons místicos ativados 🔊');
    } else {
        showToast('Sons desativados 🔇');
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

// ========================================================
// INICIALIZAÇÃO DA APLICAÇÃO (DOM READY)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Carrega Sons
    try {
        const savedAudio = localStorage.getItem(STORAGE_KEYS.AUDIO);
        if (savedAudio !== null) AppState.audioEnabled = JSON.parse(savedAudio);
        updateAudioButtonUI();
    } catch(e) {}

    // Inicializa Usuário, Tarefas, Histórico e Arcano do Dia
    initUserAndStreak();
    loadStoredTasks();
    loadStoredHistory();
    loadDailyData();

    renderTasks();
    renderGrimorio();
    renderHistory();
    atualizarDicasPergunta();

    // Eventos das Abas Principais
    document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
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

    // Fechar modais ao teclar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeArcanoModal();
            closeProfileModal();
            const breathModal = document.getElementById('breathModal');
            if (breathModal) breathModal.classList.remove('active');
        }
    });

    // Fechar modais ao clicar no fundo
    ['arcanoModal', 'profileModal', 'breathModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });
});
