import TableHeading from '@/Components/TableHeading';
import {  TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { router } from '@inertiajs/react';

export default function TasksTable({ tasks, queryParams }) {
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('task.index', queryParams));
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChanged(name, e.target.value);
        }
    }
    const sortChanged = (name) => {
        let direction = 'asc';
        if (queryParams.sort === name && queryParams.direction === 'asc') {
            direction = 'desc';
        }
        queryParams.sort = name;
        queryParams.direction = direction;
        router.get(route('task.index', queryParams));
    }

    return (
        <div className="py-12">
                <div className="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-100">
                            <div className="overflow-auto ">
                            <table className="w-full text-sm tex-left rtl:text-right ">
                                <thead className=" text-white dark:text">
                                    <tr className="bg-slate-600 border-b-2 border-blue-900">
                                        <th className='cursor-pointer' onClick={e => sortChanged('id')}>
                                            <TableHeading bySort="id" queryParams={queryParams}>ID</TableHeading>
                                        </th>
                                        <th>
                                            IMAGE
                                        </th>
                                        <th>
                                            PROJECT NAME
                                        </th>
                                        <th className='cursor-pointer' onClick={e => sortChanged('name')}>
                                            <TableHeading bySort="name" queryParams={queryParams}>NAME</TableHeading>
                                        </th>
                                        <th className='cursor-pointer' onClick={e => sortChanged('status')} >
                                            <TableHeading bySort="status" queryParams={queryParams}>STATUS</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('created_at')} className="cursor-pointer px-3 py-3">
                                            <TableHeading bySort="created_at" queryParams={queryParams}>CREATED DATE</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('due_date')} className="cursor-pointer px-3 py-3">
                                            <TableHeading bySort="due_date" queryParams={queryParams}>DUE DATE</TableHeading>
                                        </th>
                                        <th className="px-3 py-3">
                                            CREATED BY
                                        </th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th className="p-3">
                                            
                                        </th>
                                        <th className="p-3"></th>
                                        <th className="p-3">
                                            
                                        </th>
                                        <th className="p-3">
                                            <TextInput 
                                                placeholder="Search Task Name"
                                                onKeyPress={e => onKeyPress('name', e)}
                                                className="w-full"
                                            />
                                        </th>
                                        <th className="p-3">
                                            <SelectInput 
                                                className="w-full"
                                                onChange={e => searchFieldChanged('status', e.target.value)} 
                                                value={queryParams.status}
                                            >
                                                <option value="all">All</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="p-3">
                                            
                                        </th>
                                        <th className="p-3">
                                            
                                        </th>
                                        <th className="p-3">
                                            
                                        </th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task, index) => (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-3">{task.id}</td>
                                            <td className="p-3">
                                                <img src={task.image_path} alt={task.name} className="h-10 w-10 rounded-full" />
                                            </td>
                                            <td className="p-3 max-w-48 text-gray-400">{task.project.name}</td>
                                            <td className="p-3 max-w-48 font-extrabold">{task.name}</td>
                                            <td>
                                                <div className={"p-1 text-center rounded-md justify-center " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">{task.created_at}</td>
                                            <td className='p-3 text-center'>{task.due_date}</td>
                                            <td className="p-3">{task.created_by.name}</td>
                                            <td className="p-3">
                                                <a href={route('task.show', task.id)} className="text-blue-500 hover:text-blue-700">View</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}