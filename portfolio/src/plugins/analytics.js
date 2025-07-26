export default {
  install(Vue) {
    const gtag = window.gtag;

    if (!gtag) {
      console.warn('Google Analytics not loaded');
      return;
    }

    Vue.prototype.$gtag = gtag;

    Vue.mixin({
      mounted() {
        if (this.$route) {
          this.trackPageView();
        }
      },
      methods: {
        trackPageView() {
          if (gtag && this.$route) {
            gtag('config', 'G-1NB78H4XT3', {
              page_path: this.$route.fullPath,
              page_title: this.$route.name || 'Unknown Page'
            });
          }
        },
        trackEvent(eventName, parameters = {}) {
          if (gtag) {
            gtag('event', eventName, parameters);
          }
        }
      }
    });
  }
};