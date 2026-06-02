export const SUPERVISIONS = [
  {
    student: 'Sancha Barroso.',
    title: 'Code Smell Detection in Infrastructure as Code using Transformers',
    cosupervised: 'João F. Ferreira and Alberto Abad',
    year: '2023-2024',
    url: 'https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/283828618791087'
  },
  {
    student: 'Adriana Nunes.',
    title: 'LLM-Based Detection of Security Smells in Infrastructure as Code',
    cosupervised: 'João F. Ferreira and Alexandra Mendes',
    year: '2024-2025',
    url: 'https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/1128253548924041'
  },
  {
    student: 'Simão Fonseca.',
    title: 'Automated Detection of Errors and Security Vulnerabilities in Infrastructure as Code Scripts',
    cosupervised: 'João F. Ferreira and Alexandra Mendes',
    year: '2024-2025',
    url: 'https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/1409728525633641'
  },
  {
    student: 'João Pereira.',
    title: "FixN'Push: Interactive Debugger for GitHub Actions",
    cosupervised: 'João F. Ferreira',
    year: '2025-2026',
    url: 'https://fenix.tecnico.ulisboa.pt/cursos/meic-t/dissertacao/846778572215194'
  },
  {
    student: 'Martim Monis.',
    title: 'Vibenix: Automated Generation and Maintenance of Nix Packages using Large Language Models',
    cosupervised: 'João F. Ferreira and Alexandra Mendes',
    year: '2025-2026',
    url: 'https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/283828618791377'
  }
];

export function sortSupervisionsByYearDesc(list) {
  return [...list].sort((a, b) => b.year.localeCompare(a.year));
}

export function getLatestSupervisions(list, limit = 2) {
  return sortSupervisionsByYearDesc(list).slice(0, limit);
}
