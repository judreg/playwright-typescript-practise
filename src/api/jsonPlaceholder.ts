import axios, { AxiosInstance } from "axios";
import { User } from "../types/jsonPlaceholder.interface";
import { expect } from "@playwright/test";

export class JsonPlaceholderApi {
  protected baseUrl: string;
  protected client: AxiosInstance;

  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await this.client.get(`users`);
      expect(response.status).toEqual(200);

      console.log("Returned users:");
      response.data.forEach((user) => {
        console.log(`${user.name} | ${user.email}`);
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}
