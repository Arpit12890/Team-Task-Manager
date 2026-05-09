// ==========================================
// src/pages/Tasks.jsx
// ==========================================

import axios from "axios";
import { useEffect, useState } from "react";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Low");

  const [status, setStatus] =
    useState("To Do");

  const [dueDate, setDueDate] =
    useState("");

  useEffect(() => {

    getTasks();

  }, []);


// ==========================================
// GET TASKS
// ==========================================

  const getTasks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/tasks/all"
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };


// ==========================================
// CREATE TASK
// ==========================================

  const createTask = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/tasks/create",
        {
          title,
          description,
          priority,
          status,
          dueDate,
        }
      );

      alert("Task Created");

      getTasks();

      setTitle("");
      setDescription("");

    } catch (error) {

      console.log(error);

    }

  };


// ==========================================
// UPDATE STATUS
// ==========================================

  const updateStatus = async (
    id,
    newStatus
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/update-status/${id}`,
        {
          status: newStatus,
        }
      );

      getTasks();

    } catch (error) {

      console.log(error);

    }

  };


// ==========================================
// DELETE TASK
// ==========================================

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/delete/${id}`
      );

      alert("Task Deleted");

      getTasks();

    } catch (error) {

      console.log(error);

    }

  };


// ==========================================
// UI
// ==========================================

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Task Management
      </h1>


      {/* CREATE TASK */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

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

        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Create Task
        </button>

      </div>


      {/* TASK LIST */}

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
                Priority:
                <span className="font-bold ml-2">
                  {task.priority}
                </span>
              </p>

              <p className="mt-2">
                Status:
                <span className="font-bold ml-2">
                  {task.status}
                </span>
              </p>

              <p className="mt-2">
                Due Date:
                <span className="ml-2">
                  {
                    task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No Date"
                  }
                </span>
              </p>


              {/* BUTTONS */}

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