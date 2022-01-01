import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Task } from "./types";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  tagTypes: ["Task"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => "tasks",
      providesTags: ["Task"],
      transformResponse(response: Task[]) {
        return response.sort((a,b) => {
          if(a.completed) {
            return b.completed ? 0 : 11;
          }
          return b.completed ? -1 : 0;
        })
      },
    }),
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: () => ["Task"],
      transformResponse: (response: { data: Task }) => response.data,
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", null, (draft) => {
            // console.log(draft[0].description);
            draft.map((x) => {
              // x.description = "Pasta";
              if (x.id === patch.id) {
                Object.assign(x, patch);
              }
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query(body) {
        return {
          url: `tasks`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<Task, Pick<Task, 'id'>>({
      query(body) {
        return {
          url:  `tasks/${body.id}`,
          method: 'DELETE',
          // body
        }
      },
      invalidatesTags: ["Task"]
    })
  }),
});

export const {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation
} = api;

export default api;
