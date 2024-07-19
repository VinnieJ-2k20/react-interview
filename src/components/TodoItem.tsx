import React, { FC, useCallback, useState } from "react";
import styled from "@emotion/styled";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  marginRight: 8,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export interface TodoItemProps {
  id: string;
  label: string;
  toggleTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
  checked?: boolean;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  toggleTodo,
  deleteTodo,
  checked = false,
}) => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const showDelete = useCallback(
    () => setIsDeleteVisible(true),
    [],
  );

  const hideDelete = useCallback(
    () => setIsDeleteVisible(false),
    [],
  );

  return (
    <Wrapper
      onMouseEnter={showDelete}
      onMouseLeave={hideDelete}
    >
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onClick={() => toggleTodo(id)}
      />
      <Label
        checked={checked}
        onClick={() => toggleTodo(id)}

      >
        {label}
      </Label>

      <button onClick={() => deleteTodo(id)}>
        X
      </button>
    </Wrapper>
  );
};
