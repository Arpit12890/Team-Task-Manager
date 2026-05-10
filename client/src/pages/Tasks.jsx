import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

import UserDropdown from
"../components/UserDropdown";

import ProjectDropdown from
"../components/ProjectDropdown";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Low");

  const [status, setStatus] =
    useState("To Do");

  const [dueDate, setDueDate] =
    useState("");

  const [project, setProject] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  useEffect(() => {

    getTasks();

    getUsers();

    getProjects();

  }, []);

  const getTasks = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "https://team-task-manager-ufxp.onrender.com/api/tasks/all",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTasks(response.data);

    } catch (error) {

      setError(
        "Failed To Load Tasks"
      );

    }

  };

  const getUsers = async () => {

    try {

      const response =
        await axios.get(
          "https://team-task-manager-ufxp.onrender.com/api/users"
        );

      setUsers(response.data);

    } catch (error) {

      setError(
        "Failed To Load Users"
      );

    }

  };


  const getProjects = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "https://team-task-manager-ufxp.onrender.com/api/projects/all",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setProjects(response.data);

    } catch (error) {

      setError(
        "Failed To Load Projects"
      );

    }

  };

  const createTask = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://team-task-manager-ufxp.onrender.com/api/tasks/create",
        {
          title,
          description,
          priority,
          status,
          dueDate,
          project,
          assignedTo,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Task Created Successfully"
      );

      setError("");

      getTasks();

      // RESET FORM

      setTitle("");

      setDescription("");

      setPriority("Low");

      setStatus("To Do");

      setDueDate("");

      setProject("");

      setAssignedTo("");

    } catch (error) {

      setError(
        "Failed To Create Task"
      );

    }

  };

  const updateStatus = async (
    id,
    newStatus
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `https://team-task-manager-ufxp.onrender.com/api/tasks/update-status/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Task Status Updated"
      );

      getTasks();

    } catch (error) {

      setError(
        "Failed To Update Status"
      );

    }

  };


  const deleteTask = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `https://team-task-manager-ufxp.onrender.com/api/tasks/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Task Deleted Successfully"
      );

      getTasks();

    } catch (error) {

      setError(
        "Failed To Delete Task"
      );

    }

  };

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">

        Task Management

      </h1>


      {/* SUCCESS MESSAGE */}

      {
        message && (

          <div className="bg-green-500 text-white p-4 rounded mb-5">

            {message}

          </div>

        )
      }


      {/* ERROR MESSAGE */}

      {
        error && (

          <div className="bg-red-500 text-white p-4 rounded mb-5">

            {error}

          </div>

        )
      }


      {/* CREATE TASK FORM */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold mb-5">

          Create Task

        </h2>


        {/* TITLE */}

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />


        {/* DESCRIPTION */}

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />


        {/* DUE DATE */}

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />


        {/* PROJECT DROPDOWN */}

        <ProjectDropdown
          projects={projects}
          project={project}
          setProject={setProject}
        />


        {/* USER DROPDOWN */}

        <UserDropdown
          users={users}
          assignedTo={assignedTo}
          setAssignedTo={setAssignedTo}
        />


        {/* PRIORITY */}

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        >

          <option value="Low">

            Low

          </option>

          <option value="Medium">

            Medium

          </option>

          <option value="High">

            High

          </option>

        </select>


        {/* CREATE BUTTON */}

        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >

          Create Task

        </button>

      </div>


      {/* TASKS */}

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

                Assigned To:
                <span className="font-bold ml-2">

                  {task.assignedTo?.name}

                </span>

              </p>

              <p className="mt-2">

                Project:
                <span className="font-bold ml-2">

                  {task.project?.title}

                </span>

              </p>

              <p className="mt-2">

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


              {/* ACTION BUTTONS */}

              <div className="flex gap-2 mt-5 flex-wrap">

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "To Do"
                    )
                  }
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >

                  To Do

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "In Progress"
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >

                  Progress

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "Done"
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >

                  Done

                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >

                  Delete

                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Tasks;