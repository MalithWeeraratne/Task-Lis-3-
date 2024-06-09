import "./App.css";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    let storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (taskIndex) => {
    const taskToComplete = taskList[taskIndex];
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskToComplete]);
    const updatedTaskList = taskList.filter((_, index) => index !== taskIndex);
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    localStorage.setItem("completedTasks", JSON.stringify([...completedTasks, taskToComplete]));
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-6 pl-6">The Task Tracker</h1>
      <p className="text-xl pl-6">Hi There!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-2 bg-gray-200">
            To Do:
          </h2>
          {taskList.map((task, index) => (
            <ToDo
              key={index}
              task={task}
              index={index}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          ))}
        </div>
        <div className="w-full flex flex-col" ref={drop}>
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-2 bg-gray-200">
            Completed:
          </h2>
          {completedTasks.map((task, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg"
            >
              <p className="font-semibold text-xl">{task.projectName}</p>
              <p className="text-lg py-2">{task.taskDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
