import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = ({ onAddUser }) => {
  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [{ name, age }, setUser] = useState({
    name: "",
    age: "",
  });
  const [error, setError] = useState(null);

  const clearInput = () => {
    setUser({
      name: "",
      age: "",
    });
  };

  const addUserHandler = (e) => {
    e.preventDefault();
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    onAddUser(name, age);
    clearInput();
  };

  const userChangeHandler = (e) => {
    setUser({
      name,
      age,
      [e.target.name]: e.target.value,
    });
  };

  // const usernameChangeHandler = (e) => {
  //   setEnteredUserName(e.target.value);
  // };

  // const ageChangeHandler = (e) => {
  //   setEnteredAge(e.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Add User</label>
          <input
            id="username"
            type="text"
            name="name"
            value={name}
            onChange={userChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            name="age"
            value={age}
            onChange={userChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
