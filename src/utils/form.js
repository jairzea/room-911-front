/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
export const clearForm = (ids) => {
  // eslint-disable-next-line no-return-assign
  ids.map((id) => (document.getElementById(id).value = ""));
};

export const buildPayload = (ids) => {
  // eslint-disable-next-line no-return-assign
  const payload = ids?.map((id) => ({
    id: document.getElementById(id).value,
  }));
  return payload;
};

export const setValue = (elements) => {
  elements.map((element) => (document.getElementById(element?.id).value = element?.value));
};
