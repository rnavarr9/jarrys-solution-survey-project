import React, { useState } from "react";
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
import { Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { FullScreenDialog, Wrapper } from "../../../Commons";
import axios from "axios";
import { AGREE_DISAGREE_GRAPH_LABELS } from "../../../../Helpers/constants";
import {
  createGraphData,
  createOptions,
} from "../../../../Helpers/helperFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AgreeDisagreeGraphsModal = ({ surveyTemplateId }) => {
  const [fetchedData, setFetchedData] = useState(null);
console.log({singleReport: fetchedData})
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
          {fetchedData &&
            fetchedData.questions &&
            fetchedData.questions.length &&
            fetchedData.questions.map((q, index) => (
              <Grid item xs={4} key={index}>
                <Bar
                  options={createOptions(index + 1, q.question)}
                  data={createGraphData(
                    [q.yesAnswered, q.noUnAnswered],
                    AGREE_DISAGREE_GRAPH_LABELS
                  )}
                />
              </Grid>
            ))}
        </Grid>
        {/* </Box> */}
      </Wrapper>
    </FullScreenDialog>
  );
};

export default AgreeDisagreeGraphsModal;
