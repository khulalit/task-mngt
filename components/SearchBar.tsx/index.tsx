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
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!searchTerm.trim()) return;

  //   try {
  //     const response = await fetch(
  //       `/api/task?q=${encodeURIComponent(searchTerm)}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
