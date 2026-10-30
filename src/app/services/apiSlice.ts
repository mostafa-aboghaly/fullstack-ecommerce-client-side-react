import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: import.meta.env.VITE_SERVER_URL,
    }),
    {
      maxRetries: 2,
    },
  ),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query({
      query: (arg: { page: number; limit?: number }) => {
        const { page, limit = 10 } = arg;
        return {
          url: `/api/products?fields[0]=title&fields[1]=description&fields[2]=price&fields[3]=stock&populate[thumbnail]=true&populate[category]=true&pagination[page]=${page}&pagination[pageSize]=${limit}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getSingleProduct: builder.query({
      query: (arg: { documentId: string | undefined }) => {
        const { documentId } = arg;
        return {
          url: `/api/products/${documentId}?populate[thumbnail]=true`,
        };
      },
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/categories",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "Categories" as const,
                id,
              })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),

    updateDashboardProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getDashboardProducts", id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    createDashboardProduct: builder.mutation({
      query: ({ body }) => ({
        url: `/api/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getDashboardProducts", id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteDashboardProduct: builder.mutation({
      query: (documentId) => ({
        url: `/api/products/${documentId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});
export const {
  useGetDashboardProductsQuery,
  useGetSingleProductQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
  useGetCategoriesQuery,
  useCreateDashboardProductMutation,
} = apiSlice;
