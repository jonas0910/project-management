<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Project;
use App\Models\User;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index()
    {
        $query = Task::query();
        
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if(request("status")){
            if(request("status") != "all")
                $query->where("status", request("status"));
        }

        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("sort") && request("direction")){
            $sortField = request("sort");
            $sortDirection = request("direction");
        }
        
        $tasks = $query->with('project')->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(2);

        return inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ? : null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::all();
        $users = User::all();
        return inertia('Task/Create', [
            "projects" => $projects,
            "users" => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        $image = $data['image'] ?? null;
        if($image){
            $data['image_path'] = $image->store('task/'.Str::random(), 'public');
        }
        
        Task::create($data);
        return redirect()->route('task.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load('project');
        return inertia('Task/Show', [
            "task" => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::all();
        $users = User::all();

        $task->load('project');
        return inertia('Task/Edit', [
            "task" => new TaskResource($task),
            "projects" => $projects,
            "users" => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        
        $data = $request->validated();
        $data['updated_by'] = auth()->id();

        $image = $data['image'] ?? null;
        if($image){
            if($task->image_path){
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/'.Str::random(), 'public');
        }

        $task->update($data);
        return redirect()->route('task.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        
        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();
        return redirect()->route('task.index');
    }
}
