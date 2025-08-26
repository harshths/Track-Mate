import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first.");
      navigate("/");
    } else {
      setUserId(user.id);
      fetchTasks(user.id);
      fetchCoins(user.id);
    }
  }, []);

  const fetchTasks = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/tasks/user/${uid}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCoins = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${uid}`);
      setCoins(res.data.coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/delete/${id}`);
      fetchTasks(userId);
      fetchCoins(userId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">🎯 Task Dashboard</h1>
          <div className="space-x-3">
            <button
              onClick={() => navigate("/add-task")}
              className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-100"
            >
              ➕ Add Task
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">📝 Your Tasks</h2>
            <p className="text-sm text-gray-500">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} found
            </p>
            <p className="text-md font-semibold text-purple-600 mt-2">
              🪙 Coins: {coins}
            </p>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-semibold text-gray-600">No tasks found</h3>
              <p className="text-sm text-gray-400 mt-1">Start by creating your first task!</p>
              <button
                onClick={() => navigate("/add-task")}
                className="mt-4 bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 shadow"
              >
                ➕ Create Task
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-slate-50 hover:bg-slate-100 p-4 rounded-lg shadow flex justify-between items-start transition"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-indigo-600 font-bold text-lg">{task.title}</h4>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          task.status === "completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {task.description || "No description"}
                    </p>
                    {task.status === "Pending" && (
                      <p className="text-sm text-red-500 mt-1">
                        ⏰ Target: {task.targetDate}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4 mt-1">
                    <button
                      onClick={() => navigate(`/edit-task/${task.id}`)}
                      className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 text-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
