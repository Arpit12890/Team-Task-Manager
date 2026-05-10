// ==========================================
// src/components/ProjectDropdown.jsx
// ==========================================

function ProjectDropdown({
    projects,
    project,
    setProject,
  }) {
  
    return (
  
      <select
        value={project}
        onChange={(e) =>
          setProject(e.target.value)
        }
        className="border p-3 w-full mb-4 rounded"
      >
  
        <option value="">
          Select Project
        </option>
  
        {
          projects.map((p) => (
  
            <option
              key={p._id}
              value={p._id}
            >
  
              {p.title}
  
            </option>
  
          ))
        }
  
      </select>
  
    );
  }
  
  export default ProjectDropdown;