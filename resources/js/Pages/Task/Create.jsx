import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import React, { useState } from 'react';

import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";

import Swal from 'sweetalert2';


export default function Create({ auth, projects, users }) {

    console.log(projects);
    console.log(users);
    const {data, setData, post, errors, reset} =useForm({
        image:'',
        name:'',
        description:'',
        status:'',
        priority:'',
        due_date:'',
        project_id: 0,
        assigned_user_id: 0,
    });

    const [previewImage, setPreviewImage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        //TODO: deberia validar primero si el formulario es valido
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, save it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Saved!",
                text: "Your task has been saved.",
                icon: "success"
              });
              post(route("task.store"));
            }
          });   
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                    Create Task
                </h2>
            }
        >
            <Head title="Create Task" />

            <div className='py-10'>
                <div className='bg-gray-800 m-10 p-10 text-white'>
                    <form 
                        onSubmit={onSubmit}
                        className="">
                        <div className="grid grid-cols-2">
                            <div className="col-start-1 px-10">
                                <div className="my-10">
                                    <InputLabel htmlFor="task_name" value="Task Name" />
                                    <TextInput 
                                        id="task_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        name="task_name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="task_status" value="Task Status" />
                                    <SelectInput
                                        id="task_status"
                                        className="mt-1 block w-full"
                                        name="task_status"
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
                                    <InputLabel htmlFor="task_priority" value="Task Priority" />
                                    <SelectInput
                                        id="task_priority"
                                        className="mt-1 block w-full"
                                        name="task_priority"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}>
                                        <option value="">Select a priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="project" value="Project from task" />
                                    <SelectInput
                                        id="project"
                                        className="mt-1 block w-full"
                                        name="project"
                                        
                                        onChange={(e) => setData('project_id',  e.target.value)}>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.project_id} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="assigned_user" value="Asigned user" />
                                    <SelectInput
                                        id="assigned_user"
                                        className="mt-1 block w-full"
                                        name="assigned_user"
                                        
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} />
                                </div>

                                <div className="my-10">
                                    <InputLabel htmlFor="task_due_date" value="Task Due Date" />
                                    <TextInput 
                                        id="task_due_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        name="task_due_date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} />
                                </div>
                            </div>
                            
                            <div className="col-start-2 px-10">
                                <div className="my-10">
                                    <InputLabel htmlFor="task_image" value="Task Image" />
                                    <input 
                                        type="file"
                                        id="task_image"
                                        className="mt-1 block w-full"
                                        name="task_image"
                                        onChange={(e) => {
                                            setData('image', e.target.files[0]);
                                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                        }}
                                    />
                                    <img src={previewImage
                                        ? previewImage
                                        : './images/placeholder.svg'}
                                        alt="Task Image"
                                        className="mt-2 w-40 h-40 object-cover rounded-3xl"
                                    />
                                    <InputError message={errors.image} />
                                </div>                                
                            </div>
                            
                        </div>
                        <div className="my-10 px-10">
                        <InputLabel htmlFor="task_description" value="Task Description" />
                        <TextAreaInput
                            id="task_description"
                            className="mt-1 block w-full"
                            name="task_description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} />
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                type="submit"
                                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-aññ hover:bg-emerald-300 ">
                                Create Task
                            </button>

                            <Link
                                href={route('task.index')}
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