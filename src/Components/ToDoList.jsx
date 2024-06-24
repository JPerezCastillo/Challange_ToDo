import { Droppable, Draggable } from "@hello-pangea/dnd";
import ToDoItem from "./ToDoItem";

const ToDoList = ({todos, removeTodo, updateTodo}) => {
  return (
    <Droppable droppableId="todos">
      {(droppableProvider) => (
        <div
          ref={droppableProvider.innerRef}
          {...droppableProvider.droppableProps}
          className="mt-8 overflow-hidden rounded-t-md bg-white transition-all duration-1000 dark:bg-gray-800 [&>article]:p-4"
        >
          {todos.map((todo,index) => (
          <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
            {
              (draggableProvider)=>(
                <ToDoItem
                todo={todo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                ref={draggableProvider.innerRef}
                {...draggableProvider.dragHandleProps}
                {...draggableProvider.draggableProps}
              ></ToDoItem>
              )
            }
          </Draggable>
        ))}
          {droppableProvider.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default ToDoList;
