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

  const [error, setError] =
    useState("");


  useEffect(() => {

    getProjects();

  }, []);

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

      setError(
        "Failed To Create Project"
      );

    }

  };

  const joinProject = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `https://team-task-manager-ufxp.onrender.com/api/projects/join/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Joined Project Successfully"
      );

      getProjects();

    } catch (error) {

      setError(
        "Failed To Join Project"
      );

    }

  };

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">

        Projects

      </h1>


      {/* MESSAGE */}

      {
        message && (

          <div className="bg-green-500 text-white p-4 rounded mb-5">

            {message}

          </div>

        )
      }

      {
        error && (

          <div className="bg-red-500 text-white p-4 rounded mb-5">

            {error}

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


      {/* PROJECTS */}

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

              <button
                onClick={() =>
                  joinProject(project._id)
                }
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              >

                Join Project

              </button>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Projects;