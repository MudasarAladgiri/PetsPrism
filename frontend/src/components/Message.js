import React from "react";

const Message = ({ variant, children }) => {
  //   return (
  //     <div className={variant} role="alert">
  //       {children}
  //     </div>
  //   );
  // };
  // Message.defaultProps = {
  //   variant: "info",
  // };
  return (
    <div
      className={`bg-${variant}-200 p-4 rounded-md border ${
        variant === "danger" ? "text-red-700" : "text-gray-700"
      }`}
    >
      <span
        className={`${
          variant === "danger" ? "text-red-900" : "text-gray-900"
        } font-bold`}
      >
        {variant.toUpperCase()}:{" "}
      </span>
      <span>{children}</span>
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;

// import React from 'react'
// import {Alert} from "react-bootstrap"

// const Message = (variant, children) => {
//   return (
//     <Alert variant={variant}>
//       {children}
//     </Alert>
//   )
// }
// Message.defaultProps={
//     variant:"info",
// }

// export default Message
