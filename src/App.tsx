import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import { useLocalTodos } from "./hooks/useLocalTodos";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

const initialData: Todo[] = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    createdAt: new Date(),
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    createdAt: new Date(),
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    createdAt: new Date(),
  },
];

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useLocalTodos(initialData);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
