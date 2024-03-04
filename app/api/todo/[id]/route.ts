"use server";

import { NextResponse, NextRequest } from "next/server";
import { Todo } from "@/types/todo";
import { getTodoById } from "@/services/todos/get-todo-by-id";
import { deleteTodo } from "@/services/todos/delete-todo";
import { updateTodo } from "@/services/todos/update-todo";
import ApiResponseHandler from "@/lib/handlers/api-handler/api-response-handler";

export async function GET(req: NextRequest) {
  // get only for search query;
  const url = new URL(req.url);

  //   Get id from path name
  const id = url.pathname.split("/").pop() as string;

  // get todos data from todo services
  const todo = await getTodoById(id);

  return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  // get only for search query;
  const url = new URL(req.url);

  //   Get id from path name
  const id = url.pathname.split("/").pop() as string;

  // get todos data from todo services
  await deleteTodo(id);

  //  format response data
  const response = new ApiResponseHandler(true, "Delete todo successfully!");

  return NextResponse.json(response);
}

export async function PUT(req: NextRequest) {
  // get only for search query;
  const url = new URL(req.url);
  // Parse the JSON data from the request body
  const bodyDataText = await req.text();
  // Parse the JSON data
  const body: Todo = JSON.parse(bodyDataText);

  //   Get id from path name
  const id = url.pathname.split("/").pop() as string;

  // Update todos data from todo services
  await updateTodo(id, body);

  const response = new ApiResponseHandler(true, "Update todo successfully!");

  return NextResponse.json(response);
}
