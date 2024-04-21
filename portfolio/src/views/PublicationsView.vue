<template>
  <div>
    <h1>Publications</h1>
    <b-spinner v-if="publications.length == 0" style="width: 15vh; height: 15vh;" label="Loading..."></b-spinner>
    <div class="mx-lg-5 publication" style="overflow-y: scroll; max-height: calc(96% - 40px);">
      <b-card 
        :title="publication['title']"
        v-for="(publication, index) in publications" 
        :key="publication['title']"
      >
        <div class="authors">
          <div style="display: inline; margin-right: 8px;">{{ publication['conference'] }}</div><br>
          <div style="display: inline; margin-right: 8px;">{{ publication['authors'] }} - {{ publication['date'] }}</div>
          <b-badge pill :href="publication['link']" target="_blank">DOI</b-badge>
          <b-badge pill v-if="publication['pdf']" :href="publication['pdf']" target="_blank">PDF</b-badge>
          <b-badge v-for="b in publication['badges']" target="_blank" pill :href="b['link']" :key="b['name']">
            {{ b['name'] }}
          </b-badge>
        </div>
        <b-card-text v-if="publication['abstract']" style="text-align: justify">
          <b-collapse class="abstract" :id="'more-collapse' + index">
            <span style="font-weight: bold;">Abstract: </span>{{ publication['abstract'] }}
          </b-collapse>
        </b-card-text>
        <div v-if="publication['abstract']" v-b-toggle="'more-collapse' + index" class="arrow"></div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { PUBLICATIONS } from '@/constants.js';

export default {
  name: 'ArticlesView',
  data() {
    return {
      publications: []
    };
  },
  async created() {
    if (this.$session.get("publications")) {
      this.publications = this.$session.get("publications");
      return;
    }
    
    const publications = {};
    const response = await axios.get('https://pub.orcid.org/v3.0/0000-0003-4148-5991/works');
    const works = response.data.group;

    for (let i = 0; i < works.length; i++) {
      const work = (await axios.get('https://pub.orcid.org/v3.0' + works[i]['work-summary'][0]['path'])).data;
      let contributors = '';

      for (let e = 0; e < work.contributors.contributor.length; e++) {
        contributors += work.contributors.contributor[e]['credit-name'].value + ", ";
      }
      contributors = contributors.slice(0, contributors.length - 2);

      publications[work['url'].value] = {
        'title': work['title']['title'].value,
        'authors': contributors,
        'date': this.getMonthName(work['publication-date']['month'].value) + " " + work['publication-date']['year'].value,
        'link': work['url'].value,
        'conference': work['journal-title'].value
      };
    }

    for (let i = 0; i < PUBLICATIONS.length; i++) {
      publications[PUBLICATIONS[i]['doi']]['abstract'] = PUBLICATIONS[i]['abstract'];
      publications[PUBLICATIONS[i]['doi']]['pdf'] = PUBLICATIONS[i]['pdf'];
      publications[PUBLICATIONS[i]['doi']]['badges'] = PUBLICATIONS[i]['badges'];
    }

    this.publications = Object.values(publications);
    this.$session.set("publications", this.publications);
  },
  methods: {
    getMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return date.toLocaleString('en-US', { month: 'long' });
    },
    abstract_begin(string) {
      let words = string.split(" ");
      let res = "";
      for (let i = 0; i < Math.min(words.length, 100); i++) res += words[i] + " ";
      return res.trim();
    },
    abstract_end(string) {
      let words = string.split(" ");
      let res = "";
      for (let i = 100; i < words.length; i++) res += words[i] + " ";
      return res.trim();
    },
    is_big_abstract(string) {
      return string.split(" ").length > 100;
    },
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  box-sizing: border-box;
  height: 1.5vw;
  width: 1.5vw;
  border-style: solid;
  border-color: black;
  border-width: 0px 1px 1px 0px;
  transition: border-width 150ms ease-in-out;
  transition: transform 250ms ease-in;
}

.arrow.collapsed {
  transform: rotate(45deg);
}

.arrow.not-collapsed {
  transform: rotate(225deg);
}

.arrow:hover {
  border-bottom-width: 4px;
  border-right-width: 4px;
}

@media screen and (min-width: 768px) and (max-width: 1023px){
  .arrow:hover {
    border-bottom-width: 1px;
    border-right-width: 1px;
  }
}

@media screen and (max-width: 767px){
  .arrow:hover {
    border-bottom-width: 1px;
    border-right-width: 1px;
  }
}

.abstract:not(.show) {
  display: block !important;
  height: 3rem;
  overflow: hidden;
}

.abstract.collapsing {
  min-height: 3rem !important;
}

.card {
  margin-bottom: 1%;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-title {
  text-align: left;
  align-self: flex-start;
  margin-bottom: 6px;
}

.authors {
  align-self: flex-start;
  text-align: left;
  margin-bottom: 6px; 
  color: var(--secondary);
}

.badge {
  margin-right: 6px;
}

@media screen and (min-width: 1921px) {
  .publication {
    margin-left: 25% !important;
    margin-right: 25% !important;
  }
}
</style>