import axios from 'axios';

const getDefaultCV = async () => {
  const response = await axios.get('/AuthorsResume.yaml');
  
  return response;
};

// eslint-disable-next-line one-var
export default {
  getDefaultCV
};