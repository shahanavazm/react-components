// Build a simple search filter functionality to display a filtered list
// of fruits based on the search query entered by the user.

import { nanoid } from "nanoid";
import { useState } from "react";

function SearchFilterPure({ fruits, filterText, onFilterTextChange }) {
  const filtered = fruits.filter((m) => m.name.includes(filterText));
  return (
    <>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <ul>
        {filtered.map((fruit, i) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>
    </>
  );
}

function SearchFilterLcl({ fruits }) {
  const [filterText, setFilterText] = useState("");
  return (
    <SearchFilterPure
      fruits={fruits}
      filterText={filterText}
      onFilterTextChange={setFilterText}
    />
  );
}

export default function SearchFilter() {
  const fruits = [
    { name: "banana", id: nanoid() },
    { name: "apple", id: nanoid() },
    { name: "carrot", id: nanoid() },
    { name: "cucumber", id: nanoid() },
    { name: "strawberry", id: nanoid() },
    { name: "raspberry", id: nanoid() },
    { name: "blackberry", id: nanoid() },
  ];
  return <SearchFilterLcl fruits={fruits} />;
}
