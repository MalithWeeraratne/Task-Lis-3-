import { useState } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState(task.projectName || "");
  const [taskDescription, setTaskDescription] = useState(
    task.taskDescription || ""
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "project-name") {
      setProjectName(value);
    } else if (name === "task-description") {
      setTaskDescription(value);
    }
  };

//   zxzax
  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTaskList = taskList.map((t, i) =>
      i === index ? { projectName, taskDescription } : t
    );
    setTaskList(updatedTaskList);
    setEditModal(false);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white text-sm-uppercase font-semibold py-1.5 px-3 rounded-lg"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal && (
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
          <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
            <div className="w-full flex flex-row justify-between p-5">
              <h3 className="text-3xl font-semibold">Edit Task</h3>
              <button
                className="px-2 text-gray-400 text-3xl leading-none font-semibold block"
                onClick={() => setEditModal(false)}
              >
                &times;
              </button>
            </div>

            <form className="p-6" onSubmit={handleEdit}>
              <div>
                <label
                  htmlFor="project-name"
                  className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                >
                  Project Name
                </label>
                <input
                  id="project-name"
                  name="project-name"
                  type="text"
                  placeholder="Project Name"
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  value={projectName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="task-description"
                  className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                >
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  id="task-description"
                  name="task-description"
                  rows="3"
                  placeholder="Task Description"
                  value={taskDescription}
                  onChange={handleInput}
                  required
                />
              </div>
              <button
                className="bg-blue-500 text-white uppercase text-sm font-semibold py-3 px-6 rounded hover:opacity-70"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTask;
