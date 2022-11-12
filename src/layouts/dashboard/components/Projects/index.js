/* eslint-disable react/prop-types */
// @mui material components
import { FileDownloadSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Filter from "components/commons/Filter";
// eslint-disable-next-line import/no-unresolved

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { URI_DOWNLOAD_INCOME_RECORD } from "constants/endpoints";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import { useEffect, useState } from "react";
import { getEmployeesList } from "services/apis/employees/employees";
import { toastErrorAlert } from "utils/sweet.alert.utils";

import "./styles.css";

function Projects({
  departments,
  reloadEmployee = false,
  editEmployee,
  seeHistory,
  filterDateRange,
}) {
  const [filterEmployee, setFilterEmployee] = useState(false);
  const [optionsEmployee, setOptionsEmployee] = useState([]);
  const handleEdit = (employee) => editEmployee(employee);
  const handleIncomeRecord = (history, fullName) => seeHistory(history, fullName);
  const handleRange = (dateRange) => filterDateRange(dateRange);
  const handleFilter = (filters) => setFilterEmployee(filters);

  const { columns, rows } = data(reloadEmployee, filterEmployee, {
    handleEdit,
    handleIncomeRecord,
  });

  useEffect(() => {
    getEmployeesList()
      .then((resp) => {
        setOptionsEmployee(resp);
      })
      .catch((e) => {
        toastErrorAlert(e?.response?.data?.message);
      });
  }, []);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox style={{ width: "100%" }}>
          <MDTypography variant="h6" gutterBottom style={{ width: "100%" }}>
            Employees
            <a href={URI_DOWNLOAD_INCOME_RECORD} style={{ float: "right" }}>
              <Button variant="contained" style={{ backgroundColor: "yellow", color: "black" }}>
                <FileDownloadSharp /> download income record
              </Button>
            </a>
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <Filter
          departments={departments}
          employee={optionsEmployee}
          handleRange={handleRange}
          handleFilter={handleFilter}
        />
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
