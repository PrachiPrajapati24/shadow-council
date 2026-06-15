import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 border-b">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;