
    mapboxgl.accessToken = 'pk.eyJ1IjoidHN0ZWZhbnkiLCJhIjoiY200c3YzZXA4MDUwZTJxcHdma2QzOWo3ZiJ9.mbKRwwEt1cMCip3bwjIlQg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/tstefany/cm4sww2el003n01qw7j24g026/draft',
  center: [-75.5, 10.5],
  zoom: 6
});

// Función para resaltar una capa
function highlightLayer(layerId) {
  const layers = [
    'Zonas quemadas -zq-',
    'Cesar',
    'Planta de Tratamiento',
    'Explotacion minera -em-',
    'MC',
    'MPC',
    'MCPE',
    'Hotspot -ht-',
    'PastosE1',
    'Tierras degradadas -td-'
  ];

  layers.forEach((layer) => {
    if (map.getLayer(layer)) {
      const layerType = map.getLayer(layer).type;
      if (layerType === 'fill') {
        map.setPaintProperty(layer, 'fill-opacity', layer === layerId ? 0.8 : 0.2);
      } else if (layerType === 'line') {
        map.setPaintProperty(layer, 'line-opacity', layer === layerId ? 0.8 : 0.2);
      } else if (layerType === 'symbol') {
        map.setPaintProperty(layer, 'icon-opacity', layer === layerId ? 0.8 : 0.2);
      }
    }
  });
}

// Añadir evento de clic a los elementos de la leyenda
document.querySelectorAll('.legend div').forEach((element) => {
  element.addEventListener('click', () => {
    const layerId = element.getAttribute('data-layer');
    if (layerId) {
      highlightLayer(layerId);
    }
  });
});

// Asegurarse de que las capas están cargadas antes de modificar propiedades
map.on('load', () => {
  const layers = [
    'Zonas quemadas -zq-',
    'Cesar',
    'Planta de Tratamiento',
    'Explotacion minera -em-',
    'MC',
    'MPC',
    'MCPE',
    'Hotspot -ht-',
    'PastosE1',
    'Tierras degradadas -td-'
  ];

  layers.forEach((layer) => {
    if (map.getLayer(layer)) {
      const layerType = map.getLayer(layer).type;
      if (layerType === 'fill') {
        map.setPaintProperty(layer, 'fill-opacity', 0.1);
      } else if (layerType === 'line') {
        map.setPaintProperty(layer, 'line-opacity', 0.1);
      } else if (layerType === 'symbol') {
        map.setPaintProperty(layer, 'icon-opacity', 0.1);
      }
    } else {
      console.warn(`La capa "${layer}" no existe en el mapa.`);
    }
  });
});
