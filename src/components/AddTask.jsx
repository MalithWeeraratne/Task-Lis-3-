import { useState } from "react";

const AddTask = () => {
  const [addMode, setAddMode] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleInput = (e) => { 
    const { name, value } = e.target;
    if (name === "project-name") {
      setProjectName(value);
    } else {
      setTaskDescription(value);
    }   
  }


  const handleAdd = () => {
    setAddMode(false);
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
        type="button"
        onClick={() => setAddMode(true)}
      >
        + New
      </button>

      {addMode ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
              <div className="w-full flex flex-row justify-between p-5">
                <h3 className="text-3xl font-semibold">Add New Task</h3>
                <button
                  className="px-2 text-gray-400 text-3xl leading-none font-semibold block"
                  onClick={() => setAddMode(false)}
                >
                  &times;
                </button>
              </div>

              <form className="p-6">
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
                    htmlFor="project-name"
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
                  />
                </div>
              </form>
              <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                    <button
                    className="bg-blue-500 text-white uppercase text-sm font-semibold py-3  px-6 rounded hover:opacity-70"
                    onClick={handleAdd}   
                    >Add Task</button>

              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddTask;
