import axios from 'axios';

export const getPasswd = async () => {
  const response = await axios.get('http://localhost:4000/sessions/passwd');
  return response.data;
};
