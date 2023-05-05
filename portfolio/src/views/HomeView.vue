<template>
  <div class="home">
    <div style="display: flex; justify-content: center; background-color: black;">
      <b-carousel
        id="carousel-fade"
        style="background-color: black; max-width: 1920px; max-height: 1080px"
        fade
        indicators
        img-height="480"
      >
        <b-carousel-slide>
          <h1 class="d-none d-xl-block">Contribute to GLITCH!</h1>
          <template #img>
            <a href="https://github.com/sr-lab/GLITCH" target="_blank">
              <img
                class="d-block img-fluid w-100 overlay"
                :src="img_code"
              >
            </a>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div class="d-xl-flex" style="justify-content: center; margin-top: 30px">
      <div class="d-block">
        <b-avatar src="img/avatar.png" size="20vh"></b-avatar>
        <h2 style="margin-top: 5px;">Nuno Saavedra</h2>
        <h5 style="margin-top: -4px; color: rgb(48, 48, 48)">Computer Scientist</h5>
        <h5 style="margin-top: -4px;"><a href="mailto:nuno@saavedra.pt">nuno@saavedra.pt</a></h5>
        <div class="d-block d-xl-none">
          <b-avatar href="https://github.com/Nfsaavedra" class="mr-3" style="background-color: white;" size="40px" target="_blank" src="img/github.svg"></b-avatar>
          <b-avatar href="https://scholar.google.com/citations?user=iYiwTYUAAAAJ" class="mr-3" style="background-color: #535e79;" size="40px" target="_blank" src="img/scholar.svg"></b-avatar>
          <b-avatar href="https://twitter.com/nunofsaavedra" class="mr-3" style="background-color: #535e79;" size="40px" target="_blank" src="img/twitter.svg"></b-avatar>
          <b-avatar href="https://orcid.org/0000-0003-4148-5991" style="background-color: white;" size="40px" target="_blank" src="img/orcid.svg"></b-avatar>
        </div>
      </div>
      <div class="d-block mx-30">
        <h1 style="text-align: left; color: #535e79">About Me</h1>
        <p class="vw-xl-40" style="width: calc(100vw - 60px); font-size: 17pt; text-align: justify;">
        I am a Computer Scientist with a Master's degree from <a href="https://tecnico.ulisboa.pt" target="_blank">Instituto Superior Técnico</a>.
        During my Master's, I specialized in Algorithms and Programming. 
        I also developed <a href="https://github.com/sr-lab/GLITCH" target="_blank">GLITCH</a>, a polyglot code smell detection framework for IaC.
        I published a <a href="https://dl.acm.org/doi/10.1145/3551349.3556945" target="_blank">paper about GLITCH</a> at ASE 2022.
        I have experience as a Full-stack Software Developer and as a Teaching Assistant.
        Currently, I am interested on Software Reliability and Verification, specially on configuration code.
        <a href="#/about">Click here to know more about me!</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import code from "@/assets/code-glitch.jpg"

export default {
  name: 'HomeView',
  data() {
    return {
      img_code: code
    };
  }
}
</script>

<style scoped>
.overlay {
   object-fit: cover;
   opacity: 0.6;
}

a {
  color: #535e79 !important;
}

a:hover {
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
</style>
