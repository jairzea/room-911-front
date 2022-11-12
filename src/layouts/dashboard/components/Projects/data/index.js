/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useState, useEffect } from "react";

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import {
  getEmployees,
  changeState,
  deleteEmployeeService,
} from "services/apis/employees/employees";
import { toastErrorAlert, toastSuccessAlert } from "utils/sweet.alert.utils";
import { mapper } from "utils/mapper";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, History } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function Data(reloadEmployee, filterEmployee, { handleEdit, handleIncomeRecord }) {
  const [row, setRow] = useState([]);
  const [newRow, setNewRow] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [employeData, setEmployeeData] = useState(false);

  useEffect(() => {
    getEmployees(filterEmployee)
      .then((resp) => {
        setRow(mapper(resp?.response));
      })
      .catch((e) => {
        toastErrorAlert(e?.response?.data?.message);
      });
  }, [reloadEmployee, employeData, filterEmployee]);

  useEffect(() => {
    if (confirmed) {
      changeState(confirmed)
        .then((resp) => {
          toastSuccessAlert(resp?.message);
          setEmployeeData(confirmed);
        })
        .catch((e) => {
          toastErrorAlert(e?.response?.data?.message);
        });
    }
  }, [confirmed]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Author = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const deleteEmployee = (id) => {
    deleteEmployeeService(id)
      .then((resp) => {
        toastSuccessAlert(resp?.message);
        setEmployeeData([resp?.message, id]);
      })
      .catch((e) => {
        toastErrorAlert(e?.response?.data?.message);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete the employee",
      showDenyButton: true,
      denyButtonText: `No`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
      }
    });
  };

  const handleState = (employe) => {
    Swal.fire({
      title: "You want to update the status of the employee",
      showDenyButton: true,
      denyButtonText: `No`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        setConfirmed(employe);
      }
    });
  };

  useEffect(async () => {
    // eslint-disable-next-line array-callback-return
    const array = row?.map((r, key) => ({
      id: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.identification}
        </MDTypography>
      ),
      fullname: <Author image={team2} name={`${r?.name} ${r?.last_name}`} id={r?.identification} />,
      status: (
        <MDBox ml={-1}>
          <Button onClick={() => handleState(r)}>
            <Tooltip title="Press change status" placement="top">
              <MDBadge
                badgeContent={r?.state ? "active" : "inactive"}
                color={r?.state ? "success" : "dark"}
                variant="gradient"
                size="sm"
              />
            </Tooltip>
          </Button>
        </MDBox>
      ),
      department: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {r?.department?.name}
        </MDTypography>
      ),
      access: (
        <Tooltip title="View access history" placement="top">
          <IconButton
            onClick={() => handleIncomeRecord(r?.income_record, `${r?.name} ${r?.last_name}`)}
            size="small"
            color="info"
            style={{ backgroundColor: "#eceaea9e", borderRadius: 8 }}
          >
            {r?.income_record?.length}
            <History />
          </IconButton>
        </Tooltip>
      ),
      action: (
        <>
          <Tooltip title="Press edit employee" placement="top">
            <IconButton
              onClick={() => handleEdit(r)}
              size="small"
              color="success"
              style={{ backgroundColor: "#eceaea9e" }}
              sx={{ mr: 1 }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Press remove employee" placement="top">
            <IconButton
              onClick={() => handleDelete(r?.id)}
              size="small"
              color="error"
              style={{ backgroundColor: "#eceaea9e" }}
              sx={{ mr: 1 }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ),
      label: `${r?.last_name}:${r?.identification}`,
      index: key,
    }));
    setNewRow(await array);
  }, [row]);

  return {
    columns: [
      { Header: "Employee ID", accessor: "id", width: "20%", align: "left" },
      { Header: "Fullname", accessor: "fullname", width: "45%", align: "left" },
      { Header: "status", accessor: "status", width: "45%", align: "left" },
      { Header: "Deparment", accessor: "department", align: "center" },
      { Header: "total access", accessor: "access", align: "center" },
      { Header: "actions", accessor: "action", align: "center" },
    ],
    rows: newRow,
  };
}
