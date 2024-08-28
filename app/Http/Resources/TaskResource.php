<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\User;

class TaskResource extends JsonResource
{
    
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->image_path,
            'status' => $this->status,
            'priority' => $this->priority,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'project' => (new ProjectResource($this->whenLoaded('project'))),
            'created_by' => (new UserResource($this->createdBy)),
            'updated_by' => (new UserResource($this->updatedBy)),
            'assigned_user' => (new UserResource($this->assignedUser)),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
