import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; 

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null); 

  useEffect(() => {
    fetch('https://67743f63922222414819014c.mockapi.io/api/v1/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = () => {
    fetch('https://67743f63922222414819014c.mockapi.io/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([data, ...users]);
        toast.success(`User ${data.name} added successfully!`);
        setNewUser({ name: '', email: '' });
      })
      .catch((error) => {
        toast.error('Failed to add user');
        console.error('Error adding user:', error);
      });
  };

  const deleteUser = (id) => {
    fetch(`https://67743f63922222414819014c.mockapi.io/api/v1/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    })
    .catch((err) => {
      toast.error("Failed to delete the user!");
      console.error("Error deleting user:", err);
    });
  };

  const updateUser = () => {

    if (editingUser && newUser.name && newUser.email) {
  
      fetch(`https://67743f63922222414819014c.mockapi.io/api/v1/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingUser, 
          name: newUser.name,
          email: newUser.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          
          const updatedUsers = users.map((user) =>
            user.id === data.id ? data : user
          );
          setUsers(updatedUsers);
  
          toast.success(`User ${data.name} updated successfully!`);

          setEditingUser(null);
          setNewUser({ name: '', email: '' });
        })
        .catch((error) => {
          toast.error('Failed to update user');
          console.error('Error updating user:', error);
        });
    } else {
      toast.error('Please fill in both name and email');
    }
  };
  

  const handleEdit = (user) => {
    setEditingUser(user); 
    setNewUser({ name: user.name, email: user.email }); 
  };

  const handleCancelEdit = () => {
    setEditingUser(null); 
    setNewUser({ name: '', email: '' }); 
  };

  return (
    <div>
      <h2 className="text-2xl mb-6 font-semibold">Users</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2 rounded-md text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2 rounded-md text-black"
        />
        {editingUser ? (
          <>
            <button
              onClick={updateUser}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              Update User
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-3 py-2 ml-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addUser}
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
          >
            Add User
          </button>
        )}
      </div>

      <table className="w-full table-auto bg-white dark:bg-gray-800 border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">Avatar</th>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">Name</th>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">Email</th>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">Role</th>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">City</th>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">Status</th>
            <th className="py-3 px-4 text-left border-b border-gray-300 dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-3 px-4">
                <img
                  src={"https://www.pngarts.com/files/5/User-Avatar-Free-PNG-Image.png" || user.avatar }
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
              </td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4">{user.city}</td>
              <td className="py-3 px-4">{user.status}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
