import { useEffect, useState } from "react";
import { getNodes } from "../api/apiClient";

export default function Nodes() {

  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getNodes()
      .then((res) => {
        console.log("Nodes:", res.data);
        setNodes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Node API error:", err);
        setLoading(false);
      });

  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h2>Cluster Nodes</h2>

      {loading && <p>Loading nodes...</p>}

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Node Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {nodes.map((node) => (

            <tr key={node.name}>
              <td>{node.name}</td>
              <td>{node.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
