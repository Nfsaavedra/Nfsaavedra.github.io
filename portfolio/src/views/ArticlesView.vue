<template>
  <div>
    <h1 style="margin-top: 2%; margin-bottom: 2%;">Blog</h1>
    <div style="overflow: auto; max-height: calc(96% - 150px)">
      <b-card
          :title="article['name']"
          :img-src="article['image']"
          img-alt="Image"
          img-left
          tag="article"
          class="mt-2"
          style="margin-left: 2%; margin-right: 2%"
          img-width="25%"
          v-for="(article, id) in articles" 
          :key="id"
      >
          <b-card-text>
          {{ article['description'] }}
          </b-card-text>

          <b-button :href="'article?id=' + id" variant="primary">Read article</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ARTICLES } from '@/constants.js';

export default {
  name: 'ArticlesView',
  data() {
    return {
        articles: ARTICLES
    };
  }
}
</script>