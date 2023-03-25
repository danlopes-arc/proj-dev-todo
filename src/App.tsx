import { Button, Card, Checkbox, Container, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { v4 as uuid } from "uuid";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const onNewTodoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTodo(e.target.value)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const text = newTodo.trim();

    if (text.length === 0) {
      return;
    }

    setTodos([...todos, { id: uuid(), text, completed: false }]);
    setNewTodo("");
  }

  const onCompletedToggle = (todo: Todo) => {
    const index = todos.indexOf(todo);

    const newTodos = [...todos];
    newTodos[index] = { ...todo, completed: !todo.completed };
    setTodos(newTodos);
  };

  return (
    <Flex direction={"column"} justifyContent="center">
      <Container maxWidth="3xl">
        <Flex direction="column" gap={4} mt={4}>
          <Heading textAlign="center">Proj Dev Todo</Heading>
          <form onSubmit={onSubmit}>
            <Flex gap={2}>
              <Input borderWidth={2} value={newTodo} onChange={onNewTodoChange} />
              <Button type="submit" colorScheme={"blue"}>Add</Button>
            </Flex>
          </form>
          <Flex direction="column" gap={2}>
            {[...todos].reverse().map((todo) => (
              <Card
                key={todo.id}
                opacity={todo.completed ? 0.5 : 1}
                backgroundColor={todo.completed ? "gray.200" : "transparent"}>
                <Checkbox
                  colorScheme="gray"
                  flexGrow={1}
                  checked={todo.completed}
                  onChange={() => onCompletedToggle(todo)}
                  p={2}>
                  <Text fontSize="lg" textDecoration={todo.completed ? "line-through" : "none"}>
                    {todo.text}
                  </Text>
                </Checkbox>
              </Card>
            ))}
          </Flex>
        </Flex >
      </Container >
    </Flex >
  );
};