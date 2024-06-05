document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit");
  const addressInput = document.getElementById("address");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");
  const errorMessage = document.getElementById("error-message");
  getLocation();
  const currentTimezoneName = document.getElementById("current-timezone-name");
  const currentLat = document.getElementById("current-lat");
  const currentLong = document.getElementById("current-long");
  const currentOffsetStd = document.getElementById("current-offset-std");
  const currentOffsetStdSeconds = document.getElementById(
    "current-offset-std-seconds"
  );
  const currentOffsetDst = document.getElementById("current-offset-dst");
  const currentOffsetDstSeconds = document.getElementById(
    "current-offset-dst-seconds"
  );
  const currentCountry = document.getElementById("current-country");
  const currentPostcode = document.getElementById("current-postcode");
  const currentCity = document.getElementById("current-city");

  const resultTimezoneName = document.getElementById("result-timezone-name");
  const resultLat = document.getElementById("result-lat");
  const resultLong = document.getElementById("result-long");
  const resultOffsetStd = document.getElementById("result-offset-std");
  const resultOffsetStdSeconds = document.getElementById(
    "result-offset-std-seconds"
  );
  const resultOffsetDst = document.getElementById("result-offset-dst");
  const resultOffsetDstSeconds = document.getElementById(
    "result-offset-dst-seconds"
  );
  const resultCountry = document.getElementById("result-country");
  const resultPostcode = document.getElementById("result-postcode");
  const resultCity = document.getElementById("result-city");

  // getting current location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    console.log(position);
    currentLat.innerHTML += position.coords.latitude;
    currentLong.innerHTML += position.coords.longitude;
    fetchTimezone(position.coords.latitude, position.coords.longitude);
  }

  async function fetchTimezone(lat, lon) {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=41fd50fa61c444b5ab15c1501f0abfd1`;

    const response = await fetch(url);
    const data = await response.json();
    const timezone = data;
    currentTimezoneName.innerHTML = timezone.results[0].timezone.name;
    console.log(timezone);
    currentOffsetDst.innerHTML = timezone.results[0].timezone.offset_DST;
    currentOffsetDstSeconds.innerHTML =
      timezone.results[0].timezone.offset_DST_seconds;
    currentOffsetStd.innerHTML = timezone.results[0].timezone.offset_STD;
    currentOffsetStdSeconds.innerHTML =
      timezone.results[0].timezone.offset_STD_seconds;
    currentCountry.innerHTML = timezone.results[0].country;
    currentPostcode.innerHTML = timezone.results[0].postcode;
    currentCity.innerHTML = timezone.results[0].city;
  }
  submitButton.addEventListener("click", async function(e) {
    e.preventDefault();
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressInput.value)}&format=json`;
      
      try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (data && data.length > 0) {
              const { lat, lon } = data[0];
              let a =  { latitude: lat, longitude: lon };
              console.log(a);
              display(a.latitude, a.longitude);
          } else {
              return { latitude: null, longitude: null };
          }
      } catch (error) {
          console.error('Error fetching data:', error);
          return { latitude: null, longitude: null };
      }
  })
   async function display(latitude, longitude) {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=41fd50fa61c444b5ab15c1501f0abfd1`;

    const response = await fetch(url);
    const data = await response.json();
    const timezone = data;

    resultDiv.style.display = "block";
    errorDiv.style.display = "none";
    resultTimezoneName.innerHTML = timezone.results[0].timezone.name;
    resultLat.innerHTML = latitude;
    resultLong.innerHTML = longitude;
    resultOffsetDst.innerHTML = timezone.results[0].timezone.offset_DST;
    resultOffsetDstSeconds.innerHTML =  timezone.results[0].timezone.offset_DST_seconds;
    resultOffsetStd.innerHTML =timezone.results[0].timezone.offset_STD;
    resultOffsetStdSeconds.innerHTML =timezone.results[0].timezone.offset_STD_seconds;
    resultCountry.innerHTML =  timezone.results[0].country;
    resultPostcode.innerHTML = timezone.results[0].postcode;
    resultCity.innerHTML =  timezone.results[0].city;
  }
});
