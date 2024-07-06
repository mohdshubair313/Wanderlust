mapboxgl.accessToken = maptoken;
const coordinates = listing.geometry.coordinates;

if (Array.isArray(coordinates) && coordinates.length === 2 && 
    typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    
    const map = new mapboxgl.Map({
        container: 'map',
        center: listing.geometry.coordinates,
        zoom: 9
    });

    var popup = new AnimatedPopup({
        offset: 25,
        openingAnimation: {
            duration: 1000,
            easing: 'easeInOutElastic',
            transform: 'scale'
        },
        closingAnimation: {
            duration: 600,
            easing: 'easeInOutElastic',
            transform: 'scale'
        }
    }).setText(`${listing.title}`);

    const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(popup)
        .addTo(map);
} else {
    console.error('Invalid coordinates:', listing.geometry.coordinates);
}
