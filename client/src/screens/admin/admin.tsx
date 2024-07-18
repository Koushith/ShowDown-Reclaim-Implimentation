import { useEffect, useState } from "react";
import { GET_ALL_USERS } from "../../utils/constants";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  steamId?: string; // Optional field
  isQualified: boolean;
  isAdmin: boolean;
  userUid: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const AdminScreen = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    const response = await fetch(GET_ALL_USERS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { users } = await response.json();
    console.log(users);
    setUsers(users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Steam ID</th>
              <th>Is Qualified</th>
              <th>Is Admin</th>
              <th>User UID</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.steamId || "N/A"}</td>
                <td>{user.isQualified ? "Yes" : "No"}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>{user.userUid}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};
