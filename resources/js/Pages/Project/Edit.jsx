import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';


export default function Edit({project, auth}) {
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
            
            <div className='py-10'>
                <div className='bg-gray-800 m-10 p-10 text-white'>
                    para editarrrr
                </div>
            </div>

        </AuthenticatedLayout>
    );
}