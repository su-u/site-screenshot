const urlToFileName = (url: string) =>{
  const s1 = url.replace(new RegExp('(http://)|(https://)'), '');
  const result = s1.split('/').join('-');
  return result;
};

export default urlToFileName;