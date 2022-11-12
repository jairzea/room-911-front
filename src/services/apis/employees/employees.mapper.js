import { mapper } from "utils/mapper";

// eslint-disable-next-line import/prefer-default-export
export const employeeListMapper = (data) =>
  mapper(data?.response)?.map((employee) => ({
    label: `${employee?.last_name}:${employee?.identification}`,
    value: employee?.identification,
  }));
