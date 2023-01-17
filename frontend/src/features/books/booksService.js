import axios from "axios";
import { WIFI } from "../../Constants";

const API_URL = `http://${WIFI}:5000/api/books/`;

//Get books
const getBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Get archived books
const getArchiveBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL+"/archive/", config);
  return response.data;
};

//Set books
const setBooks = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, book, config);
  return response.data;
};

//Set books
const deleteBooks = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + book._id, config);
  return response.data;
};

//Set books
const updateBooks = async (book, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + book._id,
    { ...book, archive: !book.archive },
    config
  );
  return response.data;
};

const booksService = {
  getBooks,
  getArchiveBooks,
  setBooks,
  deleteBooks,
  updateBooks,
};

export default booksService;
