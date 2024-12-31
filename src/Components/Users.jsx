import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

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
      .then((data) => setUsers([...users, data]));
  };

  const deleteUser = (id) => {
    fetch(`https://67743f63922222414819014c.mockapi.io/api/v1/users/${id}`, {
      method: 'DELETE',
    }).then(() => setUsers(users.filter((user) => user.id !== id)));
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
          className="border p-2 mr-2 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2 rounded-md"
        />
        <button
          onClick={addUser}
          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
          >

            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full mb-4 border-2 border-blue-500"
            />


            <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              <strong>City:</strong> {user.city}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              <strong>Status:</strong> {user.status}
            </p>

            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
