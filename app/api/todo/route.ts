"use server";

import { getAllTodos } from "@/services/todos/get-all-todos";
import { NextResponse, NextRequest } from "next/server";
import { addTodo } from "@/services/todos/add-todo";
import SuccessApiResponseHandler from "@/lib/handlers/api-handler/success-api-response-handler";
import ErrorApiResponseHandler from "@/lib/handlers/api-handler/error-api-response-handler";
import { Todo } from "@/types/todo";

export async function GET(req: NextRequest, res: NextResponse) {
  // get only for search query;
  const search = (new URL(req.url).searchParams.get("search") as string) || "";

  // Get all todos data function
  const todos = await getAllTodos(search);

  // Return response
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest, res: NextResponse) {
  // Parse the JSON data from the request body
  const bodyDataText = await req.text();

  // Parse the JSON data
  const body: Todo = JSON.parse(bodyDataText);

  try {
    // Add todos data function
    await addTodo(body);

    // Format response
    const response = new SuccessApiResponseHandler().withData(body);

    // Return response data
    return NextResponse.json(response);
  } catch (error) {
    // Format error response
    const err = new ErrorApiResponseHandler();

    // Return error data
    return NextResponse.json(err, { status: err.statusCode });
  }
}
