// ==========================================
// src/pages/Projects.jsx
// ==========================================

import axios from "axios";
import { useEffect, useState } from "react";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    const token = localStorage.getItem(
      "token"
    );

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/projects/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjects(res.data);

  };

  const createProject = async () => {

    try {

      const token = localStorage.getItem(
        "token"
      );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects/create`,
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

      alert("Project Created");

      fetchProjects();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Projects
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <input
          type="text"
          placeholder="Project Title"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createProject}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Create Project
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        {projects.map((project) => (

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

          </div>

        ))}

      </div>

    </div>
  );
}

export default Projects;