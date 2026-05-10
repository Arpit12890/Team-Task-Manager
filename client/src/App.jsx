// ==========================================
// src/App.jsx
// ==========================================

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from
"./components/Navbar";

import PrivateRoute from
"./components/PrivateRoute";

import Login from
"./pages/Login";

import Register from
"./pages/Register";

import Dashboard from
"./pages/Dashboard";

import Projects from
"./pages/Projects";

import Tasks from
"./pages/Tasks";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* PRIVATE ROUTES */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>

              <Dashboard />

            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>

              <Projects />

            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>

              <Tasks />

            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;