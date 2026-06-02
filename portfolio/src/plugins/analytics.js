import { init, track } from '@plausible-analytics/tracker'

import router from '../router'

const PLAUSIBLE_DOMAIN = 'nuno.saavedra.pt'

export default {
  install(Vue) {
    const isDev = process.env.NODE_ENV !== 'production'

    init({
      domain: PLAUSIBLE_DOMAIN,
      hashBasedRouting: true,
      autoCapturePageviews: false,
      bindToWindow: true,
      logging: isDev,
      captureOnLocalhost: isDev,
    })

    const trackPageview = () => {
      track('pageview', { url: window.location.href })
    }

    router.onReady(trackPageview)
    router.afterEach(trackPageview)

    Vue.prototype.$trackEvent = (eventName, options = {}) => {
      track(eventName, options)
    }
  },
}
