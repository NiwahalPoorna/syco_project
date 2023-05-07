import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function EditStaff() {
  const classes = useStyles();

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm();

  const { _id } = useParams();
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    async function fetchBusData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/staff/staff-emp/${_id}`
        );
        const data = response.data;
        setStaffData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBusData();
  }, [_id]);

  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.put(
        `http://localhost:3000/staff/staff-emp/${_id}`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        // Redirect to bus list page or show success message
        alert("Staff member  updated successfully.");
        navigate("/dashboard/staff"); // Redirect to bus list page
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Staff Registration
        </Typography>
        {staffData ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="staffId"
                  control={control}
                  defaultValue={staffData.staffId}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Sraff ID"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={staffData.name}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="nic"
                  control={control}
                  defaultValue={staffData.nic}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="NIC"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="position"
                  control={control}
                  defaultValue={staffData.position}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Position"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue={staffData.phoneNumber}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={staffData.email}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ADD Staff
            </Button>
          </form>
        ) : (
          <p>Loading bus data...</p>
        )}
      </div>
    </Container>
  );
}

export default EditStaff;
