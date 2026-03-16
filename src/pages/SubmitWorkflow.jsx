import { useEffect, useState } from "react";
import { getNodes, submitWorkflow } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function SubmitWorkflow() {

  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {

    getNodes()
      .then((res) => {
        setNodes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    if (selectedNode) {
      formData.append("node", selectedNode);
    }

    try {

      const res = await submitWorkflow(formData);

      const workflowName = res.data.workflow_name;

      navigate(`/workflows/${workflowName}`);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div style={{
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      textAlign: "center"
    }}>

      <h2>Submit Variant Classification</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: 20 }}>

          <label>Upload VCF File</label><br/>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

        </div>

        <div style={{ marginBottom: 20 }}>

          <label>Select Node</label><br/>

          <select
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
          >

            <option value="">Auto Select</option>

            {nodes.map((node) => (

              <option key={node.name} value={node.name}>
                {node.name}
              </option>

            ))}

          </select>

        </div>

        <button
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Run Workflow
        </button>

      </form>

    </div>

  );

}
