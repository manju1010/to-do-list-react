import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUnderline } from "@fortawesome/free-solid-svg-icons";

function Maincontent() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [checked, setChecked] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); // Track index of task being edited

  function handleText(event) {
    setTask(event.target.value);
  }

  function handleChange() {
    if (task.trim() === "") return; // Prevent adding empty tasks
    if (editingIndex !== null) {
      // If editing, update the task
      const updatedList = [...list];
      updatedList[editingIndex] = task;
      setList(updatedList);
      setEditingIndex(null); // Reset editing index
    } else {
      // If not editing, add the task
      setList((prevList) => [...prevList, task]);
    }
    setTask("");
  }

  function handleCheckbox(index) {
    setChecked((prevCheck) => ({
      ...prevCheck,
      [index]: !prevCheck[index],
    }));
  }

  function handleEdit(index) {
    setTask(list[index]); // Set task input to the selected task
    setEditingIndex(index); // Set the index for editing
  }

  function handleDelete(index) {
    const updatedList = list.filter((_, i) => i !== index); // Remove the task
    setList(updatedList);
    setChecked((prevCheck) => {
      const newCheck = { ...prevCheck };
      delete newCheck[index]; // Remove checkbox state
      return newCheck;
    });
  }

  return (
    <div>
      <div className="container">
        <div className="new-task">
          <label>
            <textarea
              className="text-box"
              value={task}
              onChange={handleText}
              placeholder="Enter title"
            />
          </label>
          <br />
          <button className="add-button" onClick={handleChange}>
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <div className="text-list">
        <ul>
          {list.map((item, index)  => (
            <li key={index} style={{
              textDecoration : checked[index] ? 'line-through' : 'none'
            }} >
              <input
                checked={checked[index] || false}
                type="checkbox"
                onChange={() => handleCheckbox(index)}
                
              />
              {item}{" "}
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEdit(index)}
                style={{ cursor: "pointer", marginRight: "10px" }}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDelete(index)}
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Maincontent;
