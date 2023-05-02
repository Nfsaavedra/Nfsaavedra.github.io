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
        <b-carousel-slide
          caption="Contribute to GLITCH!"
        >
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
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <div style="display: block">
        <b-avatar src="img/avatar.png" size="20vh"></b-avatar>
        <h2 style="margin-top: 5px;">Nuno Saavedra</h2>
        <h5 style="margin-top: -4px; color: rgb(48, 48, 48)">Computer Scientist</h5>
        <h5 style="margin-top: -4px;"><a href="mailto:nuno@saavedra.pt">nuno@saavedra.pt</a></h5>
      </div>
      <div style="margin-left: 30px; display: block">
        <h1 style="text-align: left; color: #535e79">About Me</h1>
        <p style="font-size: 17pt; width: 35vw; text-align: justify;">
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
</style>
