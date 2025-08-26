"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate: string;
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export enum TaskStatus {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum TaskPriority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  tags?: string;
  startDate?: string; // ISO date string
  dueDate?: string; // ISO date string
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

interface GetTasksResponse {
  statusCode: number;
  message: string;
  data: Task[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => ({
        url: "project",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (newProject) => ({
        url: "project",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    // getTask: build.query<Task[], { projectId: number }>({
    //   query: ({ projectId }) => `task?projectId=${projectId}`,
    //   providesTags: (result) =>
    //     result
    //       ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
    //       : [{ type: "Tasks" as const }],
    // }),
    getTask: build.query<GetTasksResponse, { projectId: number }>({
      query: ({ projectId }) => ({
        url: `task`,
        params: { projectId },
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: "Tasks" as const, id }))]
          : [{ type: "Tasks" as const }],
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: "task",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateStatusTask: build.mutation<Task, { taskId: number; status: string }>({
      query: (arg) => ({
        url: `task/${arg.taskId}/status`,
        method: "PATCH",
        body: { status: arg.status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateStatusTaskMutation,
} = api;
