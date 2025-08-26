import { TaskPriority, TaskStatus, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "@/components/client/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.ToDo);
  const [taskPriority, setTaskPriority] = useState<TaskPriority>(
    TaskPriority.Backlog
  );
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status: taskStatus,
      priority: taskPriority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });
  };

  const isFormValid = () => {
    return title && authorUserId && !(id !== null || projectId);
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 " +
    "dark:border-[color:var(--color-dark-tertiary)] " +
    "dark:bg-[color:var(--color-dark-tertiary)] " +
    "dark:text-[color:var(--color-text-white)] " +
    "dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm " +
    "dark:border-[color:var(--color-dark-tertiary)] " +
    "dark:bg-[color:var(--color-dark-tertiary)] " +
    "dark:text-[color:var(--color-text-white)] " +
    "dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={taskStatus}
            onChange={(e) =>
              setTaskStatus(
                TaskStatus[e.target.value as keyof typeof TaskStatus]
              )
            }
          >
            <option value="">Select TaskStatus</option>
            <option value={TaskStatus.ToDo}>To Do</option>
            <option value={TaskStatus.WorkInProgress}>Work In Progress</option>
            <option value={TaskStatus.UnderReview}>Under Review</option>
            <option value={TaskStatus.Completed}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={taskPriority}
            onChange={(e) =>
              setTaskPriority(
                TaskPriority[e.target.value as keyof typeof TaskPriority]
              )
            }
          >
            <option value="">Select TaskPriority</option>
            <option value={TaskPriority.Urgent}>Urgent</option>
            <option value={TaskPriority.High}>High</option>
            <option value={TaskPriority.Medium}>Medium</option>
            <option value={TaskPriority.Low}>Low</option>
            <option value={TaskPriority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="ProjectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
            bg-[color:var(--color-blue-primary)] px-4 py-2 text-base font-medium text-[color:var(--color-text-white)] shadow-sm 
            hover:bg-[color:var(--color-blue-600)] 
            focus:outline-none focus:ring-2 focus:ring-[color:var(--color-blue-600)]
            ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
