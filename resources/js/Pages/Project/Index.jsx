import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";



export default function Index({ auth, projects, queryParams=null }) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index', queryParams));
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

        router.get(route('project.index', queryParams));
    }

    
    const { delete: deleteProject } = useForm();

    const handleDelete = (projectId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your project has been deleted.",
                icon: "success"
              });
              deleteProject(route('project.destroy', projectId));
            }
          });
    };

    


   
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                Projects
                <PrimaryButton
                    className="float-right"
                    onClick={() => router.get(route('project.create'))}
                >
                    Create Project
                </PrimaryButton>
            </h2>}>
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-100">
                            <div className="overflow-auto ">
                            <table className="w-full text-sm tex-left rtl:text-right ">
                                <thead className=" text-white dark:text">
                                    <tr className="bg-slate-600 border-b-2 border-blue-900">
                                        <th onClick={e => sortChanged('id')}>
                                            <TableHeading bySort="id" queryParams={queryParams}>ID</TableHeading>
                                        </th>
                                        <th className="px-3 py-3">IMAGE</th>
                                        <th onClick={e => sortChanged('name')}>
                                            <TableHeading bySort="name" queryParams={queryParams}>NAME</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('status')} >
                                            <TableHeading bySort="status" queryParams={queryParams}>STATUS</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('created_at')} className="px-3 py-3">
                                            <TableHeading bySort="created_at" queryParams={queryParams}>CREATED DATE</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('due_date')} className="px-3 py-3">
                                            <TableHeading bySort="due_date" queryParams={queryParams}>DUE DATE</TableHeading>
                                        </th>
                                        <th className="px-3 py-3">CREATED By</th>
                                        <th className="px-3 py-3t">ACTIONS</th>
                                    </tr>
                                </thead>
                                <thead className=" text-gray-900 dark:text">
                                    <tr className="bg-slate-500 border-b-2 border-blue-900">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full" defaultValue={queryParams.name} placeholder="Project Name"
                                            onBlur={e=> searchFieldChanged('name', e.target.value)}
                                            onKeyPress={e=>onKeyPress('name',e)}/>
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput
                                            className="w-full"
                                            defaultValue={queryParams.status || 'all'}
                                            onChange={(e)=>searchFieldChanged("status", e.target.value)}>
                                                <option value="all">All</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className="bg-white border-b dark:bg-gray-800 ">
                                            <td className="px-3 py-3">{project.id}</td>
                                            <td className="px-3 py-3">
                                                <img src={project.image_path} alt={project.name} className="w-8 h-8 rounded-full" />
                                            </td>
                                            <td className="px-3 py-3">{project.name}</td>
                                            <td className="px-3 py-3">
                                                <span className={`${PROJECT_STATUS_CLASS_MAP[project.status]} px-2 py-1 rounded-lg`}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">{project.created_at}</td>
                                            <td className="px-3 py-3">{project.due_date}</td>
                                            <td className="px-3 py-3">{project.created_by.name}</td>
                                            <td className="px-3 py-3">
                                                <Link href={route(
                                                    "project.edit", project.id)
                                                }
                                                className="text-blue-600 mx-1 hover:text-indigo-900">Edit</Link>
                                                <button onClick={e=>handleDelete(project.id)} className="text-red-600 mx-1 hover:text-indigo-900">
                                                    Delete
                                                </button>
                                                <Link href={route(
                                                    "project.show", project.id)
                                                }
                                                className="text-green-600 mx-1 hover:text-indigo-900">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            
                            <Pagination links={projects.meta.links} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}