<template>
  <div>
    <div v-html="markdownToHtml"></div>
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
      console.log(file);
      return marked(file['default']);
    }
  }
}
</script>