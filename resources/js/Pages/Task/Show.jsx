
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';

export default function Show({auth, task, queryParams}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                    {task.name}
                    <PrimaryButton
                        className="float-right"
                        onClick={() => router.get(route('task.edit', task.id))}
                    >
                        Edit Task
                    </PrimaryButton>
                </h2>
            }>
            <Head title={task.name} />
            
            <div className='py-10'>
                <div className='bg-gray-800 m-10 p-10 text-white rounded-md'>
                    <img src={task.image_path} alt={task.name} className='w-80 rounded-md' />
                    <div className='flex justify-between'>
                        <div className='w-full my-5 me-5'>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Task ID</h2>
                                <p>{task.id}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Task Name</h2>
                                <p>{task.name}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Task Status</h2>
                                <p className={`text-sm font-semibold w-28 text-center rounded-md ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Task Priority</h2>
                                <p className={`text-sm font-semibold w-28 text-center rounded-md ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}>
                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                </p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Created By</h2>
                                <p>{task.created_by.name}</p>
                            </div>
                        </div>
                        <div className='w-full my-5 ms-5'>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Due Date</h2>
                                <p>{task.due_date}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Create Date</h2>
                                <p>{task.created_at}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Updated By</h2>
                                <p>
                                    {task.updated_by.name}
                                </p>
                            </div>
                            <div className='my-3'>
                                <h2 className='font-extrabold'>Assigned user</h2>
                                <p>{task.assigned_user.name}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Project from task</h2>
                                <p>{task.project.name}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-extrabold">Description</h2>
                        <p>{task.description}</p>
                    </div>
                </div>
                
            </div>

        </AuthenticatedLayout>
    );
}