import { CSSProperties } from "react";

export const Button = ({
  children,
  style,
}: {
  children: string;
  style?: CSSProperties;
}) => {
  return (
    <button
      style={{
        cursor: "pointer",
        height: "40px",
        border: "none",
        borderRadius: "5px",
        background: "#5783db",
        color: "white",
        fontSize: "20px",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
