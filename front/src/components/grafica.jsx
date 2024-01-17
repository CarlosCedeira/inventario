import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const ChartExample = () => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
  ];
  return (
    <VictoryChart>
      <VictoryBar data={data} />
      <VictoryAxis />
    </VictoryChart>
  );
};

export default ChartExample;
