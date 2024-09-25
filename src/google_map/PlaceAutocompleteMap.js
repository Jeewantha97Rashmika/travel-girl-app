import React, { useState, useEffect, useRef } from 'react';


const loadGoogleMapsScript = (callback) => {
  const existingScript = document.getElementById('google-maps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@googlemaps/extended-component-library@0.6';
    script.id = 'google-maps';
    document.body.appendChild(script);
    script.onload = () => callback();
  } else {
    callback();
  }
};

const PlaceAutocompleteMap = () => {
  const [map, setMap] = useState(null);
  const [placePicker, setPlacePicker] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [strictBounds, setStrictBounds] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const placePickerRef = useRef(null);
  const infowindowRef = useRef(null);

  // Initialize the map, place picker, and infowindow
  useEffect(() => {
    loadGoogleMapsScript(() => {
      const gmpMap = document.querySelector('gmp-map');
      const placePickerElement = document.getElementById('place-picker');
      const markerElement = document.getElementById('marker');
      const infowindowContent = document.getElementById('infowindow-content');
      const infowindowInstance = new window.google.maps.InfoWindow();
      const markerInstance = document.getElementById('marker');

      setMap(gmpMap);
      setPlacePicker(placePickerElement);
      setMarker(markerElement);
      setInfowindow(infowindowInstance);

      gmpMap.innerMap.setOptions({ mapTypeControl: false });

      placePickerElement.addEventListener('gmpx-placechange', () => {
        const place = placePickerElement.value;
        handlePlaceChange(place, markerElement, gmpMap, infowindowInstance, infowindowContent);
      });
    });
  }, []);

  const handlePlaceChange = (place, marker, map, infowindow, infowindowContent) => {
    if (!place.location) {
      window.alert("No details available for input: '" + place.name + "'");
      infowindow.close();
      marker.position = null;
      return;
    }

    if (place.viewport) {
      map.innerMap.fitBounds(place.viewport);
    } else {
      map.center = place.location;
      map.zoom = 17;
    }

    marker.position = place.location;
    infowindowContent.children['place-name'].textContent = place.displayName;
    infowindowContent.children['place-address'].textContent = place.formattedAddress;
    infowindow.open(map.innerMap, marker);
  };

  const handleStrictBoundsChange = () => {
    setStrictBounds(!strictBounds);
    placePicker.strictBounds = !strictBounds;
  };

  return (
    <div>
      <div className="pac-card">
        <div id="title">Autocomplete search</div>
        <div className="pac-controls">
          <input type="radio" name="type" id="changetype-all" defaultChecked />
          <label htmlFor="changetype-all">All</label>
          <input type="radio" name="type" id="changetype-establishment" />
          <label htmlFor="changetype-establishment">establishment</label>
          <input type="radio" name="type" id="changetype-address" />
          <label htmlFor="changetype-address">address</label>
          <input type="radio" name="type" id="changetype-geocode" />
          <label htmlFor="changetype-geocode">geocode</label>
          <input type="radio" name="type" id="changetype-cities" />
          <label htmlFor="changetype-cities">(cities)</label>
          <input type="radio" name="type" id="changetype-regions" />
          <label htmlFor="changetype-regions">(regions)</label>
        </div>
        <br />
        <div className="pac-controls">
          <input type="checkbox" id="use-strict-bounds" onChange={handleStrictBoundsChange} />
          <label htmlFor="use-strict-bounds">Restrict to map viewport</label>
        </div>
        <gmpx-place-picker id="place-picker" for-map="map"></gmpx-place-picker>
      </div>

      <gmp-map ref={mapRef} id="map" center="40.749933,-73.98633" zoom="13" map-id="DEMO_MAP_ID">
        <gmp-advanced-marker id="marker" ref={markerRef}></gmp-advanced-marker>
      </gmp-map>

      <div id="infowindow-content" ref={infowindowRef} style={{ display: 'none' }}>
        <span id="place-name" className="title" style={{ fontWeight: 'bold' }}></span><br />
        <span id="place-address"></span>
      </div>
    </div>
  );
};

export default PlaceAutocompleteMap;
