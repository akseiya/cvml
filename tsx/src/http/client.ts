import axios from 'axios';

const getDefaultCV = () => axios.get('/AuthorsResume.yaml');

// eslint-disable-next-line one-var
export default {
  getDefaultCV,
};
