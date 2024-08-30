import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import React, { useState } from 'react';

import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";

import Swal from 'sweetalert2';


export default function Create({ auth }) {

    const {data, setData, post, errors, reset} =useForm({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    });


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
                text: "Your user has been saved.",
                icon: "success"
              });
              post(route("user.store"));
            }
          });   
    }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight justify-around">
                    Create user
                </h2>
            }
        >
            <Head title="Create user" />

            <div className='py-10'>
                <div className='bg-gray-800 m-10 p-10 text-white'>
                    <form 
                        onSubmit={onSubmit}
                        className="">
                        <div className="grid grid-cols-2">
                            <div className="col-start-1 px-10">
                                <div className="my-10">
                                    <InputLabel htmlFor="user_name" value="user Name" />
                                    <TextInput 
                                        id="user_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        name="user_name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="email" value="User email" />
                                    <TextInput 
                                        id="email"
                                        type="text"
                                        className="mt-1 block w-full"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>
                            
                            <div className="col-start-2 px-10">
                                <div className="my-10">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput 
                                        id="password"
                                        type="text"
                                        className="mt-1 block w-full"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="my-10">
                                    <InputLabel htmlFor="confirm_password" value="Confirm Password" />
                                    <TextInput 
                                        id="confirm_password"
                                        type="text"
                                        className="mt-1 block w-full"
                                        name="confirm_password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>                          
                            </div>
                        </div>
                        
                        <div className="mt-4 text-right">
                            <button
                                type="submit"
                                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-aññ hover:bg-emerald-300 ">
                                Create User
                            </button>

                            <Link
                                href={route('user.index')}
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