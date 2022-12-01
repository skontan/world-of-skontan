import React from "react";

type Props = {
  children?: React.ReactNode;
} & React.CSSProperties &
  ({ row: boolean } | { column: boolean });

export const Flex: React.FC<Props> = ({ children, ...props }) => {
  const isColumn = "column" in props && props.column;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isColumn ? "column" : "row",
        ...props,
      }}
    >
      {children}
    </div>
  );
};
