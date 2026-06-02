import { init, track } from '@plausible-analytics/tracker'

export default {
  install(Vue) {
    init({
      domain: 'nuno.saavedra.pt',
      hashBasedRouting: true,
      bindToWindow: true,
    })

    Vue.prototype.$trackEvent = (eventName, options = {}) => {
      track(eventName, options)
    }
  },
}
