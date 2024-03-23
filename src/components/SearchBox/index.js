import React, { useState } from "react";

import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

export default function SearchInput({ onInput }) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onInput(inputValue);
  };

  return (
    <Form onSubmit={(e) => handleSearch(e)}>
      <InputGroup>
        <FormControl
          placeholder="Search..."
          aria-label="Search..."
          aria-describedby="basic-addon2"
          size="sm"
          value={inputValue}
          onChange={handleChange}
        />
        <Button size="sm" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}
