import React, { Dispatch, SetStateAction } from 'react';
import InputField from '../ui/forms/input-field';

interface SearchFormProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchTodoForm({ search, setSearch }: SearchFormProps) {
  interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  // Handle search
  const handleSearch = (event: ChangeEvent) => {
    setSearch(event.target.value);
  };

  return (
    <InputField
      id="search"
      name="search"
      value={search}
      onChange={handleSearch}
      placeholder="Search..."
    />
  );
}
