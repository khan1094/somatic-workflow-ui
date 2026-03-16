export default function About() {

  return (

    <div style={{
      maxWidth: "800px",
      margin: "auto",
      padding: "20px"
    }}>

      <h2>About This Interface</h2>

      <p>
        This web interface allows users to run somatic variant classification workflows
        using a Kubernetes + Argo Workflows infrastructure.
      </p>

      <h3>How to Use</h3>

      <ul>

        <li>
          Go to <b>Submit Workflow</b> to upload a VCF file.
        </li>

        <li>
          Optionally select a specific compute node.
        </li>

        <li>
          After submission you will be automatically redirected
          to the workflow details page.
        </li>

        <li>
          When the workflow finishes, results can be visualized
          or downloaded as TSV.
        </li>

      </ul>

      <h3>Workflow Status</h3>

      <ul>

        <li><b>Running</b> – workflow is still executing</li>
        <li><b>Succeeded</b> – results are ready</li>
        <li><b>Failed</b> – workflow execution failed</li>

      </ul>

      <p>
        Depending on system load, workflows may take some time to complete.
        Please wait until the status becomes <b>Succeeded</b>.
      </p>

    </div>

  );

}
