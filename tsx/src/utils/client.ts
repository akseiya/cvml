const getDefaultCV = async () => {
  const response = await fetch('/AuthorsResume.yaml');
  const cvText = await response.text();
  if (!cvText) throw 'AuthorsResume.yaml fetched empty';
  return cvText;
};

export const httpClient = {
  getDefaultCV
};
