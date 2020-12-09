import axios from 'axios';

export const getBoards = async () => {
  const response = await axios.get('http://localhost:4000/boards');
  return response.data;
};

export const addBoard = async board => {
  const response = await axios.post('http://localhost:4000/boards', board);
  return response.data;
};
