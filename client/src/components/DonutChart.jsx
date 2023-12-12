import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
import { tokens } from "../theme";

const DonutChart = ({ data, size = 100 }) => {
  const colors = tokens;

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map(( index) =>
          index === 0 ? colors.blueAccents[500] : "transparent"
        ),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutoutPercentage: 70, // Adjust to control the size of the donut hole
  };

  return (
    <Box>
      <Doughnut data={chartData} options={options} width={size} height={size} />
    </Box>
  );
};

export default DonutChart;