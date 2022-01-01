import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/layout";
import { ChangeEvent, ReactElement, ReactNode, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  useDeleteTaskMutation,
  useGetTaskByIDQuery,
  useUpdateTaskMutation,
} from "../store/api";
import { selectFilter } from "../store/filter";
import { Filter, Task } from "../store/types";
import { HiTrash, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

function shouldDisplayTask(task: Task, filter: Filter) {
  return (
    filter === Filter.All ||
    (filter === Filter.Completed && task.completed) ||
    !task.completed
  );
}

function TaskDisplay({ task }: { task: Task }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  let { id, description, completed } = task;

  const actions: Action[] = [
    {
      icon: <HiOutlinePencil />,
      handler: () => alert("Editing"),
      label: "Edit the task",
    },
    {
      icon: <HiOutlineTrash />,
      handler: () => {
        deleteTask({ id });
      },
      label: "Delete the task",
    },
  ];

  return (
    <Flex role="group" justifyContent="center" alignItems="center">
      <Checkbox
        type="checkbox"
        // value={completed}
        size="lg"
        colorScheme={"red"}
        borderRadius="full"
        defaultChecked={completed}
        onChange={(event) => {
          updateTask({ id, completed: event.target.checked });
          // event.preventDefault
        }}
      />
      <Text
        p={2}
        color={completed ? "gray.500" : "gray.600"}
        cursor={"pointer"}
        textDecoration={completed ? "line-through" : null}
        onClick={() => {
          updateTask({ id, completed: !completed });
        }}
      >
        {description} {id}
      </Text>
      <Spacer />
      <HStack>
        {actions.map((action, idx) => {
          return <ActionButton key={idx} {...action} />
        })}
      </HStack>
    </Flex>
  );
}

type Action = {
  icon: ReactElement<any, any>;
  handler: () => void;
  label: string;
};

function ActionButton(props: Action) {
  return (
    <IconButton
      aria-label={props.label}
      variant={"ghost"}
      size="lg"
      minWidth="fit-content"
      height="fit-content"
      p={1}
      color="gray.500"
      _hover={{ color: "gray.700" }}
      icon={props.icon}
      display={"none"}
      _groupHover={{ display: "inline" }}
      onClick={props.handler}
    />
  );
}

export default TaskDisplay;
