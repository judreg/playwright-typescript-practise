import { test, expect } from "@playwright/test";
import { User } from "../src/types/jsonPlaceholder.interface";
import { JsonPlaceholderApi } from "../src/api/jsonPlaceholder";

test("'/users' endpoint should return users correctly", async ({}) => {
  const jsonPlaceholderApi: JsonPlaceholderApi = new JsonPlaceholderApi();
  const users: User[] = await jsonPlaceholderApi.getUsers();

  expect(users[0].email).toContain("@");
});
