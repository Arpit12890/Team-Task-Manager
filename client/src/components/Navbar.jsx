import { Link } from "react-router-dom";

function Navbar() {

  return (
    <div className="bg-blue-600 text-white px-10 py-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        Team Task Manager
      </h1>

      <div className="flex gap-6">

        <Link to="/">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

      </div>

    </div>
  );
}

export default Navbar;