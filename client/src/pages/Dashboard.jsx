import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

    try {

      const token =
        localStorage.getItem("token");

      // TASKS

      const taskResponse =
        await axios.get(
          "https://team-task-manager-ufxp.onrender.com/api/tasks/all",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      // PROJECTS

      const projectResponse =
        await axios.get(
          "https://team-task-manager-ufxp.onrender.com/api/projects/my-projects",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTasks(taskResponse.data);

      setProjects(
        projectResponse.data
      );

      setLoading(false);

    } catch (error) {

      setError(
        "Failed To Load Dashboard"
      );

      setLoading(false);

    }

  };

  const totalTasks =
    tasks.length;

  const totalProjects =
    projects.length;

  const todoTasks =
    tasks.filter(
      (task) =>
        task.status === "To Do"
    ).length;

  const progressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  const doneTasks =
    tasks.filter(
      (task) =>
        task.status === "Done"
    ).length;

  const overdueTasks =
    tasks.filter((task) => {

      return (
        task.dueDate &&
        new Date(task.dueDate) <
          new Date() &&
        task.status !== "Done"
      );

    }).length;

  if (loading) {

    return (

      <div className="text-center mt-20 text-3xl font-bold">

        Loading Dashboard...

      </div>

    );

  }

  if (error) {

    return (

      <div className="text-center mt-20 text-red-500 text-3xl font-bold">

        {error}

      </div>

    );

  }

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-10">

        Dashboard

      </h1>


      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

        {/* PROJECTS */}

        <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl">

            Projects

          </h2>

          <p className="text-4xl font-bold mt-3">

            {totalProjects}

          </p>

        </div>


        {/* TOTAL TASKS */}

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl">

            Total Tasks

          </h2>

          <p className="text-4xl font-bold mt-3">

            {totalTasks}

          </p>

        </div>


        {/* TODO */}

        <div className="bg-gray-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl">

            To Do

          </h2>

          <p className="text-4xl font-bold mt-3">

            {todoTasks}

          </p>

        </div>


        {/* IN PROGRESS */}

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl">

            In Progress

          </h2>

          <p className="text-4xl font-bold mt-3">

            {progressTasks}

          </p>

        </div>


        {/* DONE */}

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl">

            Completed

          </h2>

          <p className="text-4xl font-bold mt-3">

            {doneTasks}

          </p>

        </div>


        {/* OVERDUE */}

        <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl">

            Overdue

          </h2>

          <p className="text-4xl font-bold mt-3">

            {overdueTasks}

          </p>

        </div>

      </div>


      {/* RECENT PROJECTS */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">

          My Projects

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            projects.map((project) => (

              <div
                key={project._id}
                className="bg-white p-6 rounded-xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">

                  {project.title}

                </h2>

                <p className="mt-3 text-gray-600">

                  {project.description}

                </p>

                <p className="mt-3">

                  Members:
                  <span className="font-bold ml-2">

                    {project.members.length}

                  </span>

                </p>

              </div>

            ))
          }

        </div>

      </div>


      {/* RECENT TASKS */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">

          Recent Tasks

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-6 rounded-xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">

                  {task.title}

                </h2>

                <p className="mt-3 text-gray-600">

                  {task.description}

                </p>

                <p className="mt-3">

                  Status:
                  <span className="font-bold ml-2">

                    {task.status}

                  </span>

                </p>

                <p className="mt-2">

                  Priority:
                  <span className="font-bold ml-2">

                    {task.priority}

                  </span>

                </p>


                {/* PROGRESS BAR */}

                <div className="w-full bg-gray-300 rounded-full h-4 mt-4">

                  <div
                    className={`h-4 rounded-full ${
                      task.status === "Done"
                        ? "bg-green-500 w-full"
                        : task.status ===
                          "In Progress"
                        ? "bg-yellow-500 w-1/2"
                        : "bg-gray-500 w-1/4"
                    }`}
                  >

                  </div>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );
}

export default Dashboard;