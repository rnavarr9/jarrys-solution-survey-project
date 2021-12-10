import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { FullScreenDialog, Wrapper } from "../../../Commons";
import axios from "axios";
import {
  createShortAnswerLineChartGraphData,
  createShortAnswerLineChartLabels,
  createOptionsLine,
} from "../../../../Helpers/helperFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ShortAnswerGraphsModal = ({ surveyTemplateId }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (fetchedData) {
      setData(
        createShortAnswerLineChartGraphData(
          createShortAnswerLineChartLabels(fetchedData),
          fetchedData
        )
      );
    }
  }, [fetchedData]);
  console.log({ singleReport: fetchedData });
  console.log({ data });
  const handleReportData = () => {
    if (surveyTemplateId) {
      axios
        .get(`/api/admin/report/surveys/${surveyTemplateId}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setFetchedData(response.data);
        })
        .catch((err) => {
          console.log("Error fetching report data for survey!");
        });
    }
  };

  return (
    <FullScreenDialog cb={handleReportData} surveyTitle={fetchedData?.title}>
      {/* <Box sx={{ maxWidth: "500px" }}> */}
      <Wrapper>
        <Grid container spacing={4}>
          {data && (
            <Grid item xs={4}>
              <Line
                options={createOptionsLine("Respondents by Date")}
                data={data}
              />
            </Grid>
          )}
        </Grid>
        {/* </Box> */}
      </Wrapper>
    </FullScreenDialog>
  );
};

export default ShortAnswerGraphsModal;
