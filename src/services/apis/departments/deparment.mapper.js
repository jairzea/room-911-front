// eslint-disable-next-line import/prefer-default-export
export const departmenListMapper = (data) =>
  data?.department?.map((dep) => ({
    label: `${dep?.id}:${dep?.name}`,
    value: dep?.id,
    ...dep,
  }));
