export const baseURL = "https://api.github.com";

export const getApi = async (endPoint = "", needHeaders = false) => {
   // In order to increase the rate per limit of API we can pass the PERSONAL ACCESS TOKEN of the Github profile
    const token = process.env.AccessToken
  return await fetch(baseURL + endPoint, {
    method: "GET",
   ...(token) && {headers: {
      'Authorization' : `Bearer ${token}`
    }}
  })
    .then(async (res) =>{
      if (needHeaders) return { data: await res?.json(), headers: res?.headers?.get('Link')};
      else return res.json()
    } )
    .catch((err) => {
        
      console.log(err);
    });
};
