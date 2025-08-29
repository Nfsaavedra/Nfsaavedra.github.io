<template>
  <div class="map-photos">
    <h1 class="map-title">My Travel Photo Map</h1>
    <p class="map-description">Explore photos from my travels around the world. Click on the markers to view photo galleries.</p>
    
    <div id="map-container" class="map-container">
      <l-map ref="map" :zoom="zoom" :center="center" :options="mapOptions" style="height: 100%">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker 
          v-for="(location, index) in locations" 
          :key="index" 
          :lat-lng="location.position"
          @click="openPopupCarousel(location)"
          :icon="customIcon"
        >
          <l-tooltip>{{ location.name }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>

    <b-modal v-model="showPhotoGallery" size="lg" :title="currentLocation ? currentLocation.name : 'Photo Gallery'" hide-footer centered>
      <div v-if="currentLocation" class="photo-gallery">
        <h2 class="gallery-title">{{ currentLocation.name }}</h2>
        <p class="gallery-description">{{ currentLocation.description }}</p>
        
        <b-carousel
          id="photo-carousel"
          :interval="4000"
          controls
          indicators
          background="#000000"
          img-width="1024"
          img-height="480"
          class="gallery-carousel"
        >
          <b-carousel-slide
            v-for="(photo, index) in currentLocation.photos"
            :key="index"
            :img-src="photo"
            :caption-html="getPhotoCaption(index)"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
import { Icon } from 'leaflet';

export default {
  name: 'MapPhotosView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  mounted() {
    // Fix for leaflet map container not rendering properly
    this.$nextTick(() => {
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => {
        if (this.$refs.map && this.$refs.map.mapObject) {
          this.$refs.map.mapObject.invalidateSize();
        }
      }, 250);
    });
  },
  data() {
    return {
      zoom: 4,
      center: [40.0, -3.0],
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      mapOptions: {
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        zoomSnap: 0.5,
        minZoom: 2,
        maxZoom: 18
      },
      currentLocation: null,
      showPhotoGallery: false,
      // Custom icon for markers
      customIcon: new Icon({
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        tooltipAnchor: [16, -28]
      }),
      locations: [
        {
          name: 'Abrantes',
          description: 'July 2022',
          position: [39.449231, -8.192028],
          photos: [
            '/photos/Abrantes.webp',
          ],
          captions: [
            'Ponte Rodoviária de Abrantes',
          ]
        },
        {
          name: 'Trondheim',
          description: 'June 2025',
          position: [63.3739150644068, 10.781664797055672],
          photos: [
            '/photos/Trondheim.webp',
          ],
          captions: [
            'Storfossen',
          ]
        },
        {
          name: 'Paris',
          description: 'February 2025',
          position: [48.87275403106653, 2.7764030386937617],
          photos: [
            '/photos/Disneyland.webp',
          ],
          captions: [
            'Disneyland Paris',
          ]
        },
        {
          name: 'Pisões de Teresa',
          description: 'August 2025',
          position: [40.04637820301593, -8.187552594828766],
          photos: [
            '/photos/Pisoes.webp',
          ],
          captions: [
            'Pisões de Teresa',
          ]
        },
      ]
    };
  },
  methods: {
    openPopupCarousel(location) {
      this.currentLocation = location;
      this.showPhotoGallery = true;
    },
    getPhotoCaption(index) {
      if (this.currentLocation && this.currentLocation.captions && this.currentLocation.captions[index]) {
        return `
          <div class="carousel-caption-custom">
            <h3>${this.currentLocation.name}</h3>
            <p>${this.currentLocation.captions[index]}</p>
          </div>
        `;
      }
      return '';
    }
  }
}
</script>

<style scoped>
.map-photos {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.map-title {
  color: #535e79;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.map-description {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.map-container {
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 600px;
  width: 100%;
  position: relative;
  z-index: 0;
}

#map-container .leaflet-container {
  height: 600px;
  width: 100%;
  z-index: 0;
}

.photo-gallery {
  padding: 10px;
}

.gallery-title {
  color: #535e79;
  text-align: center;
  margin-bottom: 5px;
}

.gallery-description {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
}

.gallery-carousel {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
}

/* Custom carousel caption styling */
::v-deep .carousel-caption-custom {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 10px;
  width: fit-content;
  margin: 0 auto;
}

::v-deep .carousel-caption-custom h3 {
  margin: 0;
  font-size: 1.25rem;
}

::v-deep .carousel-caption-custom p {
  margin: 0;
  font-size: 1rem;
}

a {
  color: #535e79 !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #881600 !important;
}

/* Bootstrap button styling override */
::v-deep .btn-primary {
  background-color: #535e79;
  border-color: #535e79;
  transition: all 0.3s ease;
}

::v-deep .btn-primary:hover {
  background-color: #404a61;
  border-color: #404a61;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style> 