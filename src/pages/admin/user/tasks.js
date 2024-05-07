import React, { useState } from "react";
import { Button, Input, Group } from "@mantine/core";

const TaskForm = ({ onSubmit }) => {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ tasks });
    window.location.reload();
  };
  const handleAddTask = () => {
    setTasks([...tasks, { taskName: "", keyPoints: [""] }]);
  };

  const handleRemoveTask = () => {
    if (tasks.length > 0) {
      const updatedTasks = [...tasks];
      updatedTasks.pop();
      setTasks(updatedTasks);
    }
  };

  const handleAddKeyPoint = (index) => {
    const newKeyPoints = [...tasks[index].keyPoints, ""];
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, keyPoints: newKeyPoints } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveKeyPoint = (taskIndex) => {
    const newKeyPoints = [...tasks[taskIndex].keyPoints];
    newKeyPoints.pop();
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, keyPoints: newKeyPoints } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyPointChange = (taskIndex, keyPointIndex, value) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex
        ? {
            ...task,
            keyPoints: [
              ...task.keyPoints.slice(0, keyPointIndex),
              value,
              ...task.keyPoints.slice(keyPointIndex + 1),
            ],
          }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Group>
          <Button type="button" onClick={handleAddTask}>
            Add Task
          </Button>
          <Button type="button" onClick={handleRemoveTask}>
            Remove Task
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <div style={{ marginTop: "20px" }}>
        {tasks.map((task, taskIndex) => (
          <div
            key={taskIndex}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <Input
              value={task.taskName}
              onChange={(e) =>
                setTasks(
                  tasks.map((t, index) =>
                    index === taskIndex ? { ...t, taskName: e.target.value } : t
                  )
                )
              }
              placeholder={`Task ${taskIndex + 1} Name`}
              style={{ marginBottom: "10px" }}
            />
            {task.keyPoints.map((keyPoint, keyPointIndex) => (
              <div
                key={keyPointIndex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <Input
                  value={keyPoint}
                  onChange={(e) =>
                    handleKeyPointChange(
                      taskIndex,
                      keyPointIndex,
                      e.target.value
                    )
                  }
                  placeholder={`Key Point ${keyPointIndex + 1}`}
                  style={{ marginRight: "10px" }}
                />
                {keyPointIndex === task.keyPoints.length - 1 && (
                  <Button onClick={() => handleRemoveKeyPoint(taskIndex)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={() => handleAddKeyPoint(taskIndex)}>
              Add Key Point
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskForm;
