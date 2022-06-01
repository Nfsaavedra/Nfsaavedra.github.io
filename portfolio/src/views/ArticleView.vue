<template>
  <div style="text-align: left;">
    <div id="article" v-html="markdownToHtml"></div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { ARTICLES } from '@/constants.js';

export default {
  name: 'ArticleView',
  computed: {
    markdownToHtml() {
      const file = require("raw-loader!@/assets/articles/" +
        ARTICLES[this.$route.query.id]["path"]);
      return marked(file['default']);
    }
  }
}
</script>

<style lang="scss" scoped>
#article {
  overflow-y: scroll;
  height: 100%;
}

@media screen and (min-width: 1024px) {
  #view {
    margin-left: 25%; 
    margin-right: 25%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px){
  #view {
    margin-left: 10%; 
    margin-right: 10%;
  }
}

@media screen and (max-width: 767px){
  #view {
    margin-left: 2%; 
    margin-right: 2%;
  }
}
</style>