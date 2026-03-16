import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResults } from "../api/apiClient";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function WorkflowResults() {

  const { name } = useParams();

  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    getResults(name)
      .then((res) => {

        const summary = res.data.summary;

        const formatted = Object.keys(summary).map((key) => ({
          name: key,
          value: summary[key]
        }));

        setChartData(formatted);
        setTableData(formatted);

      })
      .catch((err) => {
        console.error(err);
      });

  }, [name]);

  if (!chartData.length) return <p>Loading results...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (

    <div style={{ padding: 20 }}>

      <h2>Classification Results</h2>

      {/* RESULTS TABLE */}

      <table border="1" cellPadding="10" style={{ marginBottom: 30 }}>

        <thead>

          <tr>
            <th>Classification</th>
            <th>Count</th>
          </tr>

        </thead>

        <tbody>

          {tableData.map((row) => (

            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.value}</td>
            </tr>

          ))}

        </tbody>

      </table>

      {/* PIE CHART */}

      <PieChart width={400} height={400}>

        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >

          {chartData.map((entry, index) => (

            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>

  );

}
