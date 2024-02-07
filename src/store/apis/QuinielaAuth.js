import {
  buildCreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

export const QuinielaAuth = createApi({
  reducerPath: "api/Users",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5248/',
  }),

 endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: ({ UserName, Password }) => ({
        url: "api/Users/authenticate",
        method: "POST",
        body: { UserName, Password, Token: "", FirstName: "", LastName: "" },
      }),
    }),

    register: builder.mutation({
      query: ({ UserName, Password, FirstName, LastName }) => ({
        url: "api/Users/register",
        method: "POST",
        body: { UserName, Password, FirstName, LastName, UserId: 0, Token: "" },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

  }),
});

export const { useAuthenticateMutation, useRegisterMutation } = QuinielaAuth;
  