/* eslint-disable import/prefer-default-export */
import http from "services/http";
import { DEPARTMENTS } from "../../../constants/endpoints";
import { departmenListMapper } from "./deparment.mapper";

export const getDepartments = async () => {
  const { data = {} } = await http.get(DEPARTMENTS);
  return departmenListMapper(data);
};
