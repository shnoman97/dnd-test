import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container } from "react-bootstrap";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import randomColor from "randomcolor";

function App() {
  const [items, setItems] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => `Item ${i + 1}`)
  );
  const [droppedItems, setDroppedItems] = useState({});

  const [activeId, setActiveId] = useState(null);
  const handleDropItem = (event) => {
    const { active, over } = event;

    if (over) {
      setDroppedItems((currentDroppedItems) => {
        const newDroppedItems = { ...currentDroppedItems };
        const activeId = active.id;
        const overId = over.id;

        Object.keys(newDroppedItems).forEach((key) => {
          if (newDroppedItems[key].includes(activeId)) {
            newDroppedItems[key] = newDroppedItems[key].filter(
              (id) => id !== activeId
            );
          }
        });

        if (overId === "root" || !newDroppedItems[activeId]) {
          newDroppedItems[overId] = [
            ...(newDroppedItems[overId] || []),
            activeId,
          ];
        }

        return newDroppedItems;
      });

      if (!Object.values(droppedItems).flat().includes(active.id)) {
        setItems((currentItems) =>
          currentItems.filter((item) => item !== active.id)
        );
      }
    } else {
      if (!Object.values(droppedItems).flat().includes(active.id)) {
        setItems((currentItems) =>
          currentItems.includes(active.id)
            ? currentItems
            : [...currentItems, active.id]
        );
      }
    }
  };

  const renderDroppable = (id, depth = 0) => {
    return (
      <Droppable key={id} id={id}>
        {droppedItems[id]?.map((childId) => (
          <div key={childId} style={{ backgroundColor: randomColor(1) }}>
            <Draggable id={childId} depth={depth}>
              <Item className="p-2 m-1 w-auto" value={childId} />
            </Draggable>
            {renderDroppable(childId, depth + 1)}
          </div>
        ))}
      </Droppable>
    );
  };
  return (
    <DndContext
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragEnd={handleDropItem}
    >
      <Container className="p-3" align="center">
        <h1>React Drag n Drop Nested Tree Example</h1>
        <main className="d-flex justify-content-around ">
          <div className="d-flex flex-column align-items-center">
            <h1>Draggable</h1>
            <div className="d-flex flex-column card text-white bg-light mb-3 w-100 h-100">
              {items.map((id) => (
                <Draggable key={id} id={id} depth={0}>
                  <Item className="p-2 m-1 w-auto" value={id} />
                </Draggable>
              ))}
              <DragOverlay>
                {activeId ? (
                  <Item className="p-2 m-1 w-auto" value={activeId} />
                ) : null}
              </DragOverlay>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <h1>Droppable</h1>
            <div className="w-100 h-100">{renderDroppable("root")}</div>
          </div>
        </main>
      </Container>
    </DndContext>
  );
}

const Item = ({ value }) => (
  <Card className="p-2 m-1 w-auto">{value?.item || value}</Card>
);

export default App;
