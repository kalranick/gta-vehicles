import React from 'react';
import mapImage from '../images/gta5-map.png';

function Map() {
  return (
    <div className="map-page">
      <img src={mapImage} alt="Map" />
      <span
        className="map-icon-label"
        style={{ left: '51.6%', top: '36.5%' }}
        data-tooltip="3 Alta St. Tower, Apt 10"
      />
    </div>
  );
}

export default Map;
