import axios from "axios";
import { WIFI } from "../../Constants";

const API_URL = `http://${WIFI}:5000/api/movies/`;

//Get movies
const getMovies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Get archive movies
const getArchiveMovies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/archive/", config);
  return response.data;
};

//Set movies
const setMovies = async (movie, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, movie, config);
  return response.data;
};

//Set movies
const deleteMovies = async (movie, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + movie._id, config);
  return response.data;
};

//Set movies
const updateMovies = async (movie, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + movie._id,
    { ...movie, archive: !movie.archive },
    config
  );
  return response.data;
};

const moviesService = {
  getMovies,
  getArchiveMovies,
  setMovies,
  deleteMovies,
  updateMovies,
};

export default moviesService;
