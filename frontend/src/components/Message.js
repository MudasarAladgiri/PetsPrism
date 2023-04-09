// import React from "react";

// const Message = ({ variant, children }) => {
//   return (
//     <div
//       className={`bg-${variant}-200 p-4 rounded-md border ${
//         variant === "!" ? "text-red-700 bg-red-400" : "text-gray-700"
//       }`}
//     >
//       <span
//         className={`${
//           variant === "!" ? "text-red-900 bg-red-400" : "text-gray-900"
//         } font-bold`}
//       >
//         {variant.toUpperCase()}:{" "}
//       </span>
//       <span>{children}</span>
//     </div>
//   );
// };

// Message.defaultProps = {
//   variant: "info",
// };

// export default Message;

import React from "react";

const Message = ({ variant, children }) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-100 text-blue-900";
      // case 'secondary':
      //   return 'bg-gray-100 text-gray-900';
      case "success":
        return "bg-green-100 text-green-900";
      // case 'warning':
      //   return 'bg-yellow-100 text-yellow-900';
      case "danger":
        return "bg-red-100 text-red-900";
      default:
        return "bg-blue-100 text-blue-900";
    }
  };

  const variantStyle = getVariantStyle();

  return (
    <div
      className={"alert text-sm py-2 px-3 rounded-lg " + variantStyle}
      role="alert"
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "primary",
};

export default Message;
