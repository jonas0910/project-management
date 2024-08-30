import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";



export default function Index({ auth, users, queryParams=null }) {

    console.log(users);

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('user.index', queryParams));
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

        router.get(route('user.index', queryParams));
    }

    
    const { delete: deleteuser } = useForm();

    const handleDelete = (userId) => {
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
                text: "Your user has been deleted.",
                icon: "success"
              });
              deleteuser(route('user.destroy', userId));
            }
          });
    };

    


   
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                users
                <PrimaryButton
                    className="float-right"
                    onClick={() => router.get(route('user.create'))}
                >
                    Create user
                </PrimaryButton>
            </h2>}>
            <Head title="users" />

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
                                        <th onClick={e => sortChanged('name')}>
                                            <TableHeading bySort="name" queryParams={queryParams}>NAME</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('email')} >
                                            <TableHeading bySort="status" queryParams={queryParams}>STATUS</TableHeading>
                                        </th>
                                        <th onClick={e => sortChanged('created_at')} className="px-3 py-3">
                                            <TableHeading bySort="created_at" queryParams={queryParams}>CREATED DATE</TableHeading>
                                        </th>
                                        
                                        <th className="px-3 py-3t">ACTIONS</th>
                                    </tr>
                                </thead>
                                <thead className=" text-gray-900 dark:text">
                                    <tr className="bg-slate-500 border-b-2 border-blue-900">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full" defaultValue={queryParams.name} placeholder="User Name"
                                            onBlur={e=> searchFieldChanged('name', e.target.value)}
                                            onKeyPress={e=>onKeyPress('name',e)}/>
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full" defaultValue={queryParams.email} placeholder="User Email"
                                            onBlur={e=> searchFieldChanged('email', e.target.value)}
                                            onKeyPress={e=>onKeyPress('email',e)}/>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 ">
                                            <td className="px-3 py-3">{user.id}</td>
                                            <td className="px-3 py-3">{user.name}</td>
                                            <td className="px-3 py-3">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-3">{user.created_at}</td>
                                            <td className="px-3 py-3">
                                                <Link href={route(
                                                    "user.edit", user.id)
                                                }
                                                className="text-blue-600 mx-1 hover:text-indigo-900">Edit</Link>
                                                <button onClick={e=>handleDelete(user.id)} className="text-red-600 mx-1 hover:text-indigo-900">
                                                    Delete
                                                </button>
                                                <Link href={route(
                                                    "user.show", user.id)
                                                }
                                                className="text-green-600 mx-1 hover:text-indigo-900">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            
                            <Pagination links={users.meta.links} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}