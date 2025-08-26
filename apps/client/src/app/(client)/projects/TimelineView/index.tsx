import { useGetTaskQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const cssVar = (name: string, fallback = "") =>
  typeof window !== "undefined"
    ? getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback
    : fallback;

const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.data.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  // Lấy màu từ CSS variables để truyền vào Gantt (props nhận chuỗi màu)
  const barBg = isDarkMode
    ? cssVar("--color-gantt-bar-bg-dark", "#101214")
    : cssVar("--color-gantt-bar-bg", "#aeb8c2");
  const barBgSelected = isDarkMode
    ? cssVar("--color-gantt-bar-bg-selected-dark", "#000000")
    : cssVar("--color-gantt-bar-bg-selected", "#9ba1a6");
  console.log(barBg, barBgSelected);

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-[color:var(--color-text-white)]">
          Project Tasks Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-[color:var(--color-dark-secondary)] dark:bg-[color:var(--color-dark-secondary)] dark:text-[color:var(--color-text-white)]"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-[color:var(--color-surface)] shadow dark:bg-[color:var(--color-dark-secondary)] dark:text-[color:var(--color-text-white)]">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={barBg}
            barBackgroundSelectedColor={barBgSelected}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-[color:var(--color-blue-primary)] px-3 py-2 text-[color:var(--color-text-white)] hover:bg-[color:var(--color-blue-600)]"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
