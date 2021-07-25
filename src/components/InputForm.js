import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Button, Grid, TextField, Box } from "@material-ui/core/";

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
  // container{
  //   borderRadius:"4px 4px 0 0",
  //   box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
  // }
}));

export default function InputForm(prop) {
  
}
