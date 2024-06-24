import { useEffect, useState } from "react";
import Header from "./Components/Header";
import ToDoComputed from "./Components/ToDoComputed";
import ToDoCreate from "./Components/ToDoCreate";
import ToDoFilter from "./Components/ToDoFilter";
import ToDoList from "./Components/ToDoList";
import { DragDropContext} from "@hello-pangea/dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

//Für die LocalStorage 
const initialStateTodos = JSON.parse(localStorage.getItem("todos"))|| [];
const App = () => {
  // Actung corchete
  const [todos, setTodos] = useState(initialStateTodos);

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const [filter, setFilter] = useState("all");

  const changeFilter = (filter) => setFilter(filter);

  const filterTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
    )
        return;

    setTodos((prevTasks) =>
        reorder(prevTasks, source.index, destination.index)
    );
};

  return (
    <div
      className="min-h-screen bg-gray-300 bg-[url('./src/assets/images/bg-mobile-light.jpg')] 
    bg-cover bg-no-repeat 
    dark:bg-gray-900 dark:bg-[url('./src/assets/images/bg-mobile-dark.jpg')]
    md:bg-[url('./src/assets/images/bg-desktop-light.jpg')] 
    md:dark:bg-[url('./src/assets/images/bg-desktop-dark.jpg')]"
      //das sind meine break points
    >
        <Header></Header>
        <main className="container mx-auto mt-8 px-4 ">
          {/* md:max-w-xl */}
          <ToDoCreate createTodo={createTodo}></ToDoCreate>

        <DragDropContext onDragEnd={handleDragEnd}>
        <ToDoList
            todos={filterTodos(todos)}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          ></ToDoList>
        </DragDropContext>
        
          <ToDoComputed
            computedItemsLeft={computedItemsLeft}
            clearCompleted={clearCompleted}
          ></ToDoComputed>
        </main>
        <ToDoFilter changeFilter={changeFilter} filter={filter}></ToDoFilter>

        <p className="mt-8 text-center dark:text-gray-400">Drag and drop</p>
       
    </div>
  );
};
export default App;