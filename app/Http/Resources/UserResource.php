<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class UserResource extends JsonResource
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
            'email' => $this->email,
            // 'email_verified_at' => $this->email_verified_at,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            // 'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
