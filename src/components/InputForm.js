import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Button, Grid, TextField } from "@material-ui/core/";

import DatePicker from "./DatePicker";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InputForm(prop) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const clearState = (e) => {
    e.preventDefault();
    setTitle("");
    setTitle("");
    setDescription("");
    setDate("");
  };

  const weathers = [
    {
      value: "Sunny",
      label: "$",
    },
    {
      value: "Cloudy",
      label: "€",
    },
    {
      value: "Rainy",
      label: "฿",
    },
    {
      value: "Snowy",
      label: "¥",
    },
  ];

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={6}>
            <TextField
              required
              id="entry-title-required"
              label="Required"
              defaultValue="Hello World"
              variant="outlined"
              helperText="Please pick a title for your entry"
            />
            <TextField
              id="standard-select-weather"
              select
              label="Select"
              value={weather}
              variant="outlined"
              helperText="Please select the weather around you"
            >
              {weathers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker name="date" label="Date" value={date} />

            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              variant="outlined"
            />

            <Button
              onClick={clearState}
              className={classes.margin}
              variant="contained"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
