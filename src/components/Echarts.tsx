import React from "react";
import ReactECharts from "echarts-for-react";

interface EchartsProps {
  id: string;
  data1: Array<string>;
  data2: Array<number>;
}

export const Echarts = ({ id, data1, data2 }: EchartsProps) => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [0.5, 0.2, 0.4, 0.5, 0.8, 0.5, 0.9],
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <div>
      <ReactECharts option={options} />;
    </div>
  );
};
