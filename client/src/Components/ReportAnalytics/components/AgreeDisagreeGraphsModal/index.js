import React from "react";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { FullScreenDialog } from "../../../Commons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Question 1 - abcd",
    },
  },
};

const labels = ["Agree", "Disagree"];

export const data = {
  labels,
  datasets: [
    {
      label: "Total",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const AgreeDisagreeGraphsModal = () => {
  return (
    <FullScreenDialog>
      <Box sx={{ width: "350px" }}>
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
      </Box>
    </FullScreenDialog>
  );
};

export default AgreeDisagreeGraphsModal;
