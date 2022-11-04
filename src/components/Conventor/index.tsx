import React from "react";

import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  ListSubheader,
} from "@mui/material";

import ss from "./Conventor.module.scss";

type ConventorProps = {};

export const Conventor: React.FC<ConventorProps> = () => {
  return (
    <div className={ss.conventor}>
      <div className="container">
        <Typography className={ss.title} align="center" variant="h5">
          Калькулятор и конвертер криптовалют
        </Typography>

        <TextField
          className={ss.input}
          id="outlined-basic"
          placeholder="Введите сумму..."
          variant="outlined"
          fullWidth
        />
        <Grid className={ss.flex} container>
          <Grid xs={5.36} md={5.36}>
            <FormControl className={ss.select} variant="filled" fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="Option 1"
                className={ss.list}
              >
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader></ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={1.23} md={1.23}>
            <IconButton className={ss.btn} aria-label="delete">
              <svg
                width="32"
                height="27"
                viewBox="0 0 32 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.29984 6.70037H26.4342L24.1007 8.88806C23.5929 9.36411 23.5929 10.1365 24.1007 10.6125C24.6089 11.0886 25.4323 11.0886 25.9406 10.6125L30.4903 6.34716C30.7342 6.11848 30.8716 5.8082 30.8716 5.48473C30.8716 5.16126 30.7342 4.85141 30.4903 4.62273L25.9406 0.357361C25.4323 -0.11912 24.6089 -0.11912 24.1007 0.357361C23.5929 0.833418 23.5929 1.60534 24.1007 2.08183L26.4342 4.26321H1.29984C0.581672 4.26321 0 4.80897 0 5.4818C0 6.15508 0.581695 6.7004 1.29984 6.7004V6.70037Z"
                  fill="white"
                />
                <path
                  d="M29.951 20.1061H4.76444L7.09124 17.9248V17.9243C7.59949 17.4483 7.59949 16.6764 7.09124 16.1999C6.58345 15.7238 5.7596 15.7238 5.25181 16.1999L0.702087 20.4652C0.457708 20.6939 0.320785 21.0042 0.320785 21.3277C0.320785 21.6511 0.457708 21.9614 0.702087 22.1901L5.25181 26.4555C5.7596 26.9315 6.58345 26.9315 7.09124 26.4555C7.59949 25.979 7.59949 25.207 7.09124 24.731L4.75806 22.5433H29.9505C30.6682 22.5433 31.2503 21.9975 31.2503 21.3247C31.2503 20.6514 30.6681 20.1061 29.9505 20.1061L29.951 20.1061Z"
                  fill="white"
                />
              </svg>
            </IconButton>
          </Grid>

          <Grid xs={5.36} md={5.36}>
            <FormControl className={ss.select} variant="filled" fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="Option 1"
                className={ss.list}
              >
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader></ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography className={ss.result} align="center" variant="h5">
          1 Bitcoin (BTC) = 20,272.77 United States Dollar (USD)
        </Typography>
      </div>
    </div>
  );
};
