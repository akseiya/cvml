import axios from 'axios';

const getDefaultCV = () => axios.get('/AuthorsResume.yaml');

export const httpClient = {
  getDefaultCV
};
