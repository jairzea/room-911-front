/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
// eslint-disable-next-line import/prefer-default-export
export const mapper = (data) => {
  const key = data?.["_rel"];
  data = data?.["_embedded"][key];
  return data;
};
