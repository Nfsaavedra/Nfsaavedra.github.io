<template>
  <div
    class="overview-rotator"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <transition name="rotator-fade" mode="out-in">
      <div :key="activeKey" class="rotator-slide">
        <slot :item="items[currentIndex]" />
      </div>
    </transition>
    <div v-if="items.length > 1" class="rotator-dots" role="tablist">
      <button
        v-for="(_, index) in items"
        :key="index"
        type="button"
        role="tab"
        :class="{ active: index === currentIndex }"
        :aria-label="'Item ' + (index + 1)"
        :aria-selected="index === currentIndex"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewRotator',
  props: {
    items: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 7000
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    };
  },
  computed: {
    activeKey() {
      const item = this.items[this.currentIndex];
      if (!item) return this.currentIndex;
      return item.link || item.url || this.currentIndex;
    }
  },
  watch: {
    items() {
      this.currentIndex = 0;
      this.restartTimer();
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    next() {
      if (this.items.length <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    goTo(index) {
      this.currentIndex = index;
      this.restartTimer();
    },
    startTimer() {
      this.stopTimer();
      if (this.items.length <= 1) return;
      this.timer = setInterval(this.next, this.interval);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    restartTimer() {
      this.startTimer();
    },
    pause() {
      this.stopTimer();
    },
    resume() {
      this.startTimer();
    }
  }
};
</script>

<style scoped>
.overview-rotator {
  width: 100%;
}

.rotator-slide {
  min-height: 168px;
  overflow: hidden;
  text-align: left;
}

.rotator-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 0.75rem;
  padding: 0;
  list-style: none;
}

.rotator-dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #c5cad6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.rotator-dots button.active,
.rotator-dots button:hover {
  background-color: #535e79;
}

.rotator-fade-enter-active,
.rotator-fade-leave-active {
  transition: opacity 0.5s ease;
}

.rotator-fade-enter,
.rotator-fade-leave-to {
  opacity: 0;
}
</style>
