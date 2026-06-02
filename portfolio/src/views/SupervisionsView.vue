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
import { SUPERVISIONS, sortSupervisionsByYearDesc } from '@/data/supervisions.js';

export default {
  name: 'SupervisionsView',
  data() {
    return {
      supervisions: SUPERVISIONS
    };
  },
  computed: {
    reversedSupervisions() {
      return sortSupervisionsByYearDesc(this.supervisions);
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