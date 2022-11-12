/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";

// @mui material components
import MDTypography from "components/MDTypography";

export default function Data(history, range) {
  const [row, setRow] = useState([]);

  useEffect(async () => {
    // eslint-disable-next-line array-callback-return
    if (!history) {
      return;
    }

    let filterHistory = history;

    if (range) {
      filterHistory = history.filter(
        (income) => income.date >= range[0] && income.date <= range[1]
      );
    }

    const array = filterHistory?.map((r, key) => ({
      id: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.id}
        </MDTypography>
      ),
      employee: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.employee_identification}
        </MDTypography>
      ),
      date: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.date}
        </MDTypography>
      ),
      hour: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.hour}
        </MDTypography>
      ),
      state: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.state}
        </MDTypography>
      ),

      index: key,
    }));

    setRow(await array);
  }, [history]);

  return {
    columns: [
      { Header: "ID", accessor: "id", width: "20%", align: "left" },
      { Header: "Employee ID", accessor: "employee", width: "45%", align: "left" },
      { Header: "date", accessor: "date", width: "45%", align: "left" },
      { Header: "hour", accessor: "hour", align: "center" },
      { Header: "state", accessor: "state", align: "center" },
    ],
    rows: row,
  };
}
