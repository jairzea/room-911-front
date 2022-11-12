/* eslint-disable import/prefer-default-export */
import http from "services/http";
import { ENTRY_ROOM_911 } from "../../../constants/endpoints";

export const entryRoom911 = async (identification) => {
  const payload = {
    identification,
  };
  const { data = {} } = await http.post(ENTRY_ROOM_911, payload);
  return data;
};
