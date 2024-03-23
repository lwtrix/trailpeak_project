// SHARED JS UTILS/FUNCTIONS

const handleSearch = async (submitBtn, renderTarget) => {
  const searchInput = document.querySelector(`#${submitBtn}`);

  const coords = await fetchCoordinates(searchInput.value);
  const { data } = await fetchTrails(coords.lat, coords.lon);

  if (!renderTarget) {
    console.log(data);
    return;
  }

  const renderBlock = document.querySelector(`#${renderTarget}`);
  renderBlock.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    renderBlock.innerHTML += `
    <div class="trail-card-item">
      <div class="thumbnail-container">
        <img src="${
          data[i].thumbnail
            ? data[i].thumbnail
            : './images/trail-thumbnail-placeholder.jpg'
        }" alt="">
      </div>
      <div class="details-container">
        <span class="location">${data[i].city}, ${data[i].country}</span>
        <h3 class="name">${data[i].name}</h3>
        <p class="description">${data[i].description}</p>
        <span class="difficulty">${
          data[i].difficulty ? data[i].difficulty : 'Unknown'
        }</span>
      </div>
    </div>
    `;
  }
};

const fetchCoordinates = async (address) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c6cedd9129msh0e8dc07501b8cb0p17b8a6jsn5e9de941d591',
      'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com',
    },
  };

  const url = `https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=${address}`;

  try {
    const res = await fetch(url, options);
    const { Results } = await res.json();

    return { lat: Results[0].latitude, lon: Results[0].longitude };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const fetchTrails = async (lat, lon, radius = 50) => {
  const url = `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lon}&radius=${radius}`;

  const config = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c6cedd9129msh0e8dc07501b8cb0p17b8a6jsn5e9de941d591',
      'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
    },
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
