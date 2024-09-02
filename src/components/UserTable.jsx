import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://66d5a43bf5859a704266ea05.mockapi.io/api/v1/users"
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);
  const handleAdd = async () => {
    const newUser = {
      name,
      email,
      phone,
      city,
      website,
    };
    await axios.post(
      `https://66d5a43bf5859a704266ea05.mockapi.io/api/v1/users/`,
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUsers((prev) => [...prev, newUser]);
    setName("");
    setEmail("");
    setCity("");
    setPhone("");
    setWebsite("");
  };
  const handleDelete = async (id) => {
    await axios.delete(
      `https://66d5a43bf5859a704266ea05.mockapi.io/api/v1/users/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = async (id, newContact) => {
    const updatedUser = users.find((user) => user.id === id);
    updatedUser.phone = newContact;
    await axios.put(
      `https://66d5a43bf5859a704266ea05.mockapi.io/api/v1/users/${id}`,
      {
        phone: newContact,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return (
    <table className="table border table-striped">
      <thead className="bg-primary">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>City</th>
          <th>Website</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.phone}
              <button
                onClick={() =>
                  handleEdit(
                    user.id,
                    prompt("Enter new contact number:", user.phone)
                  )
                }
              >
                Edit
              </button>
            </td>
            <td>{user.city}</td>
            <td>{user.website}</td>
            <td>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <td>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          ></input>
        </td>
        <td>
          <button className="btn btn-primary" onClick={handleAdd}>
            {`   Add User  `}
          </button>
        </td>
      </tfoot>
    </table>
  );
};

export default UserTable;
