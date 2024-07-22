const GEO_API_URL = 'https://nominatim.openstreetmap.org/search';

export const getGeolocation = async (location) => {
  try {
    const response = await fetch(`${GEO_API_URL}?q=${encodeURIComponent(location)}&format=json`);
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw error;
  }
};
