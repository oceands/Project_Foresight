import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";

const CenterText = ({ dataWithArc, centerX, centerY, data }) => (
  <text
    x={centerX}
    y={centerY}
    textAnchor="middle"
    dominantBaseline="central"
    fill="black"
  >
    <tspan fontSize={22} fontWeight="bold" x={centerX} dy="-0.5em">
      {dataWithArc.reduce((sum, data) => sum + data.value, 0)}
    </tspan>
    <tspan fontSize={14} fontWeight="bold" x={centerX} dy="1.5em">
      Dispatches
    </tspan>
  </text>
);

const PieChart = ({ data, isDashboard = false }) => {
  const colors = tokens;
  return (
    <ResponsivePie
      data={data}
      layers={["arcs", "legends", CenterText]}
      colors={{ datum: "data.color" }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.secondary[500],
            },
          },
          legend: {
            text: {
              fill: colors.secondary[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.secondary[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.secondary[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.orangeAccents[100],
          },
        },
      }}
      margin={{ top: 30, right: 80, bottom: 50, left: 80 }}
      innerRadius={0.9}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.orangeAccents[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
    />
  );
};

export default PieChart;
