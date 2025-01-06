import React from "react";

const TestCom = () => {
  return <div></div>;
};
const Test = React.memo(TestCom);
export default Test;

// const Greeting = memo(function Greeting({ name }) {
//   return <h1>Hello, {name}!</h1>;
// });

// export default Greeting;
