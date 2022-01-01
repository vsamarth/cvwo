import {
  Container,
  Heading,
  StackDivider,
  VStack,
  HStack,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGetTasksQuery } from "./store/api";
import Sidebar from "./components/Sidebar";
import { Input } from "@chakra-ui/react";
import TaskDisplay from "./components/TaskDisplay";
import { Filter, Task } from "./store/types";
import Create from "./components/TaskCreate";
import { useSelector } from "react-redux";
function sortCompare(a: Task, b: Task) {
  if (a.completed) {
    return b.completed ? 0 : 1;
  } else if (b.completed) {
    return a.completed ? 0 : -11;
  }

  return 0;
}
function Tasks() {
  const filter = useSelector((state) => state.filter);
  let { data: tasks, isLoading, isError, error } = useGetTasksQuery(null);
  // tasks = tasks.sort((a,b) => 0)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  tasks = tasks.filter((t) => {
    if (filter === Filter.All) {
      return true;
    } else if (filter === Filter.Pending) {
      return t.completed;
    } else {
      return !t.completed;
    }
  });

  return (
    <VStack
      divider={<StackDivider borderColor="gray.100" />}
      spacing={1}
      align="stretch"
    >
      {tasks.map((task) => (
        <TaskDisplay
          task={task}
          key={task.id + 100 * (task.completed ? 1 : 0)}
        />
      ))}
    </VStack>
  );
}

const Main = () => {
  return (
    <Container maxW="container.md" py="4">
      <Heading textAlign="center" fontWeight="extrabold">
        Todo App
      </Heading>

      <HStack spacing={4}></HStack>
      {/* <InputTask /> */}
      <VStack align="stretch" spacing={8}>
        <Tasks />

        <Create />
      </VStack>
    </Container>
  );
};

function App() {
  // const {getButtonProps} = useDisclosure()

  return (
    <Flex minHeight="100vh">
      <Sidebar />
      <Main />
    </Flex>
  );
}

export default App;
