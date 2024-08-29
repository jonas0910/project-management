'use client'
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";

export default function Create({ auth }) {

    const {data, setData, post, errors, reset} =useForm({
        image:'',
        name:'',
        description:'',
        status:'',
        due_date:'',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("project.store"));
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                    Create Project
                </h2>
            }
        >
            <Head title="Create Project" />

            <div className='py-10'>
                <div className='bg-gray-800 m-10 p-10 text-white'>
                    <form 
                        onSubmit={onSubmit}
                        className="">
                        <div className="grid grid-cols-2">
                            <div className="col-start-1 px-10">
                                <div className="my-10">
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput 
                                        id="project_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        name="project_name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput 
                                        id="project_image_path"
                                        type="file"
                                        className="mt-1 block w-full"
                                        name="project_image_path"
                                        
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} />
                                </div>
                            </div>
                            
                            <div className="col-start-2 px-10">
                                <div className="my-10">
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput
                                        id="project_status"
                                        className="mt-1 block w-full"
                                        name="project_status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}>
                                        <option value="">Select a status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="project_due_date" value="Project Due Date" />
                                    <TextInput 
                                        id="project_due_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        name="project_due_date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} />
                                </div>
                            </div>
                            
                        </div>
                        <div className="my-10 px-10">
                        <InputLabel htmlFor="project_description" value="Project Description" />
                        <TextAreaInput
                            id="project_description"
                            className="mt-1 block w-full"
                            name="project_description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} />
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                type="submit"
                                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-aññ hover:bg-emerald-300 ">
                                Create Project
                            </button>

                            <Link
                                href={route('project.index')}
                                className="inline-block align-start bg-red-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-400 ml-2 ">
                                Cancel
                            </Link>                            
                        </div>
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    )

}