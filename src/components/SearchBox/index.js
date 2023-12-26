import React, { useState } from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

export default function SearchInput({ setQueryString }) {
	const [inputValue, setInputValue] = useState("");
	const handleChange = (e) => {
		setInputValue(e.target.value);
	}

	const handleSearch = () => {
		setQueryString(inputValue)
	}

  return (
    <InputGroup>
      <FormControl
        placeholder="Search..."
        aria-label="Search..."
        aria-describedby="basic-addon2"
        value={inputValue}
        onChange={handleChange}
      />
			<Button onClick={handleSearch}>Search</Button>
    </InputGroup>
  );
};