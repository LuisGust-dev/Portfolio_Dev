// Todo o conteúdo do site fica aqui. Edite este arquivo para atualizar o portfólio.

export const profile = {
  name: 'Luis Gustavo',
  role: 'Desenvolvedor Full Stack',
  location: 'Bahia, Brasil',
  headline: 'Transformo processos de papel em sistemas que funcionam.',
  rotating: ['APIs REST', 'sistemas administrativos', 'automação de processos', 'painéis com Laravel'],
  stats: [
    { value: '3', label: 'experiências em desenvolvimento' },
    { value: '2024', label: 'desenvolvendo desde' },
    { value: '4', label: 'perfis de acesso no EstagFy' },
  ],
  summary:
    'Desenvolvedor Full Stack com foco em PHP, Laravel e MySQL. Construo sistemas administrativos para o setor público, APIs REST e automações que tiram trabalho manual das equipes. Procuro uma vaga de desenvolvedor júnior para seguir crescendo em projetos reais.',
  email: 'gustavolobo2019@gmail.com',
  phoneDisplay: '(77) 98849-3551',
  whatsapp: 'https://wa.me/5577988493551',
  linkedin: 'https://www.linkedin.com/in/gusta-dev-fullstack',
  linkedinLabel: 'linkedin.com/in/gusta-dev-fullstack',
  github: 'https://github.com/LuisGust-dev',
  githubLabel: 'github.com/LuisGust-dev',
  // Coloque o PDF em /public/curriculo.pdf e troque para '/curriculo.pdf' para mostrar o botão.
  cvUrl: null,
};

export const experiences = [
  {
    role: 'Desenvolvedor Full Stack Júnior',
    company: 'SystemMT',
    period: 'Nov 2025',
    mode: null,
    points: [
      'Reestruturação de módulos administrativos de sistemas usados por prefeituras e pelo público municipal.',
      'Implementação de APIs REST no back-end com Laravel e MySQL, versionadas no GitHub.',
      'Manutenção e documentação técnica dos módulos internos.',
    ],
    stack: ['Laravel', 'MySQL', 'APIs REST', 'GitHub'],
  },
  {
    role: 'Estagiário de Desenvolvimento',
    company: 'Caju Tech',
    period: 'Abr 2025',
    mode: 'Home office',
    points: [
      'Desenvolvimento de aplicações web com Node.js e TailwindCSS, com versionamento e metodologias ágeis.',
      'Criação de autenticação, gerenciamento de usuários e relatórios para sistemas empresariais.',
      'Trabalho em equipe multidisciplinar na entrega de soluções escaláveis.',
    ],
    stack: ['Node.js', 'TailwindCSS', 'Git'],
  },
  {
    role: 'Desenvolvedor Full Stack',
    company: 'Polícia Militar (Batalhão)',
    period: 'Mar 2024',
    mode: 'Presencial',
    points: [
      'Automação de rotinas internas, melhorando a inserção e o tratamento de dados do CRAM.',
      'Sistemas com Laravel, MySQL e Git para agilizar processos administrativos.',
      'Interfaces de visualização e gestão de formulários usadas por secretários e pela equipe militar.',
    ],
    stack: ['Laravel', 'MySQL', 'Git', 'Blade'],
  },
];

export const project = {
  name: 'EstagFy',
  tagline: 'Sistema de gestão de estágios',
  context: 'Projeto de TCC, 2026',
  description:
    'Plataforma web que conecta alunos, empresas, coordenação e administração em um só lugar. Cada perfil vê apenas o que precisa: vagas, candidaturas, notificações, chat, calendário acadêmico e painel administrativo.',
  stack: ['PHP', 'Laravel', 'MySQL', 'Blade', 'TailwindCSS', 'JavaScript', 'Git', 'Railway'],
  link: 'https://github.com/LuisGust-dev',
  linkLabel: 'Ver no GitHub',
  // Telas ilustrativas por perfil (mostradas no mockup interativo)
  views: [
    {
      id: 'aluno',
      label: 'Aluno',
      title: 'Minhas candidaturas',
      rows: [
        { a: 'Estágio em desenvolvimento web', b: 'Em análise', tone: 'wait' },
        { a: 'Suporte técnico', b: 'Aprovada', tone: 'ok' },
        { a: 'Análise de dados', b: 'Enviada', tone: 'neutral' },
      ],
      note: '3 novas vagas compatíveis com seu curso',
    },
    {
      id: 'empresa',
      label: 'Empresa',
      title: 'Candidatos por vaga',
      rows: [
        { a: 'Estágio em desenvolvimento web', b: '12 candidatos', tone: 'neutral' },
        { a: 'Estágio em design', b: '5 candidatos', tone: 'neutral' },
        { a: 'Estágio administrativo', b: 'Vaga encerrada', tone: 'wait' },
      ],
      note: '2 mensagens novas no chat',
    },
    {
      id: 'coordenacao',
      label: 'Coordenação',
      title: 'Calendário acadêmico',
      rows: [
        { a: 'Entrega do termo de compromisso', b: '05 dez', tone: 'wait' },
        { a: 'Relatório parcial de estágio', b: '18 dez', tone: 'neutral' },
        { a: 'Avaliação final', b: '20 fev', tone: 'neutral' },
      ],
      note: '4 termos aguardando aprovação',
    },
    {
      id: 'admin',
      label: 'Admin',
      title: 'Usuários e perfis',
      rows: [
        { a: 'Alunos ativos', b: '248', tone: 'ok' },
        { a: 'Empresas parceiras', b: '31', tone: 'ok' },
        { a: 'Contas pendentes', b: '6', tone: 'wait' },
      ],
      note: 'Controle de acesso por perfil ativo',
    },
  ],
};

export const skills = [
  { group: 'Back-end', items: ['PHP', 'Laravel', 'Node.js', 'Python', 'Django', 'APIs REST'] },
  { group: 'Front-end', items: ['JavaScript', 'TailwindCSS', 'Blade'] },
  { group: 'Banco de dados', items: ['MySQL', 'PostgreSQL', 'Firebase'] },
  { group: 'Ferramentas', items: ['Git', 'GitHub', 'Figma', 'Canva'] },
];

export const languages = [
  { name: 'Inglês', level: 3, max: 5, label: 'Intermediário, leitura de documentação técnica' },
];
