import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TasksTable from '../Task/TasksTable';

export default function Show({auth, user, queryParams}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                    {user.name}
                    <PrimaryButton
                        className="float-right"
                        onClick={() => router.get(route('user.edit', user.id))}
                    >
                        Edit user
                    </PrimaryButton>
                </h2>
            }>
            <Head title={user.name} />
            
            <div className='py-10'>
                <div className='bg-gray-800 m-10 p-10 text-white rounded-md'>
                    <div className='flex justify-between'>
                        <div className='w-full my-5 me-5'>
                            <div className='my-3'>
                                <h2 className="font-extrabold">User ID</h2>
                                <p>{user.id}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">User Name</h2>
                                <p>{user.name}</p>
                            </div>
                            
                        </div>
                        <div className='w-full my-5 ms-5'>
                            <div className='my-3'>
                                <h2 className="font-extrabold">User Email</h2>
                                <p>{user.email}</p>
                            </div>
                            <div className='my-3'>
                                <h2 className="font-extrabold">Created Date</h2>
                                <p>{user.created_at}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>

        </AuthenticatedLayout>
    );
}