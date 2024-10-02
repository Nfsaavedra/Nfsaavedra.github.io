<template>
  <div>
    <h1>MSc Supervisions</h1>
    <b-card 
      v-for="supervision in supervisions" 
      :key="supervision['title']"
      class="mx-auto" 
      style="max-width: 50%;" 
    >
      <b-card-body>
        <div class="d-flex align-items-start">
          <a href="https://tecnico.ulisboa.pt/pt/">
            <img src="/img/IST.png" width="50px" class="me-3"/>
          </a>
          <div class="ml-5">
            <b-card-title class="mb-1">
              {{ supervision['student'] }} 
              <a style="color: black" :href="supervision['url']"><i>{{ supervision['title'] }}</i></a>
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
        }
      ]
    };
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