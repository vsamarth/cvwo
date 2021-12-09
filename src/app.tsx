import {
  Center,
  Container,
  Heading,
  StackDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Box,
  Flex,
  useDisclosure
} from "@chakra-ui/react";
import FlipMove from 'react-flip-move';
import {motion} from 'framer-motion'
import {Button} from '@chakra-ui/react'
import { Tag, TagLabel } from "@chakra-ui/tag";
import {
  useAddTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "./store/api";
import { Text, Input } from "@chakra-ui/react";
import { FormEvent } from "react";
import TaskDisplay from "./components/TaskDisplay";
import { Task } from "./store/types";
function sortCompare(a: Task, b: Task) {
  if(a.completed) {
    return b.completed ? 0 : 1;
  }
  else if(b.completed) {
    return a.completed ? 0 : -11;
  }

  return 0;
}
function Tasks() {
  let { data: tasks, isLoading, isError, error } = useGetTasksQuery(null);
  // tasks = tasks.sort((a,b) => 0)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <FlipMove>
    <VStack
   divider={<StackDivider borderColor="gray.100" />}
   spacing={1}
   align="stretch"
 >
   {tasks
     .map((task) => (
       <TaskDisplay
         task={task}
         key={task.id + 100 * (task.completed ? 1 : 0)}
       />
     ))}
 </VStack></FlipMove>
  );
}

function App() {
  // const {getButtonProps} = useDisclosure()
  const { isOpen, onOpen, onClose, getButtonProps } = useDisclosure()
  console.log(getButtonProps)
  return (
    <Container maxW="container.md" py="4">
      <Heading textAlign="center" fontWeight="extrabold">
        Todo App
      </Heading>

      <HStack spacing={4}></HStack>
      {/* <InputTask /> */}
      <VStack align='stretch' spacing={8}>
      <Tasks />
      <Flex direction='row-reverse'>
        <Button onClick={onOpen} colorScheme='red' {...getButtonProps()}>Add Task</Button>
      </Flex>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            {/* <Lorem count={2} /> */}
            Hello World
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}><Button onClick={onClose} variant='ghost'>Cancel</Button>
            <Button onClick={onClose} colorScheme='red'>Add Task</Button></HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default App;
