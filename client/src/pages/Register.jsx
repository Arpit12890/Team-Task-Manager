// ==========================================
// src/pages/Register.jsx
// ==========================================

import axios from "axios";

import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function Register() {

  const navigate =
    useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("Member");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


// ==========================================
// REGISTER
// ==========================================

  const handleRegister =
    async () => {

    try {

      await axios.post(
        "https://team-task-manager-ufxp.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      setMessage(
        "Registration Successful"
      );

      setError("");

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (error) {

      setError(
        error.response?.data
          ?.message ||
        "Registration Failed"
      );

      setMessage("");

    }

  };


// ==========================================
// UI
// ==========================================

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">

          Register

        </h1>


        {/* SUCCESS MESSAGE */}

        {
          message && (

            <div className="bg-green-500 text-white p-3 rounded mb-4">

              {message}

            </div>

          )
        }


        {/* ERROR MESSAGE */}

        {
          error && (

            <div className="bg-red-500 text-white p-3 rounded mb-4">

              {error}

            </div>

          )
        }


        {/* NAME */}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4 rounded"
        />


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4 rounded"
        />


        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4 rounded"
        />


        {/* ROLE */}

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4 rounded"
        >

          <option value="Member">

            Member

          </option>

          <option value="Admin">

            Admin

          </option>

        </select>


        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          className="bg-green-500 text-white w-full py-3 rounded"
        >

          Register

        </button>

      </div>

    </div>

  );
}

export default Register;