/* eslint-disable import/prefer-default-export */
import http from "services/http";
import { EMPLOYEES, BULK_UPLOAD_EMPLOYEES } from "../../../constants/endpoints";
import { employeeListMapper } from "./employees.mapper";

export const getEmployees = async ({ department = "", employeeId = "" }) => {
  const departmentId = department?.split(":");
  const id = employeeId?.split(":");

  let queryString = "";
  let uri = EMPLOYEES;

  if (departmentId[0]) {
    queryString = `?department=${departmentId[0]}`;
    uri += queryString;
  }

  if (id[1]) {
    if (departmentId[0]) {
      queryString += `&id=${id[1]}`;
    } else {
      queryString += `?id=${id[1]}`;
    }

    uri += queryString;
  }

  const { data = {} } = await http.get(uri);
  return data;
};

export const getEmployeesList = async () => {
  const { data = {} } = await http.get(EMPLOYEES);
  return employeeListMapper(data);
};

export const storeEmployees = async ({ name, lastName, identification, department }) => {
  const departmentId = department?.split(":");
  const payload = {
    name,
    last_name: lastName,
    identification,
    id: departmentId[0],
  };
  const { data = {} } = await http.post(EMPLOYEES, payload);
  return data;
};

export const updateEmployees = async ({ name, lastName, identification, department }) => {
  const departmentId = department?.split(":");
  const payload = {
    name,
    last_name: lastName,
    id: departmentId[0],
  };
  const { data = {} } = await http.put(`${EMPLOYEES}/${identification}`, payload);
  return data;
};

export const changeState = async (pay) => {
  const payload = {
    state: pay?.state ? 0 : 1,
  };
  const { data = {} } = await http.patch(`${EMPLOYEES}/${pay?.id}`, payload);
  return data;
};

export const bulkUploadEmployee = async (formData) => {
  const { data = {} } = await http.post(BULK_UPLOAD_EMPLOYEES, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteEmployeeService = async (id) => {
  const { data = {} } = await http.delete(`${EMPLOYEES}/${id}`);
  return data;
};
