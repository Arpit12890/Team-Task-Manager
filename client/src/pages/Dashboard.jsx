// ==========================================
// src/pages/Dashboard.jsx
// ==========================================

import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


// ==========================================
// LOAD TASKS
// ==========================================

  useEffect(() => {

    fetchTasks();

  }, []);


// ==========================================
// FETCH TASKS
// ==========================================

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/tasks/all"
      );

      setTasks(response.data);

      setLoading(false);

    } catch (err) {

      setError("Failed To Load Dashboard");

      setLoading(false);

    }

  };


// ==========================================
// DASHBOARD CALCULATIONS
// ==========================================

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const progressTasks = tasks.filter(
    (task) =>
      task.status === "In Progress"
  ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) => {

      return (
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "Done"
      );

    }
  ).length;


// ==========================================
// LOADING
// ==========================================

  if (loading) {

    return (

      <div className="text-center mt-20 text-2xl font-bold">

        Loading Dashboard...

      </div>

    );

  }


// ==========================================
// ERROR
// ==========================================

  if (error) {

    return (

      <div className="text-center mt-20 text-red-500 text-2xl font-bold">

        {error}

      </div>

    );

  }


// ==========================================
// UI
// ==========================================

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-10">

        Dashboard

      </h1>


      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* TOTAL */}

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


        {/* PROGRESS */}

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


      {/* TASK LIST */}

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

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );
}

export default Dashboard;