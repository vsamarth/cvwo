import {
  Box,
  Button,
  VStack,
  Flex,
  Collapse,
  Spacer,
  Input,
  Text,
  Stack,
  HStack,
  Spinner,
  useDisclosure,
  Fade,
  SlideFade,
} from "@chakra-ui/react";
import { Formik, Form, Field, useFormik } from "formik";
import { useAddTaskMutation } from "../store/api";

const descriptions = [
  "Watch Peaky Blinders",
  "Play Soccer",
  "Complete Linear Algebra Homework",
  "Buy stuff from Amazon",
  "Stop the Pandemic",
];
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function TaskCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addTask, { isLoading, data }] = useAddTaskMutation();

  return (
    <>
      <Box display={!isOpen ? "none" : null} transition="all 0.2s">
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values, { resetForm }) => {
            addTask({ description: values.title, completed: false });
            await sleep(800);
            resetForm();
          }}
        >
          {({ isSubmitting, resetForm, values }) => (
            <Form>
              <VStack spacing={6}>
                <Flex width="100%" grow={1}>
                  <Field
                    rounded="md"
                    name="title"
                    placeholder={
                      descriptions[
                        Math.floor(Math.random() * descriptions.length)
                      ]
                    }
                    as={Input}
                  />
                </Flex>
                <Flex
                  width={"100%"}
                  flexDirection="row-reverse"
                  sx={{ gap: "32px" }}
                >
                  <Button
                    width={24}
                    type="submit"
                    colorScheme="red"
                    disabled={isSubmitting || values.title.trim() === ""}
                  >
                    {isSubmitting ? <Spinner /> : "Add Task"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
      <Text
        onClick={onOpen}
        as="button"
        width="fit-content"
        _hover={{ color: "red.500" }}
        transition={"all 0.2s"}
        display={isOpen ? "none" : null}
      >
        {" "}
        + Hello World
      </Text>
    </>
  );
}
export default TaskCreate;
