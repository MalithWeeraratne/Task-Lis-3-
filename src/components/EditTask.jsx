import { useState } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState(task.projectName || "");
  const [taskDescription, setTaskDescription] = useState(task.taskDescription || "");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "project-name") {
      setProjectName(value);
    } else if (name === "task-description") {
      setTaskDescription(value);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTaskList = taskList.map((t, i) =>
      i === index ? { ...t, projectName, taskDescription } : t
    );
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setEditModal(false);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg hover:bg-gray-500 transition-all duration-200"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Edit Task</h3>
              <button
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                onClick={() => setEditModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleEdit}>
              <div className="mb-5">
                <label
                  htmlFor="project-name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Project Name
                </label>
                <input
                  id="project-name"
                  name="project-name"
                  type="text"
                  placeholder="Project Name"
                  className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="task-description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="task-description"
                  name="task-description"
                  rows="4"
                  placeholder="Task Description"
                  value={taskDescription}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-500 text-white uppercase text-sm font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-all duration-200"
                  type="button"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white uppercase text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTask;
