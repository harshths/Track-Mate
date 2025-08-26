import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const [task, setTask] = useState({
    title: "",
    description: "",
    targetDate: "",
    status: "Pending"
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first.");
      navigate("/");
    } else {
      setUserId(user.id);
    }
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/tasks/add/${userId}`, task);
      alert("Task added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-700">📋 Add New Task</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-pink-600 font-medium hover:underline"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField label="Title" name="title" type="text" value={task.title} onChange={handleChange} placeholder="Enter task title" />
          <TextAreaField label="Description" name="description" value={task.description} onChange={handleChange} placeholder="Write task description..." />
          <InputField label="Target Date" name="targetDate" type="date" value={task.targetDate} onChange={handleChange} />
          <SelectField label="Status" name="status" value={task.status} onChange={handleChange} />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-md text-sm text-gray-700 border border-gray-300 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              ✅ Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      required
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
    ></textarea>
  </div>
);

const SelectField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
    >
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
);

export default AddTask;
