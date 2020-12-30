async function getNasaImg() {
  let key = apis.nasa;
  console.log(key);
  const response = await axios.get(
    'https://api.nasa.gov/planetary/apod?' + key
  );
  console.log(response);
  const nasaDiv = document.querySelector('#nasa');
  const videoSource = document.querySelector('#video');
  if (response.data.media_type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'nasa-video');
    iframe.setAttribute('src', response.data.url);
    nasaDiv.append(iframe);
  } else {
    const image = document.createElement('img');
    image.setAttribute('id', 'nasa-image');
    image.setAttribute('class', 'img-thumbnail rounded mx-auto d-block');
    image.setAttribute('src', response.data.url);
    nasaDiv.append(image);
  }
  const description = document.querySelector('#description');
  description.innerText = response.data.title;
}

getNasaImg();
