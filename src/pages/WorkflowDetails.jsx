import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkflow, deleteWorkflow } from "../api/apiClient";

export default function WorkflowDetails() {

  const { name } = useParams();

  const [workflow, setWorkflow] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const fetchWorkflow = () => {

      getWorkflow(name)
        .then((res) => {
          setWorkflow(res.data);
        })
        .catch((err) => {
          console.error(err);
        });

    };

    fetchWorkflow();

    const interval = setInterval(fetchWorkflow, 3000);

    return () => clearInterval(interval);

  }, [name]);

  const handleDelete = async () => {

    try {

      await deleteWorkflow(name);

      setMessage("Workflow deleted.");

    } catch (err) {

      console.error(err);
      setMessage("Error deleting workflow.");

    }

  };

  if (!workflow) return <p>Loading workflow...</p>;

  const buttonStyle = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  return (

    <div style={{
      maxWidth: "700px",
      margin: "auto",
      padding: "20px"
    }}>

      <h2>Workflow Details</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>

        <tbody>

          <tr>
            <td>Name</td>
            <td>{workflow.name}</td>
          </tr>

          <tr>
            <td>Status</td>
            <td>{workflow.status}</td>
          </tr>

          <tr>
            <td>Node</td>
            <td>{workflow.node || "N/A"}</td>
          </tr>

          <tr>
            <td>Input Sample</td>
            <td>{workflow.input_sample}</td>
          </tr>

          <tr>
            <td>Created</td>
            <td>{workflow.created_at}</td>
          </tr>

          <tr>
            <td>Started</td>
            <td>{workflow.started_at}</td>
          </tr>

          <tr>
            <td>Finished</td>
            <td>{workflow.finished_at || "Running"}</td>
          </tr>

        </tbody>

      </table>

      <div style={{ marginTop: 25 }}>

        {workflow.status === "Succeeded" && (

          <a href={`/workflows/${workflow.name}/results`}>

            <button style={{
              ...buttonStyle,
              background: "#16a34a",
              color: "white",
              marginRight: "10px"
            }}>
              View Results
            </button>

          </a>

        )}

        {workflow.status === "Succeeded" && (

          <a href={`http://localhost:8000/workflows/${workflow.name}/download`}>

            <button style={{
              ...buttonStyle,
              background: "#2563eb",
              color: "white",
              marginRight: "10px"
            }}>
              Download TSV
            </button>

          </a>

        )}

        <button
          onClick={handleDelete}
          style={{
            ...buttonStyle,
            background: "#dc2626",
            color: "white"
          }}
        >
          Delete Workflow
        </button>

      </div>

      {message && (

        <p style={{ marginTop: 20 }}>
          {message}
        </p>

      )}

    </div>

  );

}
