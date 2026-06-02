<template>
  <div class="home">
    <div class="d-xl-flex profile-row" style="justify-content: center; margin-top: 30px">
      <div class="d-block">
        <b-avatar src="img/avatar.png" size="20vh"></b-avatar>
        <h2 style="margin-top: 5px;">Nuno Saavedra</h2>
        <h5 style="margin-top: -4px; color: rgb(48, 48, 48)">PhD student</h5>
        <h5 style="margin-top: -4px;"><a href="mailto:nuno@saavedra.pt">nuno@saavedra.pt</a></h5>
        <div class="d-block d-xl-none profile-icons">
          <b-avatar href="mailto:nuno@saavedra.pt" class="mr-3" style="background-color: white;" size="40px" src="img/email.svg"></b-avatar>
          <b-avatar href="https://github.com/Nfsaavedra" class="mr-3" style="background-color: white;" size="40px" target="_blank" src="img/github.svg"></b-avatar>
          <b-avatar href="https://scholar.google.com/citations?user=iYiwTYUAAAAJ" class="mr-3" style="background-color: #535e79;" size="40px" target="_blank" src="img/scholar.svg"></b-avatar>
          <b-avatar href="https://twitter.com/nunofsaavedra" class="mr-3" style="background-color: #535e79;" size="40px" target="_blank" src="img/twitter.svg"></b-avatar>
          <b-avatar href="https://orcid.org/0000-0003-4148-5991" style="background-color: white;" size="40px" target="_blank" src="img/orcid.svg"></b-avatar>
        </div>
      </div>
      <div class="d-block mx-30">
        <h1 class="d-none d-xl-block" style="text-align: left; color: #535e79">About Me</h1>
        <p class="vw-xl-40" style="width: calc(100vw - 60px); font-size: 17pt; text-align: justify;">
        I am a co-founder of <a href="https://codeset.ai" target="_blank">Codeset</a> and a PhD student at <a href="https://www.inesc-id.pt/" target="_blank">INESC-ID</a> and <a href="https://tecnico.ulisboa.pt" target="_blank">Instituto Superior Técnico</a>.
        During my Master's, I developed <a href="https://github.com/sr-lab/GLITCH" target="_blank">GLITCH</a>, a polyglot code smell detection framework for IaC.
        I published two papers about GLITCH at <a href="https://dl.acm.org/doi/10.1145/3551349.3556945" target="_blank">ASE 2022</a> and <a href="https://ieeexplore.ieee.org/document/10298400" target="_blank">ASE 2023</a>.
        I have experience as a Full-stack Software Developer.
        I also worked as a Teaching Assistant for various courses at <a href="https://tecnico.ulisboa.pt" target="_blank">IST</a>.
        Currently, I am interested on Software Reliability and Verification, in particular on infrastructure and configuration code.
        <a href="#/about">Click here to know more about me!</a>
        </p>
      </div>
    </div>

    <section class="overview mx-30">
      <div class="overview-row">
        <div class="overview-column">
          <h2>Recent publications</h2>
          <div class="rotator-panel">
            <b-spinner v-if="loadingPublications" small label="Loading..."></b-spinner>
            <p v-else-if="publicationsError" class="overview-muted">Unable to load publications.</p>
            <overview-rotator v-else-if="publications.length" :items="publications">
              <template v-slot="{ item }">
                <a :href="item.link" target="_blank" class="overview-item-title">{{ item.title }}</a>
                <div class="overview-item-meta">{{ item.conference }}</div>
                <div class="overview-item-meta">{{ item.authors }} — {{ item.date }}</div>
                <div class="overview-badges">
                  <b-badge pill :href="item.link" target="_blank">DOI</b-badge>
                  <b-badge v-if="item.pdf" pill :href="item.pdf" target="_blank">PDF</b-badge>
                </div>
              </template>
            </overview-rotator>
          </div>
          <a href="#/publications" class="overview-link">View all publications →</a>
        </div>

        <div class="overview-column">
          <h2>Recent MSc supervisions</h2>
          <div class="rotator-panel">
            <overview-rotator :items="supervisions">
              <template v-slot="{ item }">
                <span class="overview-item-title">{{ item.student }}</span>
                <a :href="item.url" target="_blank" class="overview-thesis-title"><i>{{ item.title }}</i></a>
                <div class="overview-item-meta">Co-supervised with {{ item.cosupervised }} — {{ item.year }}</div>
              </template>
            </overview-rotator>
          </div>
          <a href="#/supervisions" class="overview-link">View all supervisions →</a>
        </div>
      </div>

      <div class="overview-section">
        <h2>Recent photos</h2>
        <div class="photo-grid">
          <a
            v-for="photo in latestPhotos"
            :key="photo.locationId + '-' + photo.photoIndex"
            :href="photo.mapLink"
            class="photo-thumb"
          >
            <img :src="photo.src" :alt="photo.caption" />
            <span class="photo-caption">{{ photo.locationName }}</span>
          </a>
        </div>
        <a href="#/map-photos" class="overview-link">View photo map →</a>
      </div>
    </section>
  </div>
</template>

<script>
import OverviewRotator from '@/components/OverviewRotator.vue';
import { fetchPublications } from '@/services/publicationsService.js';
import { SUPERVISIONS, sortSupervisionsByYearDesc } from '@/data/supervisions.js';
import { MAP_LOCATIONS, getLatestPhotos } from '@/data/mapLocations.js';

export default {
  name: 'HomeView',
  components: {
    OverviewRotator
  },
  data() {
    return {
      loadingPublications: true,
      publicationsError: false,
      publications: [],
      supervisions: sortSupervisionsByYearDesc(SUPERVISIONS),
      latestPhotos: getLatestPhotos(MAP_LOCATIONS, 4)
    };
  },
  async created() {
    try {
      this.publications = await fetchPublications(this.$session);
    } catch (error) {
      console.error('Error loading publications for home:', error);
      this.publicationsError = true;
    } finally {
      this.loadingPublications = false;
    }
  }
}
</script>

<style scoped>
a:not(.badge) {
  color: #535e79 !important;
}

a:not(.badge):hover {
  color: #881600 !important;
}

@media (min-width: 1200px) {
  .vw-xl-40 {
    width: 40vw !important;
  }
}

.mx-30 {
  margin-left: 30px;
  margin-right: 30px;
}

@media (max-width: 1199px) {
  .profile-icons {
    margin-top: 1.25rem;
    margin-bottom: 2rem;
  }
}

.overview {
  max-width: 1100px;
  margin: 40px auto 60px;
}

.overview-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: stretch;
}

.overview-column {
  flex: 1 1 320px;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.overview-column h2 {
  color: #535e79;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.overview-section {
  margin-bottom: 2rem;
}

.overview-section h2 {
  color: #535e79;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.rotator-panel {
  flex: 1;
  min-height: 200px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: stretch;
  width: 100%;
}

.overview-item-title {
  font-weight: 600;
  display: block;
  line-height: 1.35;
}

.overview-thesis-title {
  display: block;
  margin-top: 0.25rem;
  line-height: 1.35;
}

.overview-item-meta {
  color: rgb(48, 48, 48);
  font-size: 0.9rem;
  margin-top: 0.35rem;
  line-height: 1.4;
}

.overview-muted {
  color: #666;
  margin: 0;
}

.overview-badges {
  margin-top: 0.5rem;
}

.overview-badges .badge {
  margin-right: 6px;
  color: #fff !important;
}

.overview-badges .badge:hover {
  color: #fff !important;
  opacity: 0.9;
}

.overview-link {
  font-size: 0.95rem;
  margin-top: 0.75rem;
  display: inline-block;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 0.5rem;
}

.photo-thumb {
  position: relative;
  flex: 1 1 calc(50% - 12px);
  min-width: 140px;
  max-width: calc(25% - 9px);
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff !important;
  font-size: 0.8rem;
  text-align: center;
}

@media (max-width: 767px) {
  .photo-thumb {
    max-width: calc(50% - 6px);
  }

  .rotator-panel {
    min-height: 180px;
  }
}
</style>
