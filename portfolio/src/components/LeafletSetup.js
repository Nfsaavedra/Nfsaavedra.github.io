import 'leaflet/dist/leaflet.css';

import {Icon} from 'leaflet';

// Fix Leaflet default icon issues
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LeafletSetup = {};

export default LeafletSetup;