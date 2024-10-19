import styles from "./styles.module.scss";
import { Search } from "@/icons/Search";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  maxLength?: number;
  setFilterTerm: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  maxLength = 100,
  setFilterTerm,
}) => {
  return (
    <div className={styles.formControl}>
      <input
        type="search"
        name="search"
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => setFilterTerm(e.target.value)}
        autoComplete="off"
      />
      <button type="submit">
        <Search color="#aaa" />
      </button>
    </div>
  );
};

export default SearchBar;
