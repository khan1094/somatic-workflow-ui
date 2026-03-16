import { useEffect, useState } from "react";
import { getWorkflows, getNodes } from "../api/apiClient";

export default function Dashboard() {

  const [workflows, setWorkflows] = useState([]);
  const [nodes, setNodes] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const fetchNodes = () => {

    getNodes()
      .then((res) => {
        setNodes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  const fetchWorkflows = () => {

    let query = `?limit=${limit}&offset=${offset}`;

    if (statusFilter) {
      query += `&status=${statusFilter}`;
    }

    getWorkflows(query)
      .then((res) => {
        setWorkflows(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  useEffect(() => {

    fetchNodes();
    fetchWorkflows();

    const interval = setInterval(() => {

      fetchNodes();
      fetchWorkflows();

    }, 5000);

    return () => clearInterval(interval);

  }, [statusFilter, limit, offset]);

  const getStatusColor = (status) => {

    if (status === "Running") return "#f59e0b";
    if (status === "Succeeded") return "#16a34a";
    if (status === "Failed") return "#dc2626";

    return "black";
  };

  return (

    <div style={{
      maxWidth: "1000px",
      margin: "auto",
      padding: "20px"
    }}>

      {/* PROJECT TITLE */}

      <h1 style={{
        textAlign: "center",
        marginBottom: "10px"
      }}>
        Somatic Variant Classification Workflow UI
      </h1>

      <p style={{
        textAlign: "center",
        marginBottom: "40px",
        color: "#555"
      }}>
        A web interface for submitting and monitoring somatic variant
        classification workflows running on Kubernetes and Argo Workflows.
      </p>

      {/* NODE TABLE */}

      <h2 style={{ textAlign: "center" }}>
        Cluster Nodes
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginBottom: "40px",
          textAlign: "center"
        }}
      >

        <thead>

          <tr>
            <th>Node</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {nodes.map((node) => (

            <tr key={node.name}>

              <td>{node.name}</td>

              <td style={{
                color: node.status === "Ready" ? "green" : "red"
              }}>
                {node.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* WORKFLOW DASHBOARD */}

      <h2 style={{
        textAlign: "center",
        marginBottom: "20px"
      }}>
        Workflow Dashboard
      </h2>

      {/* FILTERS */}

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "25px"
      }}>

        <div>

          <label>Status</label><br/>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option value="">All</option>
            <option value="Running">Running</option>
            <option value="Succeeded">Succeeded</option>
            <option value="Failed">Failed</option>

          </select>

        </div>

        <div>

          <label>Limit</label><br/>

          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />

        </div>

        <div>

          <label>Offset</label><br/>

          <input
            type="number"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
          />

        </div>

      </div>

      {/* WORKFLOW TABLE */}

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          textAlign: "center"
        }}
      >

        <thead>

          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Node</th>
          </tr>

        </thead>

        <tbody>

          {workflows.map((wf) => (

            <tr key={wf.name}>

              <td>
                <a href={`/workflows/${wf.name}`}>
                  {wf.name}
                </a>
              </td>

              <td style={{
                color: getStatusColor(wf.status)
              }}>
                {wf.status}
              </td>

              <td>
                {wf.node || "N/A"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
