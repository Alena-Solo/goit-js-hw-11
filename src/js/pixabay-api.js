const API_KEY = '46892237-a54e01ec2b73ea1c4de56cebe';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1, perPage = 20) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.hits)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
