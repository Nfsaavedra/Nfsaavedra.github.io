<template>
  <div>
    <h1>MSc Supervisions</h1>
    <b-card 
      v-for="supervision in reversedSupervisions" 
      :key="supervision['title']"
      class="mx-auto" 
      style="max-width: 50%; margin-bottom: 1.5rem;" 
    >
      <b-card-body>
        <div class="d-flex align-items-start">
          <a href="https://tecnico.ulisboa.pt/pt/">
            <img src="/img/IST.png" width="50px" class="me-3"/>
          </a>
          <div class="ml-5">
            <b-card-title class="mb-1">
              {{ supervision['student'] }} 
              <a style="color: black" :href="supervision['url']" target="_blank"><i>{{ supervision['title'] }}</i></a>
            </b-card-title>
            <div
              style="color: var(--secondary); text-align: left !important;"
            >
              Co-supervised with {{ supervision.cosupervised }} - {{ supervision.year }}
            </div>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'SupervisionsView',
  data() {
    return {
      supervisions: [
        {
          student: "Sancha Barroso.",
          title: "Code Smell Detection in Infrastructure as Code using Transformers",
          cosupervised: "João F. Ferreira and Alberto Abad",
          year: "2023-2024",
          url: "https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/283828618791087"
        },
        {
          student: "Adriana Nunes.",
          title: "LLM-Based Detection of Security Smells in Infrastructure as Code",
          cosupervised: "João F. Ferreira and Alexandra Mendes",
          year: "2024-2025",
          url: "https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/1128253548924041"
        },
        {
          student: "Simão Fonseca.",
          title: "Automated Detection of Errors and Security Vulnerabilities in Infrastructure as Code Scripts",
          cosupervised: "João F. Ferreira and Alexandra Mendes",
          year: "2024-2025",
          url: "https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/1409728525633641"
        },
        {
          student: "João Pereira.",
          title: "FixN’Push: Interactive Debugger for GitHub Actions",
          cosupervised: "João F. Ferreira",
          year: "2025-2026",
          url: "https://fenix.tecnico.ulisboa.pt/cursos/meic-t/dissertacao/846778572215194"
        },
        {
          student: "Martim Monis.",
          title: "Vibenix: Automated Generation and Maintenance of Nix Packages using Large Language Models",
          cosupervised: "João F. Ferreira and Alexandra Mendes",
          year: "2025-2026",
          url: "https://fenix.tecnico.ulisboa.pt/cursos/meic-a/dissertacao/283828618791377"
        }
      ]
    };
  },
  computed: {
    reversedSupervisions() {
      return [...this.supervisions].reverse();
    }
  }
};
</script>

<style scoped>
.card-title {
  text-align: left;
  align-self: flex-start;
  margin-bottom: 6px;
}
</style>