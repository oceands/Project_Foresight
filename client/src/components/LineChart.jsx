import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";
import { tokens } from "../theme";

const LineChart = ({ data, isDashboard = false }) => {
  const colors = tokens;

  return (
    <ResponsiveLine
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.secondary[500],
            },
          },
          legend: {
            text: {
              fill: colors.blueAccents[500],
            },
          },
          ticks: {
            line: {
              stroke: colors.secondary[500],
              strokeWidth: 1,
            },
            text: {
              fill: colors.blackAccents[500],
            },
          },
        },
        legends: {
          text: {
            fill: colors.blackAccents[500],
          },
        },
        tooltip: {
          container: {
            background: colors.blackAccents[400],
            color: colors.primary[100],
          },
        },
      }}
      curve="catmullRom"
      data={data}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Months",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enablePoints={false}
      enableGridX={false}
      enableGridY={!isDashboard}
      enableArea={true}
      areaOpacity={0.25}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      defs={[
        linearGradientDef("gradientA", [
          { offset: 50, color: "inherit" },
          { offset: 70, color: "inherit", opacity: 0 },
        ]),
      ]}
      fill={[{ match: { id: "Incidents" }, id: "gradientA" }]}
    />
  );
};

export default LineChart;
