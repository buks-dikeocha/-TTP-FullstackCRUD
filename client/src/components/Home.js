import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask"
import ListTask from "./ListTask"

function App() {
  const redirect = useNavigate()
  return (
    <div className="App">
      <div className="m-5">
        <h2 className="m-4">My To-Do List</h2>
        <AddTask />
        <ListTask />
        <button className="btn btn-danger" onClick={() => redirect("/login")}>Sign Out</button>
      </div>
      <footer>
        <p>A CRUD app created with the PERN teck stack and styled with Bootstrap</p>
        <p>Chukwuebuka Dikeocha</p>
      </footer>
    </div>
  );
}

export default App; 