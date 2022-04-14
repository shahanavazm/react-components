// Build a simple search filter functionality to display a filtered list
// of fruits based on the search query entered by the user.

import { nanoid } from "nanoid";
import { useTextInput } from "./util";

function DisplayFruits({ fruits }) {
  return (
    <ul>
      {fruits.map((fruit, i) => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  );
}

function SearchFilterPure({ inputText, inputProps, fruits }) {
  const filtered = fruits.filter((m) => m.name.includes(inputText));
  return (
    <>
      <input type="text" {...inputProps} />
      <DisplayFruits fruits={filtered} />
    </>
  );
}

function SearchFilter() {
  const fruits = [
    { name: "banana", id: nanoid() },
    { name: "apple", id: nanoid() },
    { name: "carrot", id: nanoid() },
    { name: "cucumber", id: nanoid() },
    { name: "strawberry", id: nanoid() },
    { name: "raspberry", id: nanoid() },
    { name: "blackberry", id: nanoid() },
  ];
  const [inputProps, inputText] = useTextInput("");
  return <SearchFilterPure {...{ inputText, inputProps, fruits }} />;
}

export default SearchFilter;
