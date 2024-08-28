
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';

export default function Show({auth, project }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                    {project.name}
                    <PrimaryButton
                        className="float-right"
                        onClick={() => router.get(route('project.edit', project.id))}
                    >
                        Edit Project
                    </PrimaryButton>
                </h2>
            }>
            <Head title={project.name} />
            
            <div className='mx-10 mt-10 p-10 text-white bg-gray-800'>
                <img src={project.image_path} alt={project.name} className='w-full' />
                <div className='flex  justify-between'>
                    <div className='w-full my-5 me-5'>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Project ID</h2>
                            <p>{project.id}</p>
                        </div>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Project Name</h2>
                            <p>{project.name}</p>
                        </div>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Project Status</h2>
                            <p className={`text-sm font-semibold w-28 text-center rounded-md ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </p>
                        </div>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Created By</h2>
                            <p>{project.created_by.name}</p>
                        </div>
                    </div>
                    <div className='w-full my-5 ms-5'>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Due Date</h2>
                            <p>{project.due_date}</p>
                        </div>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Create Date</h2>
                            <p>{project.created_at}</p>
                        </div>
                        <div className='my-3'>
                            <h2 className="font-extrabold">Updated By</h2>
                            <p>
                                {project.updated_by.name}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="font-extrabold">Description</h2>
                    <p>{project.description}</p>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}