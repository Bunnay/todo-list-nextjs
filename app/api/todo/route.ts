"use server";

import { getAllTodos } from "@/services/todos/get-all-todos";
import { NextResponse, NextRequest } from "next/server";
import { addTodo } from "@/services/todos/add-todo";
import { Todo } from "@/types/todo";
import ApiResponseHandler from "@/lib/handlers/api-handler/api-response-handler";

export async function GET(req: NextRequest, res: NextResponse) {
  // get only for search query;
  const search = (new URL(req.url).searchParams.get("search") as string) || "";

  // get todos data from todo services
  const todos = await getAllTodos(search);

  return NextResponse.json(todos);
}

export async function POST(req: NextRequest, res: NextResponse) {
  // Parse the JSON data from the request body
  const bodyDataText = await req.text();

  // Parse the JSON data
  const body: Todo = JSON.parse(bodyDataText);

  // Get todos data from todo services
  await addTodo(body);

  //  format response data
  const response = new ApiResponseHandler(true, "Add todo successfully!");

  return NextResponse.json(response);
}
