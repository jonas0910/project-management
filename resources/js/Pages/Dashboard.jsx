import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, ...props }) {
    console.log(props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-5">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-amber-500 text-xl font-semibold'>
                                Pending Tasks
                            </h3>
                            <p className='text-4xl mt-4' >
                                <span className='mx-2'>{props.myPendingTasks}</span>/
                                <span className='mx-2'>{props.totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-5">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-red-500 text-xl font-semibold'>
                                In Progress Tasks
                            </h3>
                            <p className='text-4xl mt-4' >
                                <span className='mx-2'>{props.myInProgressTasks}</span>/
                                <span className='mx-2'>{props.totalInProgressTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg  m-5">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-500 text-xl font-semibold'>
                                Completed Tasks
                            </h3>
                            <p className='text-4xl mt-4' >
                                <span className='mx-2'>{props.myCompletedTasks}</span>/
                                <span className='mx-2'>{props.totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
