import { v4 as uuid } from 'uuid';
import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from './useLocalStorage';

const TODOS_LOKAL_KEY = 'todos';

export const useLocalTodos= (initialData: Todo[]) => {
  const { storeItem, getItem } = useLocalStorage<Todo[]>();

  const storeTodos = useCallback(
    (todos: Todo[]) => storeItem(TODOS_LOKAL_KEY, todos),
    [],
  );

  const [todos, setTodos] = useState<Todo[]>(
    getItem(TODOS_LOKAL_KEY) || initialData,
  );

  const addTodo = useCallback(
    (label: string) => {
      const updatedTodos = [
        {
          id: uuid(),
          label,
          checked: false,
          createdAt: new Date(),
        },
        ...todos,
      ]
      setTodos(updatedTodos);
      storeTodos(updatedTodos);
    },
    [todos],
  );

  const toggleTodo = useCallback(
    (todoId: string) => {
      const todoToToggle = todos.find((todo) => todo.id === todoId);

      const updatedTodo = {
        ...todoToToggle,
        checked: !todoToToggle.checked,
        completedAt: todoToToggle.checked ? new Date() : null,
      };

      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return updatedTodo;
        }

        return todo;
      });

      if (updatedTodo.checked) {
        const todoIndex = todos.findIndex((todo) => todo.id === todoId);

        updatedTodos.splice(todoIndex, 1);
        updatedTodos.push(updatedTodo);
      }

      setTodos(updatedTodos);
      storeTodos(updatedTodos);
    },
    [todos],
  );

  const deleteTodo = useCallback(
    (todoId) => {
      const updatedTodos = todos.filter((todo) => todoId !== todo.id);

      setTodos(updatedTodos);
      storeTodos(updatedTodos);
    },
    [todos]
  );

  const sortedTodos = useMemo(
    () => todos.sort(
      (firstTodo: Todo, secondTodo: Todo) => {
        if (!firstTodo.checked && !secondTodo.checked) {
          return new Date(firstTodo.createdAt).getTime() - new Date(secondTodo.createdAt).getTime();
        }

        if (firstTodo.checked && secondTodo.checked) {
          return new Date(firstTodo.completedAt).getTime() - new Date(secondTodo.completedAt).getTime();
        }

        return Number(firstTodo.checked) - Number(secondTodo.checked);
      }
    ),
    [todos],
  );

  return {
    todos: sortedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } as const;
}
