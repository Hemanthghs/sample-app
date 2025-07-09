import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [tempInput, setTempInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [tempEditInput, setTempEditInput] = useState("");

  const addTask = (inputName) => {
    const temp = { name: inputName, id: todos.length + 1, completed: false };
    setTodos([...todos, temp]); // spread operator
  };

  const deleteTask = (id) => {
    const tempTodos = [
      ...todos.slice(0, id), // [t1, t2, t3, t4, t5] -> [t1, t2, t4, t5]
      ...todos.slice(id + 1),
    ];
    setTodos(tempTodos);
  };

  const completed = (index) => {
    const updatingItem = todos[index];
    updatingItem.completed = true;

    const tempTodos = [
      ...todos.slice(0, index),
      updatingItem,
      ...todos.slice(index + 1),
    ];

    // const tempTodos = [
    //   ...todos.slice(0, index),
    //   {...updatingItem, completed: true},
    //   ...todos.slice(index + 1),
    // ];

    // {name: asdf, id: 1, completed: false}
    // {name: asdf, id: 1, completed: false, completed: true}

    setTodos(tempTodos);
  };

  const handleInput = (e) => {
    setTempInput(e.target.value);
  };

  const handleEdit = (e) => {
    setTempEditInput(e.target.value);
  };

  const clearInput = () => {
    setTempInput("");
  };

  const updateTask = () => {
    const updatingItem = todos[editingTask]; // editingTask is index of the current updating item
    updatingItem.name = tempEditInput;

    const tempTodos = [
      ...todos.slice(0, editingTask),
      updatingItem,
      ...todos.slice(editingTask + 1),
    ];

    setTodos(tempTodos);

    setEditingTask(null);
  };

  // a > 10 ? true : false

  return (
    <div>
      <h1 className="text-2xl font-bold">My Tasks</h1>
      {todos.map((item, index) => {
        return (
          <TodoCard
            id={index + 1}
            deleteTask={deleteTask}
            index={index}
            completed={completed}
            item={item}
            clearInput={clearInput}
            setEditingTask={setEditingTask}
            setTempEditInput={setTempEditInput}
            editingTask={editingTask}
            tempEditInput={tempEditInput}
            handleEdit={handleEdit}
            updateTask={updateTask}
          />
        );
      })}

      <div className="bg-gray-300 h-8 rounded-full flex gap-2 justify-between">
        <input
          className="p-2 flex-1 w-full focus:outline-none"
          type="text"
          value={tempInput}
          onChange={handleInput}
        />
        <button className="cursor-pointer text-gray-500" onClick={clearInput}>
          X
        </button>
        <button
          className="bg-blue-500 p-1 w-[100px] rounded-full cursor-pointer"
          onClick={() => {
            addTask(tempInput);
            setTempInput("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;

const TodoCard = ({
  item,
  id,
  deleteTask,
  index,
  completed,
  setEditingTask,
  setTempEditInput,
  editingTask,
  tempEditInput,
  handleEdit,
  updateTask,
}) => {
  return (
    <div className="bg-gray-400 w-1/2 rounded-lg p-2 mb-2">
      <div>
        {item.completed ? (
          <strike>
            {id}. {item.name}
          </strike>
        ) : (
          <span>
            {editingTask === index ? (
              <div>
                <input
                  className="border w-full focus:outline-white"
                  type="text"
                  value={tempEditInput}
                  onChange={handleEdit}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-green-500 rounded p-1"
                    onClick={updateTask}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 p-1 rounded"
                    onClick={() => {
                      setEditingTask(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <span
                onClick={() => {
                  setEditingTask(index);
                  setTempEditInput(item.name);
                }}
              >
                {id}. {item.name}
              </span>
            )}
          </span>
        )}
      </div>
      {editingTask === index ? null : (
        <>
          <button
            onClick={() => {
              completed(index);
            }}
            className="p-1 mr-2 rounded-lg bg-green-700 text-white hover:cursor-pointer"
          >
            Done
          </button>
          <button
            className="p-1 rounded-lg bg-red-700 text-white hover:cursor-pointer"
            onClick={() => {
              deleteTask(index);
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};
