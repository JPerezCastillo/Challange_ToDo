const ToDoComputed = ({computedItemsLeft, clearCompleted}) => {
    return(
        <section className="flex justify-between rounded-b-md bg-white px-4 py-4 dark:bg-gray-800 transition-all duration-1000">
        <span className="text-gray-400"> {computedItemsLeft} Items Left </span>
        <button className="text-gray-400" onClick={clearCompleted}> Clear complete </button>
      </section>
    );
}
export default ToDoComputed;