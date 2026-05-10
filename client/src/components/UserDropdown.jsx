function UserDropdown({
    users,
    assignedTo,
    setAssignedTo,
  }) {
  
    return (
  
      <select
        value={assignedTo}
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
        className="border p-3 w-full mb-4 rounded"
      >
  
        <option value="">
          Select User
        </option>
  
        {
          users.map((user) => (
  
            <option
              key={user._id}
              value={user._id}
            >
  
              {user.name}
  
            </option>
  
          ))
        }
  
      </select>
  
    );
  }
  
  export default UserDropdown;