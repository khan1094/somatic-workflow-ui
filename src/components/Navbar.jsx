import { Link } from "react-router-dom";

export default function Navbar() {

  const navStyle = {
    padding: "15px",
    background: "#1f2937",
    color: "white",
    display: "flex",
    gap: "20px"
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  };

  return (

    <nav style={navStyle}>

      <Link style={linkStyle} to="/">
        Dashboard
      </Link>

      <Link style={linkStyle} to="/submit">
        Submit Workflow
      </Link>

      <Link style={linkStyle} to="/about">
        About
      </Link>

    </nav>

  );

}
