import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "draft-js/dist/Draft.css";
import store from "./store";

import { Editor, EditorState, CompositeDecorator } from "draft-js";

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
const HashtagSpan = (props) => {
  return (
    <Text bg="red.200" {...props} as="span">
      {props.children}
    </Text>
  );
};
const compositeDecorator = new CompositeDecorator([
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
]);
function RichEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(compositeDecorator)
  );

  return (
    <Editor
      editorState={editorState}
      onChange={(state) => {
        setEditorState(state);
        console.log(editorState.getCurrentContent());
      }}
      placeholder="Welcome"
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
        {/* <Box border="1px" width={"840px"} p={1}>
          <RichEditor />
        </Box> */}
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
