export const regexPatterns = (type: string = ""): RegExp => {
  switch (type) {
    case "next":
      return /<([^?]+(?:\.com(?:[/?].*)?)?)>;\s*rel="next"/g;
    case "prev":
      return /<([^?]+(?:\.com(?:[/?].*)?)?)>;\s*rel="prev"/g;
    case "last":
      return /<([^?]+(?:\.com(?:[/?].*)?)?)>;\s*rel="last"/g;
    default:
      return /<([^?]+(?:\.com(?:[/?].*)?)?)>;\s*rel="next"/g;
  }
};
export const getNextLink = (
  headers: string = "",
  type: string = "next"
): string => {
  const linkArr: string[] = headers?.split(",");
  let re = regexPatterns(type)
  const regex = new RegExp(re);
  let nextLink = "";
  linkArr.forEach((e) => {
    if (regex.test(e.trim())) {
      nextLink = e?.split(";")?.[0];
    }
  });
  const trimmedLink = nextLink?.substring(1, nextLink?.length - 1) || "";
  return trimmedLink;
};
