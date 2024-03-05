"use server";

import { NextResponse, NextRequest } from "next/server";
import { Todo } from "@/types/todo";
import { getTodoById } from "@/services/todos/get-todo-by-id";
import { deleteTodo } from "@/services/todos/delete-todo";
import { updateTodo } from "@/services/todos/update-todo";
import SuccessApiResponseHandler from "@/lib/handlers/api-handler/success-api-response-handler";
import ErrorApiResponseHandler from "@/lib/handlers/api-handler/error-api-response-handler";

export async function GET(req: NextRequest) {
  // Get only for search query;
  const url = new URL(req.url);

  //   Get id from path name
  const id = url.pathname.split("/").pop() as string;

  // Get todos data by id function
  const todo = await getTodoById(id);

  // Return data
  return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  // Get only for search query;
  const url = new URL(req.url);

  //   Get id from path name
  const id = url.pathname.split("/").pop() as string;

  try {
    // Delete data function
    await deleteTodo(id);

    //  Format response data
    const response = new SuccessApiResponseHandler();

    // Return data
    return NextResponse.json(response);
  } catch (error) {
    // Format error response
    const err = new ErrorApiResponseHandler();

    // Return error data
    return NextResponse.json(err, { status: err.statusCode });
  }
}

export async function PUT(req: NextRequest) {
  // Get only for search query;
  const url = new URL(req.url);

  // Parse the JSON data from the request body
  const bodyDataText = await req.text();

  // Parse the JSON data
  const body: Todo = JSON.parse(bodyDataText);

  //   Get id from path name
  const id = url.pathname.split("/").pop() as string;

  try {
    // Update todos data function
    await updateTodo(id, body);

    // Format response data
    const response = new SuccessApiResponseHandler().withData(body);

    // Return data
    return NextResponse.json(response);
  } catch (error) {
    // Format error response
    const err = new ErrorApiResponseHandler();

    // Return error data
    return NextResponse.json(err, { status: err.statusCode });
  }
}
