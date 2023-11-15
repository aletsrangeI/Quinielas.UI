import {
    buildCreateApi,
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  
  export const QuinielaAuth = createApi({
    reducerPath: "api/Users",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:5248/",
    }),
  
    endpoints: (builder) => ({
      authenticate: builder.mutation({
        query: ({ UserName, Password }) => ({
          url: "api/Users/authenticate",
          method: "POST",
          body: { UserName, Password, Token: "", FirstName: "", LastName: "" },
        }),
      }),
    }),
  });
  
  export const { useAuthenticateMutation } = QuinielaAuth;
  