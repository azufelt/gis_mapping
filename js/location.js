// center Map View on specific location
//get geolocation
//check if browser supports geolocation


const message = document.querySelector('#message');

window.addEventListener('load', () => {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

// check if the Geolocation API is supported
if (!navigator.geolocation) {
  message.textContent = `Your browser doesn't support Geolocation`;
  message.classList.add('error');
}

// handle success case
function onSuccess(position) {
  const {
    latitude,
    longitude
  } = position.coords;

  console.log(`Your location: (${latitude},${longitude})`);
}
// handle error case
function onError() {
  console.log('error');
};