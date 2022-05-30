<template>
  <div class="home">
    <b-carousel
      id="carousel-fade"
      style="background-color: black"
      fade
      indicators
      img-height="480"
    >

        <b-carousel-slide
          caption="Hello world!"
        >
          <template #img>
            <img
              class="d-block img-fluid w-100 overlay"
              :src="img_code"
            >
          </template>
        </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import code from "@/assets/code.jpg"

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
   opacity: 0.4;
}
</style>
