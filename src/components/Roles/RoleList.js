import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { roleState } from '../../recoil/atoms';
import { useNavigate } from 'react-router-dom';

const RoleList = () => {
  const [roles, setRoles] = useRecoilState(roleState);
  const [formData, setFormData] = useState({
    name: '',
    permissions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.permissions) {
      alert('Please fill in all fields');
      return;
    }

    const newRole = {
      id: Date.now().toString(),
      name: formData.name,
      permissions: formData.permissions.split(',').map((perm) => perm.trim()),
    };

    setRoles([...roles, newRole]);
    setFormData({ name: '', permissions: '' }); // Reset the form
  };

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    return Navigate("/");
  }
  console.log(token);

  const handleDelete = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div>
      <h2>Role List</h2>

      {/* Add Role Form */}
      <form onSubmit={handleAddRole} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Role Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="permissions"
            value={formData.permissions}
            onChange={handleChange}
            placeholder="Permissions (comma-separated, e.g., Read, Write)"
            required
          />
        </div>
        <button type="submit">Add Role</button>
      </form>

      {/* Role List Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
