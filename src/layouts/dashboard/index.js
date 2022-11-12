import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { getDepartments } from "services/apis/departments/departments.service";
import { toastWarningAlert } from "utils/sweet.alert.utils";
import DataTable from "examples/Tables/DataTable";
import Data from "./data";

function Dashboard() {
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState(false);
  const [infoEmployee, setInfoEmployee] = useState(false);
  const [history, setHistory] = useState(false);
  const [range, setRange] = useState(false);
  const [successSB, setSuccessSB] = useState(false);

  const { columns, rows } = Data(history?.info, range);

  const closeSuccessSB = () => {
    setSuccessSB(false);
    setHistory(false);
  };

  useEffect(() => {
    getDepartments()
      .then((resp) => {
        setDepartments(resp);
      })
      .catch((error) => {
        toastWarningAlert(error?.response?.data?.message);
      });
  }, []);

  const reloadEmployee = (value) => setEmployee(value);
  const editEmployee = (info) => setInfoEmployee(info);
  const seeHistory = (info, fullName) => setHistory({ info, fullName });
  const filterDateRange = (dateRange) => setRange(dateRange);

  useEffect(() => {
    setSuccessSB(history);
  }, [history]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects
                departments={departments}
                reloadEmployee={employee}
                editEmployee={editEmployee}
                seeHistory={seeHistory}
                filterDateRange={filterDateRange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} style={{ height: "10%" }}>
              <OrdersOverview
                departments={departments}
                reloadEmployee={reloadEmployee}
                edit={infoEmployee}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MDSnackbar
                color="success"
                icon="history"
                title="Record History"
                style={{
                  boxShadow: "2px 1px 20px 10px rgba(0,0,0,0.3)",
                }}
                content={
                  <DataTable
                    table={{ columns, rows }}
                    showTotalEntries={false}
                    isSorted={false}
                    noEndBorder
                    entriesPerPage={false}
                  />
                }
                dateTime={history?.fullName ?? ""}
                open={Boolean(successSB)}
                onClose={closeSuccessSB}
                close={closeSuccessSB}
                bgWhite
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
