/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// @mui material components
import { CleaningServices, FilterAlt } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";

import MDBox from "components/MDBox";
import moment from "moment";
import { clearForm } from "utils/form";

function Filter({ departments, employee, handleRange, handleFilter }) {
  const [value, setValue] = useState([null, null]);

  useEffect(() => {
    if (value[0] && value[1]) {
      const initialDate = moment(value[0]?.$d).format("Y-M-DD");
      const finallDate = moment(value[1]?.$d).format("Y-M-DD");
      handleRange([initialDate, finallDate]);
    } else {
      clearForm(["filter-employee", "filter-department"]);
    }
  }, [value]);

  const clear = async () => {
    const element1 = await document.querySelector(".MuiAutocomplete-clearIndicator");
    if (element1) element1.click();
    const element2 = await document.querySelector(".MuiAutocomplete-clearIndicator");
    if (element2) element2.click();
    handleRange(false);
    setValue([null, null]);
    handleFilter(false);
  };

  const filterEmployee = () => {
    const employeeId = document.getElementById("filter-employee").value;
    const department = document.getElementById("filter-department").value;
    handleFilter({ employeeId, department });
  };

  return (
    <MDBox display="flex" alignItems="center" lineHeight={0} sx={{ p: 2 }}>
      <Autocomplete
        id="filter-employee"
        size="medium"
        options={employee}
        sx={{ width: 200, pr: 1 }}
        renderInput={(params) => <TextField {...params} label="Employee ID" />}
      />
      <Autocomplete
        disablePortal
        id="filter-department"
        size="medium"
        options={departments}
        sx={{ width: 200, pr: 1 }}
        renderInput={(params) => <TextField {...params} label="Department" />}
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: "Initial access date", end: "Final acces date" }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField id="filter-initial" {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField id="filter-final" {...endProps} sx={{ pr: 1 }} />
            </>
          )}
        />
      </LocalizationProvider>
      <IconButton
        color="info"
        style={{ backgroundColor: "#eceaea9e" }}
        sx={{ mr: 1 }}
        onClick={filterEmployee}
      >
        <FilterAlt />
      </IconButton>
      <IconButton color="error" style={{ backgroundColor: "#eceaea9e" }} onClick={clear}>
        <CleaningServices />
      </IconButton>
    </MDBox>
  );
}

export default Filter;
