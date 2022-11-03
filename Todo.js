// Display a checklist with multiple options that can select
// and the selected options are dynamically displayed on the screen.

import { useState } from "react";
import { nanoid } from "nanoid";

function fetchTodos() {
  const todos = [
    { str: "item1", id: nanoid() },
    { str: "item2", id: nanoid() },
    { str: "item3", id: nanoid() },
  ];
  return todos;
}

function TodoPure({
  todoText,
  todos,
  onTodoTextChange,
  onTodoTextSubmit,
  onIsDoneChange,
  onResetClick,
}) {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault() || onTodoTextSubmit()}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => onTodoTextChange(e.target.value)}
        />
      </form>
      <ul style={{ display: "table-cell", listStyleType: "none" }}>
        {todos.map((item, index) => (
          <li key={item.id}>
            <input type="checkbox" onClick={() => onIsDoneChange(index)} />
          </li>
        ))}
      </ul>
      <ul style={{ display: "table-cell", listStyleType: "none" }}>
        {todos.map((item) => (
          <li key={item.id}>{item.str}</li>
        ))}
      </ul>
      <button onClick={onResetClick}>Reset</button>
    </>
  );
}

export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(fetchTodos());

  function addTodo() {
    if (!todoText) {
      return;
    }
    const newTodos = [...todos, { str: todoText, id: nanoid() }];
    setTodos(newTodos);
    setTodoText("");
  }

  function removeTodos(index) {
    const newTodos = todos.slice();
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function resetTodos() {
    const ft = fetchTodos();
    setTodos(ft);
  }

  return (
    <TodoPure
      todoText={todoText}
      todos={todos}
      onTodoTextChange={setTodoText}
      onTodoTextSubmit={addTodo}
      onIsDoneChange={removeTodos}
      onResetClick={resetTodos}
    />
  );
}
