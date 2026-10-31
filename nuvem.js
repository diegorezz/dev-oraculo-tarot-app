// ========================================================
// NUVEM — contas e sincronização via Supabase
// A chave abaixo é a "publishable" (pública por natureza).
// A proteção dos dados é feita pelas regras RLS no banco.
// NUNCA coloque aqui a chave "service_role" / "secret".
// ========================================================
const SUPABASE_URL = 'https://vihbomwmmjtflxnuvwrr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EA45W1BB9Mozhd54Cncbig_-j7urLXB';

const Nuvem = {
    client: null,
    session: null,
    bloqueado: false,      // true = não grava na nuvem (ex.: falha ao carregar)
    recuperandoSenha: false,
    _timer: null,
    _avisouErro: false,

    disponivel() {
        return !!this.client;
    },

    async iniciar() {
        try {
            if (!window.supabase || !window.supabase.createClient) {
                console.warn('Supabase indisponível: seguindo em modo local.');
                return null;
            }
            this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            this.client.auth.onAuthStateChange((evento, sessao) => {
                if (evento === 'PASSWORD_RECOVERY') {
                    this.recuperandoSenha = true;
                    this.session = sessao;
                }
            });

            const { data } = await this.client.auth.getSession();
            this.session = data.session || null;
            return this.session;
        } catch (e) {
            console.error('Erro ao iniciar Supabase:', e);
            this.client = null;
            return null;
        }
    },

    // Lê os dados do usuário logado.
    // Retorna { status: 'ok' | 'novo' | 'erro', dados }
    async carregar() {
        if (!this.client || !this.session) return { status: 'erro' };
        const { data, error } = await this.client
            .from('app_dados')
            .select('perfil, tarefas, historico, diario')
            .eq('user_id', this.session.user.id)
            .maybeSingle();

        if (error) {
            console.error('Erro ao carregar dados:', error);
            this.bloqueado = true; // evita sobrescrever a nuvem com dados locais
            return { status: 'erro' };
        }
        this.bloqueado = false;
        if (!data) return { status: 'novo' };
        return { status: 'ok', dados: data };
    },

    // Agenda gravação (evita enviar a cada clique)
    agendarSalvar() {
        if (!this.client || !this.session || this.bloqueado) return;
        clearTimeout(this._timer);
        this._timer = setTimeout(() => this.salvarAgora(), 1500);
    },

    async salvarAgora() {
        if (!this.client || !this.session || this.bloqueado) return;
        clearTimeout(this._timer);
        try {
            const perfil = { ...AppState.user };
            delete perfil.password;

            const { error } = await this.client.from('app_dados').upsert({
                user_id: this.session.user.id,
                perfil: perfil,
                tarefas: AppState.tasks || [],
                historico: AppState.history || [],
                diario: AppState.dailyData || null
            });

            if (error) throw error;
            this._avisouErro = false;
        } catch (e) {
            console.error('Erro ao salvar na nuvem:', e);
            if (!this._avisouErro && typeof showToast === 'function') {
                this._avisouErro = true;
                showToast('Não foi possível sincronizar agora. Seus dados continuam salvos neste aparelho.');
            }
        }
    }
};

// Tenta enviar pendências ao fechar/ocultar a aba
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') Nuvem.salvarAgora();
});

function traduzirErroAuth(error) {
    const msg = ((error && error.message) || '').toLowerCase();
    if (msg.includes('invalid login credentials')) return 'E-mail ou senha incorretos.';
    if (msg.includes('email not confirmed')) return 'Confirme seu e-mail (veja sua caixa de entrada) antes de entrar.';
    if (msg.includes('already registered')) return 'Este e-mail já tem conta. Use "Já Tenho Conta".';
    if (msg.includes('at least') && msg.includes('characters')) return 'A senha precisa ter no mínimo 6 caracteres.';
    if (msg.includes('rate limit') || msg.includes('too many')) return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
    if (msg.includes('invalid email') || msg.includes('unable to validate email')) return 'E-mail inválido.';
    if (msg.includes('network') || msg.includes('fetch')) return 'Sem conexão. Verifique sua internet.';
    return 'Não foi possível concluir. Tente novamente.';
}
