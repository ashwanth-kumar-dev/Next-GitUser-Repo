export const baseURL = "https://api.github.com";

export const getApi = async (endPoint = "") => {
    
  return await fetch(baseURL + endPoint, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
        
      console.log(err);
    });
};
