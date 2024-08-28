
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksTable from './TasksTable';
import PrimaryButton from '@/Components/PrimaryButton';
import {router} from '@inertiajs/react';



export default function index({ auth, tasks, queryParams=null }) {
    
    
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                Tasks
                <PrimaryButton
                    className="float-right"
                    onClick={() => router.get(route('task.create'))}
                >
                    Create Task
                </PrimaryButton>
            </h2>}>
            <Head title="TasAks" />
            <TasksTable tasks={tasks} queryParams={queryParams} displayProjectName={true}/>
        </AuthenticatedLayout>
    );
}