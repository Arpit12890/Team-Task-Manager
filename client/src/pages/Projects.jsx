// ==========================================
// UPDATE src/pages/Projects.jsx
// ==========================================

import axios from "axios";

import {
  useEffect,
  useState,
} from "react";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [message, setMessage] =
    useState("");


// ==========================================
// LOAD PROJECTS
// ==========================================

  useEffect(() => {

    getProjects();

  }, []);


// ==========================================
// GET ASSIGNED PROJECTS
// ==========================================

  const getProjects = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "https://team-task-manager-ufxp.onrender.com/api/projects/my-projects",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setProjects(response.data);

    } catch (error) {

      console.log(error);

    }

  };


// ==========================================
// CREATE PROJECT
// ==========================================

  const createProject = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://team-task-manager-ufxp.onrender.com/api/projects/create",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Project Created Successfully"
      );

      setTitle("");

      setDescription("");

      getProjects();

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

        My Projects

      </h1>


      {/* MESSAGE */}

      {
        message && (

          <div className="bg-green-500 text-white p-4 rounded mb-5">

            {message}

          </div>

        )
      }


      {/* CREATE PROJECT */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold mb-5">

          Create Project

        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          onClick={createProject}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >

          Create Project

        </button>

      </div>


      {/* PROJECT LIST */}

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

              <p className="mt-4">

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

  );
}

export default Projects;