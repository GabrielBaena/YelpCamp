mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: campground.geometry.coordinates,
  zoom: 10,
})
new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 20 }).setHTML(
      `<h3 class='mt-2'>${campground.title}</h3><p>${campground.location}</p>`,
    ),
  )
  .addTo(map)

map.addControl(new mapboxgl.NavigationControl())
