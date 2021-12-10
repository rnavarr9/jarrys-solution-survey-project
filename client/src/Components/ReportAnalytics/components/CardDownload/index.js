import React from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

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

export default CardDownload;
