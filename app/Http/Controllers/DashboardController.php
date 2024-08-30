<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        
        $totalInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();

        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();

        

        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', auth()->id())
            ->count();

        $myInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', auth()->id())
            ->count();
        
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', auth()->id())
            ->count();

        return inertia('Dashboard', compact(
            'totalPendingTasks',
            'totalCompletedTasks',
            'myPendingTasks',
            'myCompletedTasks',
            'totalInProgressTasks',
            'myInProgressTasks'
        ));
    }
}
