import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, roleState } from '../../recoil/atoms';
import { useNavigate, Navigate } from 'react-router-dom';

const UserList = () => {
  
  const [users, setUsers] = useRecoilState(userState);
  const roles = useRecoilValue(roleState); // Fetch roles from Recoil state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
  });


  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    return Navigate("/");
  }
  console.log(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill in all fields');
      return;
    }
    const newUser = { ...formData, id: Date.now().toString() };
    setUsers([...users, newUser]);
    setFormData({ name: '', email: '', role: '', status: 'Active' }); // Reset form
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>User List</h2>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>

      {/* User List Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;