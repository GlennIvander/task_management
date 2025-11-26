<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{

    // GET /api/tasks
    public function index(Request $request)
    {
        Gate::authorize('modify', $request);
        $perPage = $request->query('per_page', 10);

        $tasks = Task::query()
            ->search($request->query('search'))
            ->status($request->query('status'))
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return new TaskCollection($tasks);
    }

    // GET /api/tasks/{id}
    public function show(Task $task)
    {
        Gate::authorize('modify', $task);
        return new TaskResource($task);
    }

    // POST /api/tasks
    public function store(StoreTaskRequest $request)
    {

        $task = $request->user()->tasks()->create($request->validated());

        return (new TaskResource($task))->response()->setStatusCode(201);
    }

    // PUT /api/tasks/{id}
    public function update(UpdateTaskRequest $request, Task $task)
    {
        Gate::authorize('modify', $task);
        $task->update($request->validated());

        return new TaskResource($task);
    }

    // DELETE /api/tasks/{id} (soft delete)
    public function destroy(Task $task)
    {
        Gate::authorize('modify', $task);
        $task->delete();

        return response()->json(['message' => 'Task soft deleted.'], 200);
    }
}
