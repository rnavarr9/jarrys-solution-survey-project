import React from "react";
import { Wrapper } from "../Commons";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from "@mui/material";
import { Table } from "../Commons";

const CardDownload = () => (
  <Card style={{ border: "2px solid #8E0B0B" }}>
    <CardActionArea>
      <CardContent sx={{ p: 1 }}>
        <Grid container>
          <Grid item xs={3}>
            <img
              src="https://img.icons8.com/external-konkapp-outline-color-konkapp/50/000000/external-report-marketing-and-growth-konkapp-outline-color-konkapp.png"
              height="100%"
              width="100%"
            />
          </Grid>
          <Grid item xs={9}>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              General statistics
            </Typography>
            <Typography variant="h7" component="div">
              Download report
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </CardActionArea>
  </Card>
);

const ReportAnalytics = () => {
  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Admin Reports</Typography>
        {/* <Box pr={3} /> */}
        <CardDownload />
      </Box>
      <Box pt={5} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Table />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ReportAnalytics;
