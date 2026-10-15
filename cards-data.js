// Dados dos 22 Arcanos Maiores com os textos originais, arquétipos e ações sugeridas para tarefas
const ARCANOS_DATA = [
    {
        id: 0,
        numero: "I",
        nome: "O Mago",
        direito: "Habilidade, iniciativa, escolha antes de agir.",
        invertido: "Disputas, ação mal orientada, dispersão.",
        elemento: "Ar / Mercúrio",
        palavrasChave: ["Iniciativa", "Habilidade", "Foco", "Poder Criador"],
        acaoSugerida: "Dar o primeiro passo prático em um projeto importante com foco total.",
        afirmacao: "Tenho todas as ferramentas necessárias para manifestar minha vontade.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"/>
            <path d="M50 16 L53 30 L67 33 L53 36 L50 50 L47 36 L33 33 L47 30 Z" fill="#ffd700"/>
            <path d="M30 65 Q40 52 50 65 T70 65" stroke="#8257e5" stroke-width="3" fill="none" stroke-linecap="round"/>
            <circle cx="50" cy="65" r="4" fill="#ffd700"/>
            <path d="M25 80 L75 80" stroke="#d4af37" stroke-width="2"/>
            <path d="M38 74 L42 80 L34 80 Z" fill="#9466ff"/>
            <circle cx="62" cy="76" r="3" fill="#e0c068"/>
        </svg>`
    },
    {
        id: 1,
        numero: "II",
        nome: "A Papisa",
        direito: "Revelação, meditação, situação segura.",
        invertido: "Intuições falsas, atraso, lentidão.",
        elemento: "Água / Lua",
        palavrasChave: ["Intuição", "Mistério", "Silêncio", "Sabedoria"],
        acaoSugerida: "Reservar 15 minutos para meditação ou estudo silencioso antes de tomar decisões.",
        afirmacao: "Minha intuição me guia com clareza e serenidade interior.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 C35 32 35 68 50 80 C65 68 65 32 50 20 Z" fill="rgba(130, 87, 229, 0.2)" stroke="#8257e5" stroke-width="2"/>
            <circle cx="50" cy="50" r="14" fill="#d4af37" fill-opacity="0.2" stroke="#d4af37" stroke-width="2"/>
            <path d="M36 42 Q50 32 64 42" stroke="#9466ff" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="4" fill="#ffd700"/>
            <path d="M24 30 L24 70 M76 30 L76 70" stroke="#a0a0a0" stroke-width="3" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 2,
        numero: "III",
        nome: "A Imperatriz",
        direito: "Pensamento fecundo, soluções, melhora.",
        invertido: "Divergências, complicação, atraso.",
        elemento: "Terra / Vênus",
        palavrasChave: ["Abundância", "Criatividade", "Fertilidade", "Harmonia"],
        acaoSugerida: "Nutrir uma ideia criativa ou cuidar do ambiente ao seu redor para gerar prosperidade.",
        afirmacao: "Minha criatividade floresce e gera resultados belos e abundantes.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 18 L60 38 L82 40 L65 54 L70 76 L50 64 L30 76 L35 54 L18 40 L40 38 Z" stroke="#d4af37" stroke-width="1.5" fill="rgba(212,175,55,0.15)"/>
            <circle cx="50" cy="48" r="8" fill="#8257e5"/>
            <path d="M50 64 L50 84 M42 74 L58 74" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 3,
        numero: "IV",
        nome: "O Imperador",
        direito: "Realização, acordo, contrato, situação definida.",
        invertido: "Ruptura de equilíbrio, risco de perdas.",
        elemento: "Fogo / Áries",
        palavrasChave: ["Estrutura", "Ordem", "Liderança", "Estabilidade"],
        acaoSugerida: "Definir um plano estruturado e estabelecer limites claros para suas metas de hoje.",
        afirmacao: "Sou o arquiteto da minha estabilidade e lidero com firmeza e justiça.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <rect x="32" y="32" width="36" height="36" rx="4" stroke="#d4af37" stroke-width="2" fill="rgba(212,175,55,0.1)"/>
            <path d="M26 26 L50 40 L74 26 L65 50 L50 46 L35 50 Z" fill="#8257e5"/>
            <circle cx="50" cy="50" r="5" fill="#ffd700"/>
            <path d="M50 68 L50 82" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 4,
        numero: "V",
        nome: "O Papa",
        direito: "Conselho sólido, segurança, vocação.",
        invertido: "Falta de apoio espiritual, projeto retardado.",
        elemento: "Terra / Touro",
        palavrasChave: ["Orientação", "Tradição", "Ética", "Vocação"],
        acaoSugerida: "Buscar a orientação de um mentor ou agir alinhado estritamente aos seus princípios éticos.",
        afirmacao: "Agir com retidão atrai sabedoria e apoio verdadeiro para minha jornada.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 L50 80 M34 36 L66 36 M38 48 L62 48 M42 60 L58 60" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="50" cy="24" r="5" fill="#8257e5"/>
            <path d="M30 78 Q50 70 70 78" stroke="#9466ff" stroke-width="2"/>
        </svg>`
    },
    {
        id: 5,
        numero: "VI",
        nome: "O Enamorado",
        direito: "União, escolha a fazer.",
        invertido: "Desordem, cisão, risco de ruptura.",
        elemento: "Ar / Gêmeos",
        palavrasChave: ["Escolhas", "Coração", "Valores", "Aliança"],
        acaoSugerida: "Tomar uma decisão pendente alinhada com seus valores mais autênticos.",
        afirmacao: "Escolho seguir o que ressoa verdadeiramente com o meu coração.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 34 C44 24 30 24 26 36 C22 48 38 64 50 76 C62 64 78 48 74 36 C70 24 56 24 50 34 Z" fill="rgba(130, 87, 229, 0.3)" stroke="#8257e5" stroke-width="2"/>
            <path d="M50 22 L52 28 L58 30 L52 32 L50 38 L48 32 L42 30 L48 28 Z" fill="#ffd700"/>
            <circle cx="50" cy="52" r="4" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 6,
        numero: "VII",
        nome: "A Carruagem",
        direito: "Atividade, rapidez, conquista, notícia boa.",
        invertido: "Desordem, imprudência, más notícias.",
        elemento: "Água / Câncer",
        palavrasChave: ["Vitória", "Direção", "Progresso", "Determinação"],
        acaoSugerida: "Manter a disciplina e acelerar uma tarefa sem se distrair com desvios.",
        afirmacao: "Controlo minhas forças e sigo confiantemente rumo ao sucesso.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M30 46 L70 46 L62 74 L38 74 Z" stroke="#d4af37" stroke-width="2" fill="rgba(212,175,55,0.15)"/>
            <circle cx="34" cy="76" r="8" stroke="#8257e5" stroke-width="2"/>
            <circle cx="66" cy="76" r="8" stroke="#8257e5" stroke-width="2"/>
            <path d="M50 24 L56 36 L44 36 Z" fill="#ffd700"/>
            <path d="M44 46 L44 36 M56 46 L56 36" stroke="#d4af37" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 7,
        numero: "VIII",
        nome: "A Justiça",
        direito: "Julgamento claro, rigor, justiça feita.",
        invertido: "Risco de perda ou de julgamento injusto.",
        elemento: "Ar / Libra",
        palavrasChave: ["Equilíbrio", "Clareza", "Responsabilidade", "Verdade"],
        acaoSugerida: "Analisar os fatos com imparcialidade e resolver pendências burocráticas ou acordos.",
        afirmacao: "Ajo com retidão e colho a harmonia gerada pelas minhas escolhas justas.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 L50 80" stroke="#d4af37" stroke-width="2"/>
            <path d="M26 36 L74 36" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M26 36 L20 54 L32 54 Z" stroke="#8257e5" stroke-width="1.5" fill="rgba(130,87,229,0.2)"/>
            <path d="M74 36 L68 54 L80 54 Z" stroke="#8257e5" stroke-width="1.5" fill="rgba(130,87,229,0.2)"/>
            <path d="M46 72 L50 82 L54 72 Z" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 8,
        numero: "IX",
        nome: "O Eremita",
        direito: "Luz sobre um problema, prudência, segredo.",
        invertido: "Obscuridade, visão falsa da situação.",
        elemento: "Terra / Virgem",
        palavrasChave: ["Prudência", "Introspecção", "Luz Interior", "Paciência"],
        acaoSugerida: "Evitar a pressa, pesquisar a fundo antes de opinar e buscar a reflexão solitária.",
        afirmacao: "Minha luz interior ilumina cada passo seguro do meu caminho.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M60 30 L60 76 M60 30 C55 24 45 28 45 38 L45 74" stroke="#a0a0a0" stroke-width="2.5" stroke-linecap="round"/>
            <rect x="30" y="38" width="16" height="24" rx="3" stroke="#ffd700" stroke-width="2" fill="rgba(255,215,0,0.2)"/>
            <circle cx="38" cy="50" r="4" fill="#ffd700"/>
            <path d="M38 34 L38 38 M34 50 L30 50 M46 50 L42 50" stroke="#ffd700" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 9,
        numero: "X",
        nome: "Roda da Fortuna",
        direito: "Mudança, evolução, julgamento equilibrado.",
        invertido: "Transformação lenta e difícil.",
        elemento: "Fogo / Júpiter",
        palavrasChave: ["Ciclos", "Mudança", "Oportunidade", "Destino"],
        acaoSugerida: "Aproveitar o momento favorável para iniciar um novo ciclo e adaptar-se às mudanças.",
        afirmacao: "Abraço os ciclos da vida e fluo com sabedoria em direção à evolução.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="26" stroke="#ffd700" stroke-width="2.5"/>
            <circle cx="50" cy="50" r="10" stroke="#8257e5" stroke-width="2"/>
            <path d="M50 24 L50 76 M24 50 L76 50 M32 32 L68 68 M32 68 L68 32" stroke="#d4af37" stroke-width="1.5"/>
            <circle cx="50" cy="50" r="3" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 10,
        numero: "XI",
        nome: "A Força",
        direito: "Domínio de si, firmeza, poder de dirigir.",
        invertido: "Brutalidade ou fraqueza, risco de ser dominado.",
        elemento: "Fogo / Leão",
        palavrasChave: ["Autodomínio", "Gentileza", "Coragem", "Poder Interno"],
        acaoSugerida: "Lidar com situações desafiadoras através da paciência e firmeza serena, sem agressividade.",
        afirmacao: "Minha maior força reside na serenidade, coragem e domínio de mim mesmo.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M30 35 Q40 25 50 35 T70 35 Q60 45 50 35 T30 35" stroke="#ffd700" stroke-width="2.5" fill="none"/>
            <path d="M35 55 C35 45 65 45 65 55 C65 68 50 78 50 78 C50 78 35 68 35 55 Z" stroke="#8257e5" stroke-width="2" fill="rgba(130,87,229,0.2)"/>
            <circle cx="50" cy="58" r="4" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 11,
        numero: "XII",
        nome: "O Dependurado",
        direito: "Espera, renúncia, indecisão.",
        invertido: "Éxito incerto, reticência, projeto secreto.",
        elemento: "Água / Netuno",
        palavrasChave: ["Perspectiva", "Pausa", "Entrega", "Ressignificação"],
        acaoSugerida: "Olhar para uma pendência por outro ângulo; praticar a paciência antes de agir por impulso.",
        afirmacao: "Ao soltar o controle apressado, ganho nova perspectiva e clareza profunda.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M26 24 L74 24 M50 24 L50 48" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
            <path d="M50 48 L42 62 L50 72 L58 62 Z" fill="#8257e5"/>
            <path d="M50 48 L62 58 M42 66 L58 66" stroke="#9466ff" stroke-width="2"/>
            <circle cx="50" cy="80" r="5" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 12,
        numero: "XIII",
        nome: "A Morte (Sem Nome)",
        direito: "Renovação, fim de etapa, mudança total.",
        invertido: "Estagnação, mudança adiada.",
        elemento: "Água / Escorpião",
        palavrasChave: ["Transformação", "Renovação", "Desapego", "Recomeço"],
        acaoSugerida: "Desapegar-se de hábitos, objetos ou pendências antigas para abrir espaço ao novo.",
        afirmacao: "Liberto o que já cumpriu seu ciclo para permitir o renascimento em minha vida.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M34 26 C56 20 74 36 68 56 C62 50 56 46 44 48 L34 26 Z" fill="#d4af37" fill-opacity="0.3" stroke="#d4af37" stroke-width="2"/>
            <path d="M34 26 L66 82" stroke="#8257e5" stroke-width="3" stroke-linecap="round"/>
            <circle cx="48" cy="62" r="3" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 13,
        numero: "XIV",
        nome: "A Temperança",
        direito: "Conciliação, adaptação, decisão sem pressa.",
        invertido: "Perturbação, discordância.",
        elemento: "Fogo / Sagitário",
        palavrasChave: ["Harmonia", "Equilíbrio", "Moderação", "Cura"],
        acaoSugerida: "Buscar o caminho do meio em qualquer conflito; equilibrar descanso e trabalho hoje.",
        afirmacao: "Equilibro minhas energias e ajo com tranquilidade e harmonia.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M34 38 L44 38 L42 56 L36 56 Z" stroke="#ffd700" stroke-width="2" fill="rgba(255,215,0,0.2)"/>
            <path d="M66 52 L56 52 L58 70 L64 70 Z" stroke="#ffd700" stroke-width="2" fill="rgba(255,215,0,0.2)"/>
            <path d="M40 48 Q50 44 60 62" stroke="#8257e5" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
            <path d="M26 30 L50 20 L74 30" stroke="#9466ff" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 14,
        numero: "XV",
        nome: "O Diabo",
        direito: "Éxito material, influência, advertência.",
        invertido: "Desordem, negócios escusos.",
        elemento: "Terra / Capricórnio",
        palavrasChave: ["Ambição", "Apego", "Instintos", "Alerta"],
        acaoSugerida: "Identificar onde você está preso por apegos ou compulsões e retomar o controle de suas escolhas.",
        afirmacao: "Reconheço minhas sombras e mantenho o livre-arbítrio acima de qualquer amarra.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 22 L62 42 L38 42 Z" stroke="#f75a68" stroke-width="2" fill="rgba(247,90,104,0.15)"/>
            <path d="M50 42 L62 62 L38 62 Z" stroke="#8257e5" stroke-width="2" fill="rgba(130,87,229,0.15)"/>
            <circle cx="50" cy="52" r="5" fill="#f75a68"/>
            <path d="M34 74 L66 74" stroke="#a0a0a0" stroke-width="3" stroke-dasharray="4 4"/>
        </svg>`
    },
    {
        id: 15,
        numero: "XVI",
        nome: "A Torre",
        direito: "Interrupção brusca, choque, advertência.",
        invertido: "Grande abalo, confusão.",
        elemento: "Fogo / Marte",
        palavrasChave: ["Libertação", "Ruptura", "Revelação", "Despertar"],
        acaoSugerida: "Desapegar-se de ilusões e reconstruir suas bases com autenticidade após um imprevisto.",
        afirmacao: "Tudo o que cai abre caminho para alicerces mais verdadeiros e sólidos.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M40 32 L36 78 L64 78 L60 32 Z" stroke="#d4af37" stroke-width="2" fill="rgba(212,175,55,0.1)"/>
            <path d="M36 32 L50 22 L64 32" stroke="#d4af37" stroke-width="2"/>
            <path d="M54 18 L46 36 L54 40 L44 58" stroke="#f75a68" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="48" cy="52" r="2" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 16,
        numero: "XVII",
        nome: "A Estrela",
        direito: "Inspiração, esperança, harmonia.",
        invertido: "Harmonia rompida ou sem duração.",
        elemento: "Ar / Aquário",
        palavrasChave: ["Esperança", "Inspiração", "Fé", "Harmonia"],
        acaoSugerida: "Cultivar o otimismo, planejar seus objetivos a longo prazo e compartilhar gentileza.",
        afirmacao: "Confio no fluxo luminoso do universo e renono minha esperança diariamente.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 18 L53 38 L72 38 L57 50 L63 70 L50 58 L37 70 L43 50 L28 38 L47 38 Z" fill="#ffd700" fill-opacity="0.3" stroke="#ffd700" stroke-width="2"/>
            <circle cx="28" cy="30" r="2.5" fill="#9466ff"/>
            <circle cx="72" cy="30" r="2.5" fill="#9466ff"/>
            <circle cx="76" cy="65" r="2.5" fill="#9466ff"/>
            <path d="M30 82 Q50 72 70 82" stroke="#8257e5" stroke-width="2"/>
        </svg>`
    },
    {
        id: 17,
        numero: "XVIII",
        nome: "A Lua",
        direito: "Engano, confusão, segredo desvendado.",
        invertido: "Instinto acentuado, confusão latente.",
        elemento: "Água / Peixes",
        palavrasChave: ["Subconsciente", "Ilusão", "Mistério", "Sentimentos"],
        acaoSugerida: "Não agir sob efeito da dúvida ou boatos; esperar a névoa dissipar antes de decisões capitais.",
        afirmacao: "Confio em minha visão profunda e discirno a verdade em meio às incertezas.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M56 22 A28 28 0 1 0 56 78 A34 34 0 0 1 56 22 Z" fill="#d4af37" fill-opacity="0.3" stroke="#d4af37" stroke-width="2"/>
            <path d="M32 76 C40 70 44 70 52 76 C60 82 64 82 72 76" stroke="#8257e5" stroke-width="2"/>
            <circle cx="34" cy="54" r="3" fill="#9466ff"/>
            <circle cx="66" cy="54" r="3" fill="#9466ff"/>
        </svg>`
    },
    {
        id: 18,
        numero: "XIX",
        nome: "O Sol",
        direito: "Sucesso, clareza, vitalidade, afeto altruísta.",
        invertido: "Contrariedade, tatear no escuro.",
        elemento: "Fogo / Sol",
        palavrasChave: ["Vitalidade", "Clareza", "Alegria", "Sucesso"],
        acaoSugerida: "Celebrar uma vitória recente, energizar suas tarefas e agir com transparência calorosa.",
        afirmacao: "A luz do sucesso e da alegria brilha em todas as minhas ações de hoje.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="18" fill="#ffd700" fill-opacity="0.25" stroke="#ffd700" stroke-width="2.5"/>
            <path d="M50 18 L50 26 M50 74 L50 82 M18 50 L26 50 M74 50 L82 50" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M28 28 L34 34 M66 66 L72 72 M28 72 L34 66 M66 34 L72 28" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="5" fill="#8257e5"/>
        </svg>`
    },
    {
        id: 19,
        numero: "XX",
        nome: "O Julgamento",
        direito: "Despertar, avaliação, estabilidade.",
        invertido: "Erro a respeito de si mesmo.",
        elemento: "Fogo / Plutão",
        palavrasChave: ["Despertar", "Chamado", "Libertação", "Avaliação"],
        acaoSugerida: "Fazer uma autoavaliação sincera e responder ao seu verdadeiro propósito sem adiar mais.",
        afirmacao: "Ouço meu chamado superior e desperto para uma nova versão de mim.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M38 32 L62 20 L62 44 Z" stroke="#ffd700" stroke-width="2" fill="rgba(255,215,0,0.2)"/>
            <path d="M62 32 L78 32" stroke="#d4af37" stroke-width="2"/>
            <path d="M28 76 L36 58 M50 76 L50 56 M72 76 L64 58" stroke="#8257e5" stroke-width="2" stroke-linecap="round"/>
            <circle cx="50" cy="24" r="3" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 20,
        numero: "XXI",
        nome: "O Mundo",
        direito: "Realização, elevação, sucesso.",
        invertido: "Ciladas, insucesso, triunfo negado.",
        elemento: "Terra / Saturno",
        palavrasChave: ["Plenitude", "Conclusão", "Sucesso Total", "Harmonia"],
        acaoSugerida: "Concluir um ciclo ou tarefa com excelência e comemorar o caminho percorrido.",
        afirmacao: "Estou em perfeita sintonia com a vida e celebro minhas conquistas.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <ellipse cx="50" cy="50" rx="24" ry="32" stroke="#d4af37" stroke-width="2.5" fill="rgba(212,175,55,0.1)"/>
            <circle cx="50" cy="50" r="8" fill="#8257e5"/>
            <circle cx="28" cy="24" r="3" fill="#ffd700"/>
            <circle cx="72" cy="24" r="3" fill="#ffd700"/>
            <circle cx="28" cy="76" r="3" fill="#ffd700"/>
            <circle cx="72" cy="76" r="3" fill="#ffd700"/>
        </svg>`
    },
    {
        id: 21,
        numero: "0",
        nome: "O Louco",
        direito: "Partida, mudança, despreocupação.",
        invertido: "Queda, interrupção, confusão.",
        elemento: "Ar / Urano",
        palavrasChave: ["Novo Começo", "Espontaneidade", "Liberdade", "Fé"],
        acaoSugerida: "Ousar dar um passo inédito sem medo do desconhecido; abrir-se a novas aventuras.",
        afirmacao: "Confio no infinito e inicio minha jornada com coração leve e livre.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M30 68 L64 34" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="68" cy="30" r="7" stroke="#ffd700" stroke-width="2" fill="rgba(255,215,0,0.3)"/>
            <path d="M40 76 Q52 70 60 76 T74 72" stroke="#8257e5" stroke-width="2" fill="none"/>
            <circle cx="50" cy="46" r="4" fill="#9466ff"/>
            <path d="M26 80 L36 68" stroke="#d4af37" stroke-width="2"/>
        </svg>`
    }
];

// Helper para obter arcano por ID
function getArcanoById(id) {
    return ARCANOS_DATA.find(a => a.id === id);
}
