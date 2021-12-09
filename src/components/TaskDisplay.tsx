import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/layout";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTaskByIDQuery, useUpdateTaskMutation } from "../store/api";
import { selectFilter } from "../store/filter";
import { Filter, Task } from "../store/types";

function shouldDisplayTask(task: Task, filter: Filter) {
  return (
    filter === Filter.All ||
    (filter === Filter.Completed && task.completed) ||
    !task.completed
  );
}

function TaskDisplay({ task }: { task: Task }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  let { id, description, completed } = task;
  const filter = useSelector(selectFilter);
    const [isChecked, setIsChecked] = useState(completed);

  return (
    <Flex role="group">
      <Checkbox type='checkbox'
        // value={completed}
        size='lg'
        colorScheme={'red'}
        borderRadius='full'
        defaultChecked={completed}
        onChange={(event)=>{
            updateTask({id, completed: event.target.checked})
          // event.preventDefault
          }}
      />
      <Text
        p={2}
        color={completed ? 'gray.500' : 'gray.600'}
        cursor={"pointer"}
        textDecoration={completed ? "line-through" : null}
        onClick={() => {updateTask({id, completed: !completed})}}
      >
        {description} {id}
      </Text>
      <Spacer />
      <Text opacity={0} _groupHover={{opacity: 1}}>Edit</Text>
    </Flex>
  );
}

export default TaskDisplay;
