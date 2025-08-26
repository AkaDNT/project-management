"use client";

import Header from "@/components/client/Header";
import { useGetProjectsQuery } from "@/state/api";
import { RootState } from "@/state/store";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

type TaskTypeItems = "task" | "milestone" | "project";

const cssVar = (name: string, fallback = "") =>
  typeof window !== "undefined"
    ? getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback
    : fallback;

const Timeline = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  // Đọc màu Gantt từ CSS variables
  const projectBg = isDarkMode
    ? cssVar("--color-gantt-project-bg-dark", "#101214")
    : cssVar("--color-gantt-project-bg", "#1f2937");
  const projectProgress = isDarkMode
    ? cssVar("--color-gantt-project-progress-dark", "#1f2937")
    : cssVar("--color-gantt-project-progress", "#aeb8c2");
  const projectProgressSelected = isDarkMode
    ? cssVar("--color-gantt-project-progress-selected-dark", "#000000")
    : cssVar("--color-gantt-project-progress-selected", "#9ba1a6");

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
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
      </header>

      <div className="overflow-hidden rounded-md bg-[color:var(--color-surface)] shadow dark:bg-[color:var(--color-dark-secondary)] dark:text-[color:var(--color-text-white)]">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={projectBg}
            projectProgressColor={projectProgress}
            projectProgressSelectedColor={projectProgressSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
