/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/prop-types */
// @mui material components
import { Clear, Download, Save, UploadFile } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { URI_DOWNLOAD_SAMPLE_FILE } from "constants/endpoints";
import { useEffect, useState } from "react";
import {
  updateEmployees,
  bulkUploadEmployee,
  storeEmployees,
} from "services/apis/employees/employees";
import { clearForm } from "utils/form";
import { toastErrorAlert, toastWarningAlert, toastSuccessAlert } from "utils/sweet.alert.utils";

function OrdersOverview({ departments, reloadEmployee, edit }) {
  const [register, setRegister] = useState();
  const [isDisabled, setIsDisabled] = useState(!edit);

  const getPayload = () => ({
    name: document.getElementById("employee-name").value,
    lastName: document.getElementById("employee-lastName").value,
    department: document.getElementById("employee-department").value,
    identification: document.getElementById("employee-identification").value,
  });

  const clear = () => {
    const element = document.querySelector(".MuiAutocomplete-clearIndicator");
    if (element) element.click();
    document.getElementById("upload-file-employee").value = null;
    setIsDisabled(true);
    clearForm([
      "employee-name",
      "employee-lastName",
      "employee-department",
      "employee-identification",
    ]);
  };

  const handleEmployee = () => {
    const payload = getPayload();

    storeEmployees(payload)
      .then((resp) => {
        toastSuccessAlert(resp?.message);
        clear();
        setRegister(payload.lastName);
      })
      .catch((e) => {
        toastWarningAlert(e?.response?.data?.message);
      });
  };

  const handleEditEmployee = () => {
    const payload = getPayload();

    updateEmployees(payload)
      .then((resp) => {
        toastSuccessAlert(resp?.message);
        clear();
        setRegister(payload.lastName);
      })
      .catch((e) => {
        toastWarningAlert(e?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (edit) {
      document.getElementById("employee-name").value = edit?.name;
      document.getElementById("employee-department").value = edit?.department?.name;
      document.getElementById("employee-lastName").value = edit?.last_name;
      document.getElementById("employee-identification").value = edit?.id;
      setIsDisabled(false);
    }
  }, [edit]);

  useEffect(() => {
    reloadEmployee(register);
  }, [register]);

  const uploadFile = () => {
    const file = document.getElementById("upload-file-employee").files[0];
    const department = document.getElementById("employee-department").value;

    if (!department) {
      toastWarningAlert("Select department");
      return;
    }

    const departmentId = department?.split(":");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("id", departmentId[0]);

    bulkUploadEmployee(formData)
      .then((resp) => {
        toastSuccessAlert(resp?.message);
        reloadEmployee(file);
      })
      .catch((e) => {
        toastErrorAlert(e?.response?.data?.message);
      });
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" alignItems="center" lineHeight={0} sx={{ p: 2 }}>
        <MDTypography variant="h6" gutterBottom>
          {isDisabled ? "Register" : "Edit"} Employees
        </MDTypography>
      </MDBox>
      <MDBox alignItems="center" lineHeight={0} sx={{ p: 2 }}>
        <form>
          <TextField
            id="employee-name"
            label="Name"
            fullWidth
            sx={{ mb: 3 }}
            focused={!isDisabled}
          />
          <TextField
            id="employee-lastName"
            label="Last Name"
            fullWidth
            sx={{ mb: 3 }}
            focused={!isDisabled}
          />
          <TextField
            id="employee-identification"
            label="Identification"
            fullWidth
            focused={!isDisabled}
            sx={{ display: !isDisabled && "none", mb: 3 }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <Autocomplete
            disablePortal
            id="employee-department"
            size="medium"
            options={departments}
            sx={{ width: 330, pr: 1 }}
            renderInput={(params) => (
              <TextField focused={!isDisabled} {...params} label="Department" />
            )}
          />
          <Stack spacing={2} direction="row" sx={{ m: 8 }}>
            {isDisabled ? (
              <Button onClick={handleEmployee} variant="contained" style={{ color: "white" }}>
                <Save /> Save
              </Button>
            ) : (
              <Button onClick={handleEditEmployee} variant="contained" style={{ color: "white" }}>
                <Save /> Edit
              </Button>
            )}
            <Button onClick={clear} variant="outlined" style={{ color: "black" }}>
              <Clear />
              Clear
            </Button>
          </Stack>
        </form>
        <Stack spacing={2}>
          <TextField
            id="upload-file-employee"
            type="file"
            helperText="You can bulk upload users by CSV file"
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={uploadFile}
          >
            <UploadFile /> Bulk upload of users
          </Button>
          <a href={URI_DOWNLOAD_SAMPLE_FILE}>
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow", color: "black" }}
              fullWidth
            >
              <Download /> download sample file
            </Button>
          </a>
        </Stack>
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
