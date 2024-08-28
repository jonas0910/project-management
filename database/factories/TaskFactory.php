<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'image_path' => $this->faker->imageUrl(),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'project_id' => \App\Models\Project::factory(),
            'created_by' => \App\Models\User::factory(),
            'updated_by' => \App\Models\User::factory(),
            'assigned_user_id' => \App\Models\User::factory(),
            
        ];
    }
}
