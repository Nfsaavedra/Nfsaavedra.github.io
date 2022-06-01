<template>
  <div>
    <h1>Blog</h1>
    <div id="articles" style="overflow: auto; max-height: calc(96% - 40px);">
      <b-card
          :title="article['name']"
          :img-src="article['image']"
          img-alt="Image"
          img-top
          tag="article"
          class="mt-2 article"
          style="width: 46%;"
          v-for="(article, id) in articles" 
          :key="id"
      >
          <b-card-text>
          {{ article['description'] }}
          </b-card-text>

          <b-button class="article-button" :href="'article?id=' + id" variant="secondary">
            Read article
          </b-button>
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

<style scoped>
#articles {
  margin-left: 8%;
  margin-right: 8%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

@media screen and (min-width: 768px) and (max-width: 1023px){
  #articles {
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: column;
  }

  .article {
    width: 90% !important;
  }
}

@media screen and (max-width: 767px){
  #articles {
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
  }

  .article {
    width: 90% !important;
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.card-text {
  text-align: left;
}

.article-button {
  margin-top: auto;
}
</style>