// ========================================================
// BASE DE DADOS DOS 22 ARCANOS MAIORES
// Com dados oraculares, conselhos amorosos, profissionais,
// oráculo Sim/Não e arquétipos de nascimento para perfil
// ========================================================

const ARCANOS_DATA = [
    {
        id: 0,
        numero: "I",
        nome: "O Mago",
        direito: "Habilidade, iniciativa, escolha antes de agir e poder de manifestação.",
        invertido: "Disputas, ação mal orientada, dispersão e manipulação.",
        elemento: "Ar / Mercúrio",
        palavrasChave: ["Iniciativa", "Habilidade", "Foco", "Poder Criador"],
        acaoSugerida: "Dar o primeiro passo prático em um projeto importante com foco total.",
        afirmacao: "Tenho todas as ferramentas necessárias para manifestar minha vontade no plano físico.",
        simNao: "SIM",
        simNaoDesc: "Sim! Você possui os talentos e a iniciativa necessária para fazer acontecer.",
        amor: "Comunicação fluida, novo ciclo afetivo promissor e magnetismo em alta.",
        trabalho: "Excelente momento para propor ideias, iniciar empreendimentos e liderar projetos.",
        arquetipoVida: "O Criador e Comunicador: dotado de imenso talento para transformar ideias em realidade prática.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"/>
            <path d="M50 16 L53 30 L67 33 L53 36 L50 50 L47 36 L33 33 L47 30 Z" fill="#d9ae48"/>
            <path d="M30 65 Q40 52 50 65 T70 65" stroke="#99463c" stroke-width="3" fill="none" stroke-linecap="round"/>
            <circle cx="50" cy="65" r="4" fill="#d9ae48"/>
            <path d="M25 80 L75 80" stroke="#c99a2e" stroke-width="2"/>
            <path d="M38 74 L42 80 L34 80 Z" fill="#99463c"/>
            <circle cx="62" cy="76" r="3" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 1,
        numero: "II",
        nome: "A Papisa",
        direito: "Revelação, meditação, intuição pura e situação segura.",
        invertido: "Intuições falsas, atraso, lentidão e segredos nocivos.",
        elemento: "Água / Lua",
        palavrasChave: ["Intuição", "Mistério", "Silêncio", "Sabedoria"],
        acaoSugerida: "Reservar 15 minutos para meditação ou estudo silencioso antes de tomar decisões.",
        afirmacao: "Minha intuição me guia com clareza cristalina e serenidade interior.",
        simNao: "TALVEZ",
        simNaoDesc: "Aguarde o momento certo; respostas e fatores ocultos ainda precisam vir à tona.",
        amor: "Conexão profunda e espiritual, mas requer respeito ao espaço e tempo do outro.",
        trabalho: "Aprofunde seus estudos, mantenha discrição sobre seus planos e confie no sexto sentido.",
        arquetipoVida: "A Guardiã dos Mistérios: profunda, serena, intuitiva e dotada de perspicácia espiritual única.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 C35 32 35 68 50 80 C65 68 65 32 50 20 Z" fill="rgba(153, 70, 60, 0.2)" stroke="#99463c" stroke-width="2"/>
            <circle cx="50" cy="50" r="14" fill="#c99a2e" fill-opacity="0.2" stroke="#c99a2e" stroke-width="2"/>
            <path d="M36 42 Q50 32 64 42" stroke="#99463c" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="4" fill="#d9ae48"/>
            <path d="M24 30 L24 70 M76 30 L76 70" stroke="#6b6457" stroke-width="3" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 2,
        numero: "III",
        nome: "A Imperatriz",
        direito: "Pensamento fecundo, fertilidade, soluções elegantes e melhora contínua.",
        invertido: "Divergências, complicação, atraso e desperdício de energia.",
        elemento: "Terra / Vênus",
        palavrasChave: ["Abundância", "Criatividade", "Fertilidade", "Harmonia"],
        acaoSugerida: "Nutrir uma ideia criativa ou cuidar do ambiente ao seu redor para gerar prosperidade.",
        afirmacao: "Minha criatividade floresce e gera resultados belos, prósperos e abundantes.",
        simNao: "SIM",
        simNaoDesc: "Sim! Caminhos férteis e momentos prósperos abertos para o seu objetivo.",
        amor: "Amor caloroso, acolhedor, sensualidade em alta e entendimento carinhoso.",
        trabalho: "Projetos em plena expansão; sucesso em empreendimentos criativos e comunicação.",
        arquetipoVida: "A Mestra da Abundância: calorosa, criativa, nutridora e geradora de prosperidade e beleza.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 18 L60 38 L82 40 L65 54 L70 76 L50 64 L30 76 L35 54 L18 40 L40 38 Z" stroke="#c99a2e" stroke-width="1.5" fill="rgba(201, 154, 46, 0.15)"/>
            <circle cx="50" cy="48" r="8" fill="#99463c"/>
            <path d="M50 64 L50 84 M42 74 L58 74" stroke="#c99a2e" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 3,
        numero: "IV",
        nome: "O Imperador",
        direito: "Realização, acordo, contrato, firmeza e situação estruturada.",
        invertido: "Ruptura de equilíbrio, autoritarismo e risco de perdas por teimosia.",
        elemento: "Fogo / Áries",
        palavrasChave: ["Estrutura", "Ordem", "Liderança", "Estabilidade"],
        acaoSugerida: "Definir um plano estruturado e estabelecer limites claros para suas metas de hoje.",
        afirmacao: "Sou o arquiteto da minha estabilidade e lidero minhas escolhas com firmeza e justiça.",
        simNao: "SIM",
        simNaoDesc: "Sim, contanto que mantenha disciplina, método e organização impecável.",
        amor: "Relação sólida, proteção recíproca, estabilidade e compromisso formal.",
        trabalho: "Consolidação de carreira, liderança respeitada, organização financeira e vitórias duradouras.",
        arquetipoVida: "O Construtor e Soberano: determinado, pragmático, protetor e arquiteto de bases sólidas.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <rect x="32" y="32" width="36" height="36" rx="4" stroke="#c99a2e" stroke-width="2" fill="rgba(201, 154, 46, 0.1)"/>
            <path d="M26 26 L50 40 L74 26 L65 50 L50 46 L35 50 Z" fill="#99463c"/>
            <circle cx="50" cy="50" r="5" fill="#d9ae48"/>
            <path d="M50 68 L50 82" stroke="#c99a2e" stroke-width="3" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 4,
        numero: "V",
        nome: "O Papa",
        direito: "Conselho sólido, segurança ética, vocação e bênção espiritual.",
        invertido: "Falta de apoio, preconceito, dogma e projeto retardado.",
        elemento: "Terra / Touro",
        palavrasChave: ["Orientação", "Tradição", "Ética", "Vocação"],
        acaoSugerida: "Buscar a orientação de um mentor ou agir alinhado estritamente aos seus princípios éticos.",
        afirmacao: "Agir com retidão atrai sabedoria e apoio verdadeiro para minha jornada.",
        simNao: "SIM",
        simNaoDesc: "Sim! Uma resposta auspiciosa, favorecendo uniões formais e acordos justos.",
        amor: "União guiada por valores em comum, respeito, bênçãos de longo prazo e confiança.",
        trabalho: "Ensino, mentorias, acordos solenes e progresso fundamentado em competência moral.",
        arquetipoVida: "O Mentor e Farol Moral: conciliador, portador de ensinamentos perenes e guardião de valores.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 L50 80 M34 36 L66 36 M38 48 L62 48 M42 60 L58 60" stroke="#c99a2e" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="50" cy="24" r="5" fill="#99463c"/>
            <path d="M30 78 Q50 70 70 78" stroke="#99463c" stroke-width="2"/>
        </svg>`
    },
    {
        id: 5,
        numero: "VI",
        nome: "O Enamorado",
        direito: "União verdadeira, escolha a fazer com o coração, alianças benéficas.",
        invertido: "Desordem, cisão, dúvida paralisante e risco de ruptura.",
        elemento: "Ar / Gêmeos",
        palavrasChave: ["Escolhas", "Coração", "Valores", "Aliança"],
        acaoSugerida: "Tomar uma decisão pendente alinhada com seus valores mais autênticos sem hesitar.",
        afirmacao: "Escolho seguir o que ressoa verdadeiramente com o meu coração e alma.",
        simNao: "TALVEZ",
        simNaoDesc: "A resposta está no poder de uma escolha que você precisa assumir conscientemente.",
        amor: "Encontro de almas, paixão mútua, atração sincera ou decisão entre caminhos amorosos.",
        trabalho: "Parcerias vantajosas; necessidade de definir prioridades e escolher entre propostas.",
        arquetipoVida: "O Buscador da União: sensível, diplomático, motivado pelo amor sincero e harmonia social.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 34 C44 24 30 24 26 36 C22 48 38 64 50 76 C62 64 78 48 74 36 C70 24 56 24 50 34 Z" fill="rgba(153, 70, 60, 0.3)" stroke="#99463c" stroke-width="2"/>
            <path d="M50 22 L52 28 L58 30 L52 32 L50 38 L48 32 L42 30 L48 28 Z" fill="#d9ae48"/>
            <circle cx="50" cy="52" r="4" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 6,
        numero: "VII",
        nome: "A Carruagem",
        direito: "Atividade, rapidez, conquista, notícia auspiciosa e vitória na jornada.",
        invertido: "Desordem, imprudência, conflito interno e más notícias por impulsividade.",
        elemento: "Água / Câncer",
        palavrasChave: ["Vitória", "Direção", "Progresso", "Determinação"],
        acaoSugerida: "Manter a disciplina e acelerar uma tarefa sem se distrair com desvios secundários.",
        afirmacao: "Controlo minhas forças e sigo confiantemente rumo ao sucesso merecido.",
        simNao: "SIM",
        simNaoDesc: "Sim! Sucesso e vitória rápida ao avançar com coragem e rédeas firmes.",
        amor: "Conquista amorosa, superação de impasses e viagens românticas conjuntas.",
        trabalho: "Triunfo em negociações, metas batidas com velocidade e liderança dinâmica.",
        arquetipoVida: "O Triunfador Determinado: focado, disciplinado, resiliente e condutor das próprias rédeas.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M30 46 L70 46 L62 74 L38 74 Z" stroke="#c99a2e" stroke-width="2" fill="rgba(201, 154, 46, 0.15)"/>
            <circle cx="34" cy="76" r="8" stroke="#99463c" stroke-width="2"/>
            <circle cx="66" cy="76" r="8" stroke="#99463c" stroke-width="2"/>
            <path d="M50 24 L56 36 L44 36 Z" fill="#d9ae48"/>
            <path d="M44 46 L44 36 M56 46 L56 36" stroke="#c99a2e" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 7,
        numero: "VIII",
        nome: "A Justiça",
        direito: "Julgamento claro, rigor, justiça feita, equilíbrio de débitos e créditos.",
        invertido: "Risco de perda, julgamento injusto, burocracia excessiva e desonestidade.",
        elemento: "Ar / Libra",
        palavrasChave: ["Equilíbrio", "Clareza", "Responsabilidade", "Verdade"],
        acaoSugerida: "Analisar os fatos com imparcialidade e resolver pendências burocráticas ou acordos.",
        afirmacao: "Ajo com retidão e colho a harmonia gerada pelas minhas escolhas justas.",
        simNao: "SIM",
        simNaoDesc: "Sim! Se você agiu com transparência, a justiça e o equilíbrio estarão a seu favor.",
        amor: "Relação pautada pela franqueza, igualdade de direitos e decisões lúcidas.",
        trabalho: "Acordos formais aprovados, contratos assinados e reconhecimento mérito a mérito.",
        arquetipoVida: "O Guardião da Equidade: lúcido, imparcial, focado na verdade e no equilíbrio harmônico.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 L50 80" stroke="#c99a2e" stroke-width="2"/>
            <path d="M26 36 L74 36" stroke="#c99a2e" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M26 36 L20 54 L32 54 Z" stroke="#99463c" stroke-width="1.5" fill="rgba(153, 70, 60, 0.2)"/>
            <path d="M74 36 L68 54 L80 54 Z" stroke="#99463c" stroke-width="1.5" fill="rgba(153, 70, 60, 0.2)"/>
            <path d="M46 72 L50 82 L54 72 Z" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 8,
        numero: "IX",
        nome: "O Eremita",
        direito: "Prudência, sabedoria acumulada, pesquisa profunda e luz interior.",
        invertido: "Solidão amarga, atraso, teimosia em isolamento e recusa a conselhos.",
        elemento: "Terra / Virgem",
        palavrasChave: ["Introspecção", "Prudência", "Sabedoria", "Guia Interior"],
        acaoSugerida: "Dedicar tempo para autoanálise silenciosa e rever planos antes de expô-los ao mundo.",
        afirmacao: "Minha própria luz interna ilumina os passos certos no tempo ideal.",
        simNao: "TALVEZ",
        simNaoDesc: "A situação pede cautela e tempo de maturação; não tome decisões precipitadas.",
        amor: "Tempo de autoconhecimento individual ou busca por uma relação madura e verdadeira.",
        trabalho: "Pesquisa minuciosa, projetos que requerem paciência e estratégia silenciosa.",
        arquetipoVida: "O Sábio Peregrino: reflexivo, paciente, autossuficiente e portador da lâmpada da verdade.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M35 78 L45 28 L55 28 L65 78 Z" stroke="#99463c" stroke-width="2" fill="rgba(153, 70, 60, 0.15)"/>
            <circle cx="50" cy="22" r="8" fill="#c99a2e"/>
            <path d="M62 45 L72 50 L72 65 L62 60 Z" stroke="#d9ae48" stroke-width="1.5" fill="rgba(217, 174, 72, 0.3)"/>
            <circle cx="67" cy="56" r="3" fill="#ffffff"/>
            <path d="M28 80 L32 40" stroke="#c99a2e" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 9,
        numero: "X",
        nome: "A Roda da Fortuna",
        direito: "Mudança rápida, destino favorável, oportunidade inesperada e sucesso cíclico.",
        invertido: "Instabilidade transitória, imprevistos e resistência aos ciclos da vida.",
        elemento: "Fogo / Júpiter",
        palavrasChave: ["Destino", "Ciclos", "Oportunidade", "Transformação"],
        acaoSugerida: "Aproveitar uma oportunidade rápida que surgir hoje sem hesitar.",
        afirmacao: "Abraço as viradas do destino com entusiasmo e confiança na abundância do universo.",
        simNao: "SIM",
        simNaoDesc: "Sim! Os ventos da sorte estão virando a seu favor; esteja pronto para agarrar a chance.",
        amor: "Reviravolta apaixonante, reencontro significativo e nova fase dinâmica a dois.",
        trabalho: "Novos contatos de negócio, ganhos inesperados e guinada positiva na carreira.",
        arquetipoVida: "O Agente da Sincronicidade: dinâmico, adaptável e sempre sintonizado com o fluxo do destino.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="28" stroke="#c99a2e" stroke-width="2.5"/>
            <circle cx="50" cy="50" r="10" stroke="#d9ae48" stroke-width="2" fill="rgba(153, 70, 60, 0.2)"/>
            <path d="M50 22 L50 40 M50 60 L50 78 M22 50 L40 50 M60 50 L78 50" stroke="#c99a2e" stroke-width="2"/>
            <path d="M30 30 L43 43 M57 57 L70 70 M70 30 L57 43 M43 57 L30 70" stroke="#99463c" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 10,
        numero: "XI",
        nome: "A Força",
        direito: "Coragem moral, serenidade, domínio das paixões e vitória pacífica.",
        invertido: "Impaciência, explosão de raiva, fraqueza interior ou esforço excessivo.",
        elemento: "Fogo / Leão",
        palavrasChave: ["Coragem", "Paciência", "Magnetismo", "Autodomínio"],
        acaoSugerida: "Resolver um desafio interpessoal com calma, afeto e paciência inabalável.",
        afirmacao: "Minha verdadeira força nasce da calma, do amor e do autocontrole sereno.",
        simNao: "SIM",
        simNaoDesc: "Sim! Domine suas ansiedades com gentileza e o resultado será vitorioso.",
        amor: "Amor ardente equilibrado com ternura; cumplicidade capaz de superar qualquer atrito.",
        trabalho: "Negociações delicadas resolvidas com diplomacia assertiva e persuasão moral.",
        arquetipoVida: "O Domador Sereno: corajoso, magnético, compassivo e mestre no autocontrole e empatia.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M36 34 C30 24 20 34 26 44 C34 54 44 34 50 34 C56 34 66 54 74 44 C80 34 70 24 64 34 C58 44 42 24 36 34 Z" stroke="#d9ae48" stroke-width="2" fill="none"/>
            <path d="M35 56 C40 52 60 52 65 56 C70 60 70 76 50 78 C30 76 30 60 35 56 Z" fill="rgba(153, 70, 60, 0.2)" stroke="#99463c" stroke-width="2"/>
            <circle cx="44" cy="64" r="3" fill="#d9ae48"/>
            <circle cx="56" cy="64" r="3" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 11,
        numero: "XII",
        nome: "O Enforcado",
        direito: "Desprendimento, sacrifício voluntário, nova perspectiva e iluminação sutil.",
        invertido: "Sacrifício inútil, estagnação, teimosia cega e vitimismo.",
        elemento: "Água / Netuno",
        palavrasChave: ["Pausa", "Perspectiva", "Desapego", "Iluminação"],
        acaoSugerida: "Olhar uma situação difícil sob uma ótica totalmente nova e abrir mão do controle.",
        afirmacao: "Ao soltar o controle aparente, encontro paz e novas visões transformadoras.",
        simNao: "NÃO",
        simNaoDesc: "Não no momento. É tempo de pausa, reflexão e ajuste de expectativas antes de avançar.",
        amor: "Período de reflexão e paciência; evite cobrar respostas imediatas de quem ama.",
        trabalho: "Aguarde o momento mais favorável para lançamentos; repense as estratégias.",
        arquetipoVida: "O Visionário Iluminado: capaz de enxergar o mundo sob prismas que ninguém mais percebe.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M25 24 L75 24 M50 24 L50 38" stroke="#c99a2e" stroke-width="2.5"/>
            <path d="M50 38 L50 68 M40 54 L60 54 M50 68 L36 82 M50 68 L64 82" stroke="#99463c" stroke-width="2"/>
            <circle cx="50" cy="38" r="6" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 12,
        numero: "XIII",
        nome: "A Morte",
        direito: "Fim inevitável de um ciclo, renovação completa, libertação e renascimento.",
        invertido: "Resistência ao fim, medo da perda, apego ao passado e luto prolongado.",
        elemento: "Água / Escorpião",
        palavrasChave: ["Renascimento", "Transformação", "Desapego", "Transmutação"],
        acaoSugerida: "Desfazer-se de um hábito antigo, crença limitante ou objeto acumulado que não serve mais.",
        afirmacao: "Fecho o passado com gratidão e me abro com alegria para o novo que renasce.",
        simNao: "TALVEZ",
        simNaoDesc: "O que você conhecia está mudando radicalmente; algo precisa morrer para o novo nascer.",
        amor: "Transformação drástica na relação ou superação definitiva de um amor do passado.",
        trabalho: "Término de um contrato ou rotina desgastada abrindo portas para uma nova carreira.",
        arquetipoVida: "O Transmutador Fênix: regenerativo, resiliente, cirúrgico em deixar para trás o supérfluo.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M30 78 L65 24" stroke="#c99a2e" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M65 24 C60 16 80 18 82 28 C84 36 74 38 65 24 Z" fill="#99463c" stroke="#99463c" stroke-width="1.5"/>
            <circle cx="44" cy="58" r="4" fill="#d9ae48"/>
            <path d="M26 80 Q40 68 54 80" stroke="#99463c" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 13,
        numero: "XIV",
        nome: "A Temperança",
        direito: "Moderação, equilíbrio emocional, paciência, serenidade e cura harmoniosa.",
        invertido: "Desarmonia, excessos, impaciência, conflitos e falta de ritmo.",
        elemento: "Fogo / Sagitário",
        palavrasChave: ["Harmonia", "Equilíbrio", "Alquimia", "Paciência"],
        acaoSugerida: "Praticar a moderação hoje: equilibrar horas de esforço com momentos de descanso consciente.",
        afirmacao: "Sou fonte de paz e equilíbrio; harmonizo meus pensamentos com sabedoria.",
        simNao: "SIM",
        simNaoDesc: "Sim! A moderação, paciência e diplomacia trarão o melhor resultado possível.",
        amor: "Relação carinhosa, pacífica, cura de antigas feridas e união equilibrada.",
        trabalho: "Cooperação tranquila no ambiente profissional, finanças protegidas e processos sem atritos.",
        arquetipoVida: "O Pacificador Alquímico: equilibrador de conflitos, tolerante, generoso e curador nato.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M35 34 C35 34 30 46 38 52 C44 56 46 48 46 48 Z" stroke="#c99a2e" stroke-width="2" fill="rgba(201, 154, 46, 0.2)"/>
            <path d="M65 66 C65 66 70 54 62 48 C56 44 54 52 54 52 Z" stroke="#c99a2e" stroke-width="2" fill="rgba(201, 154, 46, 0.2)"/>
            <path d="M42 46 Q50 50 58 54" stroke="#99463c" stroke-width="2.5" stroke-dasharray="3 2"/>
            <path d="M26 26 L42 36 M74 26 L58 36" stroke="#d9ae48" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 14,
        numero: "XV",
        nome: "O Diabo",
        direito: "Força magnética, paixão intensa, energia instintiva e triunfo material.",
        invertido: "Libertação de dependências, quebra de ilusões e saída de um ciclo vicioso.",
        elemento: "Terra / Capricórnio",
        palavrasChave: ["Paixão", "Magnetismo", "Apego", "Sombra"],
        acaoSugerida: "Identificar onde você está agindo por medo ou apego e recuperar seu poder pessoal.",
        afirmacao: "Reconheço minhas sombras e uso minha energia vital para criar o bem com liberdade.",
        simNao: "NÃO",
        simNaoDesc: "Não insista por ambição desmedida ou atalhos ilusórios. Analise o que o aprisiona.",
        amor: "Atração física intensa e magnética, mas pede vigilância contra ciúmes e posse.",
        trabalho: "Potencial de lucros elevados, porém exija total transparência em contratos.",
        arquetipoVida: "O Despertador de Sombras: astuto, magnético e capaz de transmutar desejos materiais em força criativa.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 25 L56 38 L70 38 L58 48 L62 62 L50 52 L38 62 L42 48 L30 38 L44 38 Z" stroke="#a33b32" stroke-width="1.5" fill="rgba(163, 59, 50, 0.15)"/>
            <circle cx="42" cy="46" r="3" fill="#d9ae48"/>
            <circle cx="58" cy="46" r="3" fill="#d9ae48"/>
            <path d="M36 74 C42 66 58 66 64 74" stroke="#99463c" stroke-width="2.5"/>
        </svg>`
    },
    {
        id: 15,
        numero: "XVI",
        nome: "A Torre",
        direito: "Queda de falsas ilusões, libertação repentina e desmoronamento de estruturas frágeis.",
        invertido: "Prisão voluntária, adiamento do inevitável ou catástrofe evitada por pouco.",
        elemento: "Fogo / Marte",
        palavrasChave: ["Ruptura", "Revelação", "Libertação", "Verdade"],
        acaoSugerida: "Aceitar uma mudança imprevista com coragem e reconstruir sobre bases autênticas.",
        afirmacao: "A verdade me liberta de estruturas ilusórias; renasço mais forte e consciente.",
        simNao: "NÃO",
        simNaoDesc: "Não. A estrutura atual não se sustentará; o imprevisto chega para limpar o caminho.",
        amor: "Ruptura de ilusões ou fim de um silêncio incômodo com verdades necessárias à tona.",
        trabalho: "Mudança inesperada de rumo profissional; oportunidade de recomeçar em terreno firme.",
        arquetipoVida: "O Libertador Radical: detesta superficialidades, quebra paradigmas e reconstrói com solidez.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M38 78 L42 36 L58 36 L62 78 Z" stroke="#c99a2e" stroke-width="2" fill="rgba(201, 154, 46, 0.1)"/>
            <path d="M42 36 L36 30 L50 22 L64 30 L58 36 Z" stroke="#d9ae48" stroke-width="1.5" fill="rgba(217, 174, 72, 0.3)"/>
            <path d="M50 16 L46 26 L54 28 L48 38" stroke="#a33b32" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 16,
        numero: "XVII",
        nome: "A Estrela",
        direito: "Esperança viva, bênção cósmica, inspiração pura, cura e beleza.",
        invertido: "Desesperança passageira, desânimo injustificado e falta de fé em si.",
        elemento: "Ar / Aquário",
        palavrasChave: ["Esperança", "Inspiração", "Fé Cósmica", "Renovação"],
        acaoSugerida: "Cultivar a gratidão e dar um passo ousado guiado pela sua maior inspiração.",
        afirmacao: "Minha estrela brilha no céu; estou sob a proteção carinhosa do universo.",
        simNao: "SIM",
        simNaoDesc: "Sim! Um dos maiores presságios do Tarô; bênçãos e realização no horizonte.",
        amor: "Amor generoso, cura de desilusões passadas, conexão de almas e ternura radiante.",
        trabalho: "Sucesso com ideias criativas, visibilidade merecida e caminhos de abundância.",
        arquetipoVida: "O Farol da Esperança: carismático, visionário, humanitário e irradiador de luz e consolo.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <polygon points="50,20 54,34 68,34 57,43 61,56 50,47 39,56 43,43 32,34 46,34" fill="#d9ae48" stroke="#c99a2e" stroke-width="1"/>
            <circle cx="28" cy="30" r="3" fill="#99463c"/>
            <circle cx="72" cy="30" r="3" fill="#99463c"/>
            <circle cx="24" cy="62" r="3" fill="#99463c"/>
            <circle cx="76" cy="62" r="3" fill="#99463c"/>
            <path d="M30 76 Q50 68 70 76" stroke="#99463c" stroke-width="2"/>
        </svg>`
    },
    {
        id: 17,
        numero: "XVIII",
        nome: "A Lua",
        direito: "Intuição sutil, imaginação fértil, revelação de mistérios inconscientes.",
        invertido: "Ilusões desfeitas, medos superados, fim de armadilhas e clareza nas sombras.",
        elemento: "Água / Peixes",
        palavrasChave: ["Inconsciente", "Ilusão", "Sonhos", "Clarividência"],
        acaoSugerida: "Prestar atenção aos seus sonhos ou escrever sobre seus medos para trazê-los à luz.",
        afirmacao: "Navego pelas águas profundas do inconsciente com coragem e lucidez.",
        simNao: "TALVEZ",
        simNaoDesc: "Cuidado com mal-entendidos e fantasias; espere a névoa dissipar antes de agir.",
        amor: "Emoções à flor da pele, romantismo poético, mas requer cuidado com desconfianças infundadas.",
        trabalho: "Excelente para artes e imaginação criativa; atenção redobrada a cláusulas contratuais.",
        arquetipoVida: "O Místico dos Sonhos: hipersensível, empático, capaz de decifrar o invisível e curar emoções.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 C66 20 80 34 80 50 C80 66 66 80 50 80 C56 70 60 60 60 50 C60 40 56 30 50 20 Z" fill="#d9ae48" stroke="#c99a2e" stroke-width="1.5"/>
            <circle cx="34" cy="72" r="6" stroke="#99463c" stroke-width="2"/>
            <circle cx="66" cy="72" r="6" stroke="#99463c" stroke-width="2"/>
            <path d="M42 46 L58 46" stroke="#99463c" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 18,
        numero: "XIX",
        nome: "O Sol",
        direito: "Clareza total, alegria transbordante, sucesso pleno, vitalidade e verdade.",
        invertido: "Sucesso atrasado, orgulho excessivo ou deslumbramento passageiro.",
        elemento: "Fogo / Sol",
        palavrasChave: ["Sucesso", "Vitalidade", "Alegria", "Celebração"],
        acaoSugerida: "Celebrar uma vitória recente e compartilhar sua energia positiva com alguém próximo.",
        afirmacao: "Sou pura vitalidade e luz; meu brilho ilumina o mundo com alegria autêntica.",
        simNao: "SIM",
        simNaoDesc: "Sim com louvor! O Arcano mais luminoso; triunfo, celebração e calor na sua questão.",
        amor: "Harmonia completa, felicidade conjugal, casamento ou encontro com alma afim.",
        trabalho: "Vitória consagrada, reconhecimento do seu talento e excelente retorno financeiro.",
        arquetipoVida: "O Portador da Luz: alegre, motivador, caloroso, líder natural que espalha otimismo genuíno.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="18" fill="#d9ae48" stroke="#c99a2e" stroke-width="2"/>
            <path d="M50 16 L50 26 M50 74 L50 84 M16 50 L26 50 M74 50 L84 50" stroke="#d9ae48" stroke-width="3" stroke-linecap="round"/>
            <path d="M26 26 L33 33 M67 67 L74 74 M74 26 L67 33 M33 67 L26 74" stroke="#d9ae48" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="44" cy="46" r="2.5" fill="#f7f2e7"/>
            <circle cx="56" cy="46" r="2.5" fill="#f7f2e7"/>
            <path d="M44 56 Q50 60 56 56" stroke="#f7f2e7" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 19,
        numero: "XX",
        nome: "O Julgamento",
        direito: "Despertar da alma, chamado da vocação, renascimento e colheita justa.",
        invertido: "Resistência ao chamado, hesitação em perdoar e julgamento errôneo de si mesmo.",
        elemento: "Fogo / Plutão",
        palavrasChave: ["Despertar", "Chamado", "Libertação", "Avaliação"],
        acaoSugerida: "Fazer uma autoavaliação sincera e responder ao seu verdadeiro propósito sem adiar mais.",
        afirmacao: "Ouço meu chamado superior e desperto alegremente para uma nova versão de mim.",
        simNao: "SIM",
        simNaoDesc: "Sim! A hora da libertação e do chamado positivo para um novo patamar chegou.",
        amor: "Restauração de confiança, novo rumo libertador ou perdão mútuo que cura tudo.",
        trabalho: "Chamado vocacional claro, reconhecimento de méritos passados e nova fase profissional.",
        arquetipoVida: "O Despertador de Consciências: visionário, catalisador de renascimento pessoal e coletivo.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M38 32 L62 20 L62 44 Z" stroke="#d9ae48" stroke-width="2" fill="rgba(217, 174, 72, 0.2)"/>
            <path d="M62 32 L78 32" stroke="#c99a2e" stroke-width="2"/>
            <path d="M28 76 L36 58 M50 76 L50 56 M72 76 L64 58" stroke="#99463c" stroke-width="2" stroke-linecap="round"/>
            <circle cx="50" cy="24" r="3" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 20,
        numero: "XXI",
        nome: "O Mundo",
        direito: "Realização plena, conquista total, integração cósmica, triunfo e êxito duradouro.",
        invertido: "Conclusão que se arrasta, pequenas pendências para fechar o ciclo.",
        elemento: "Terra / Saturno",
        palavrasChave: ["Plenitude", "Conclusão", "Sucesso Total", "Harmonia"],
        acaoSugerida: "Concluir um ciclo ou tarefa com excelência e comemorar o caminho percorrido.",
        afirmacao: "Estou em perfeita sintonia com a vida e celebro minhas conquistas com plenitude.",
        simNao: "SIM",
        simNaoDesc: "Sim absoluto! Plenitude cósmica, realização de planos e encerramento com chave de ouro.",
        amor: "Amor consumado, sentimento de completude mútua e planos de futuro realizados.",
        trabalho: "Sucesso consagrado, projeção ampla, viagens a negócios e colheita abundante.",
        arquetipoVida: "O Integrador Universal: conectado com o todo, cosmopolita, harmonioso e mestre da realização.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <ellipse cx="50" cy="50" rx="24" ry="32" stroke="#c99a2e" stroke-width="2.5" fill="rgba(201, 154, 46, 0.1)"/>
            <circle cx="50" cy="50" r="8" fill="#99463c"/>
            <circle cx="28" cy="24" r="3" fill="#d9ae48"/>
            <circle cx="72" cy="24" r="3" fill="#d9ae48"/>
            <circle cx="28" cy="76" r="3" fill="#d9ae48"/>
            <circle cx="72" cy="76" r="3" fill="#d9ae48"/>
        </svg>`
    },
    {
        id: 21,
        numero: "0",
        nome: "O Louco",
        direito: "Partida corajosa, espontaneidade, liberdade interior, início sem amarras.",
        invertido: "Imprudência cega, distração, fuga de responsabilidades e precipitação.",
        elemento: "Ar / Urano",
        palavrasChave: ["Novo Começo", "Espontaneidade", "Liberdade", "Fé"],
        acaoSugerida: "Ousar dar um passo inédito sem medo do desconhecido; abrir-se a novas aventuras.",
        afirmacao: "Confio no infinito e inicio minha jornada com coração leve, puro e livre.",
        simNao: "SIM",
        simNaoDesc: "Sim! Se você tiver coragem de dar o salto de fé desapegado do medo.",
        amor: "Novo romance apaixonante, leveza, espontaneidade e liberdade para ser quem você é.",
        trabalho: "Início de um projeto pioneiro, inovação ousada e quebra de regras antiquadas.",
        arquetipoVida: "O Peregrino da Liberdade: desbravador, autêntico, espontâneo, conectado com a pura fé cósmica.",
        iconeSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2"/>
            <path d="M30 68 L64 34" stroke="#c99a2e" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="68" cy="30" r="7" stroke="#d9ae48" stroke-width="2" fill="rgba(217, 174, 72, 0.3)"/>
            <path d="M40 76 Q52 70 60 76 T74 72" stroke="#99463c" stroke-width="2" fill="none"/>
            <circle cx="50" cy="46" r="4" fill="#99463c"/>
            <path d="M26 80 L36 68" stroke="#c99a2e" stroke-width="2"/>
        </svg>`
    }
];

// Helper para obter arcano por ID
function getArcanoById(id) {
    return ARCANOS_DATA.find(a => a.id === id);
}

// Helper para calcular Arcano de Nascimento a partir de uma data (YYYY-MM-DD ou DD/MM/AAAA)
function calcularArcanoDeNascimento(dataNascimento) {
    if (!dataNascimento) return ARCANOS_DATA[0];
    
    // Extrai números
    const cleanNumbers = dataNascimento.replace(/\D/g, '');
    if (cleanNumbers.length < 8) return ARCANOS_DATA[0];

    // Soma todos os dígitos
    let soma = 0;
    for (let char of cleanNumbers) {
        soma += parseInt(char, 10);
    }

    // Redução clássica do Tarô: se soma > 22, soma os dígitos novamente até ficar entre 1 e 22
    while (soma > 22) {
        let temp = 0;
        soma.toString().split('').forEach(d => temp += parseInt(d, 10));
        soma = temp;
    }

    // Se soma for 22, corresponde ao O Louco (id 21) ou O Mundo (id 20)
    // Na tradição: 1 = Mago (id 0) ... 21 = Mundo (id 20), 22/0 = O Louco (id 21)
    if (soma === 22 || soma === 0) {
        return ARCANOS_DATA[21]; // O Louco
    }
    return ARCANOS_DATA[soma - 1] || ARCANOS_DATA[0];
}
