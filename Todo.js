// Display a checklist with multiple options that can select
// and the selected options are dynamically displayed on the screen.

// lessons learnt:
// 1. Never change props in receiving components.
// Especially arrays and arrays of objects.
// They may be changed in the parent that owns the prop.
// Even in parent change them immutably.
// Also, just changing props in parent, does not cause re-render.
// For re=render to happen a state needs to be defined, and setState called.
// 2. When state is updated never mutate previous state, always change it immutably.
// 3. When arrays are displayed using map, try not to delete or rearrange items.
// Its okay to append items. This is because, the index is used as key by default
// and it works well without deletes and rearranges. If deletes and rearranges are needed
// then try to come up with a a unique key for each item in array and set as key.
// In most cases it is just simple to avoid deletes and rearranges.
// 4. Regarding previous point, It is much better to generate unique keys using nanoid
// during creation of the array items, instead of using index. Don't generate nanoid
// during rendering as that will cause components to be re=created for each re-render.

import { useState } from "react";
import { nanoid } from "nanoid";

function useTodoBar(onSubmit) {
  const [barText, setBarText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(barText);
    setBarText("");
  }

  // render inputs:
  // - barText
  // - setBarText
  // - handleSubmit
  const barContent = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={barText}
        onChange={(e) => setBarText(e.target.value)}
      />
    </form>
  );

  return barContent;
}

function DisplayTodos({ todos }) {
  function displayTodo(item, index) {
    return <li key={item.id}>{item.str}</li>;
  }

  const style = { display: "table-cell", listStyleType: "none" };
  return <ul style={style}>{todos.map(displayTodo)}</ul>;
}

function DisplayCheckBoxes({ todos, setTodosRemove }) {
  function displayCheckBox(item, index) {
    function setTodosRemoveI() {
      setTodosRemove(index);
    }

    const handleClick = setTodosRemoveI;

    return (
      <li key={item.id}>
        <input type="checkbox" onClick={handleClick} />
      </li>
    );
  }

  const style = { display: "table-cell", listStyleType: "none" };
  return <ul style={style}>{todos.map(displayCheckBox)}</ul>;
}

function fetchTodos() {
  const todos = [
    { str: "item1", id: nanoid() },
    { str: "item2", id: nanoid() },
    { str: "item3", id: nanoid() },
  ];
  return todos;
}

function TodoLcl() {
  const [todos, setTodos] = useState(fetchTodos());

  function setTodosAdd(todoStr) {
    if (!todoStr) {
      return;
    }
    // make a new array, otherwise no re-render.
    const newTodos = [...todos, { str: todoStr, id: nanoid() }];
    setTodos(newTodos);
  }

  function setTodosRemove(index) {
    // make a new array, otherwise no re-render.
    const newTodos = todos.slice();
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function setTodosReset() {
    const ft = fetchTodos();
    setTodos(ft);
  }

  const handleResetClick = setTodosReset;

  const barContent = useTodoBar(setTodosAdd);

  // render inputs:
  // - barContent
  // - handleResetClick
  // - todos
  // - setTodosRemove
  return (
    <>
      {barContent}
      <DisplayCheckBoxes {...{ todos, setTodosRemove }} />
      <DisplayTodos {...{ todos }} />
      <button onClick={handleResetClick}>Reset</button>
    </>
  );
}

function Todo() {
  return <TodoLcl />;
}

export default Todo;
