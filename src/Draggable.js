import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const Draggable = ({ id, children, depth }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    marginLeft: depth * 10,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default Draggable;
