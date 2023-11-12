import { useDroppable } from "@dnd-kit/core";
import React from "react";

const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      className="d-flex flex-column card text-white bg-light mb-3 w-100 h-100"
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default Droppable;
