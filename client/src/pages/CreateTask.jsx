// ==========================================
// src/pages/CreateTask.jsx
// ==========================================

import axios from "axios";
import { useState } from "react";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks/create",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (
    <div className="p-10">

      <div className="bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Create Task
        </h1>

        <input
          type="text"
          placeholder="Task Title"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-purple-500 text-white px-6 py-3 rounded"
        >
          Create Task
        </button>

      </div>

    </div>
  );
}

export default CreateTask;