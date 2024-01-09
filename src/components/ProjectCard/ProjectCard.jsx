/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import useProjects from "../../hooks/useProjects";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProjectCard = ({project}) => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    
    const [currentId, setCurrentId] = useState('')
    const [, refetch] = useProjects();
    const handleDelete = (id) => {
        console.log('click delete btn', id);
        axiosPublic.delete(`/projects/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Project Deleted Successfully.",
                        icon: "success"
                    });
                    refetch()
                }
            })
    }
    const handleUpdateModal = (id) => {
        setCurrentId(id)
        document.getElementById('updateModal').showModal()
    }
    const handleUpdate = (data) => {
        console.log('click update btn', data);
        const updateInfo = {
            title: data?.title,
            description: data?.description,
            createdDate: data?.createdDate,
            quality: data?.quality,
            image: data?.photoURL
        }
        axiosPublic.patch(`/projects/${currentId}`, updateInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Project Updated Successfully.",
                        icon: "success"
                    });
                    refetch()
                }
            })

    }
    return (
        <div className="rounded-md bg-base-100 shadow-md">
            <div className="h-[220px]">
                <figure><img src={project.image} alt="Project Picture" className="h-full w-full rounded-md " /></figure>
            </div>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description.length > 200 ? project.description.slice(0, 200) + "..." : project.description}</p>
                <div className="flex justify-end items-center">
                    <div className="flex justify-center items-center gap-2">
                        <p onClick={() => handleUpdateModal(project._id)} className="text-xl cursor-pointer"> <FaEdit></FaEdit> </p>
                        <p onClick={() => handleDelete(project._id)} className="text-2xl cursor-pointer"> <MdDelete></MdDelete> </p>
                    </div>
                </div>
            </div>
               {/* Open the modal using document.getElementById('ID').showModal() method */}
               <dialog id="updateModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#081c15]">
                    <form onSubmit={handleSubmit(handleUpdate)} className="mx-4">
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Title' {...register('title', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Description' {...register('description', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='Project photoURL' {...register('photoURL', { required: false })} />
                        </p>
                        <p>
                            <input type='date' className='w-full my-4 px-3 py-1' placeholder='CreatedDate' {...register('createdDate', { required: true })} />
                        </p>
                        <p>
                            <input type='text' className='w-full my-4 px-3 py-1' placeholder='good/better/best' {...register('quality', { required: true })} />
                        </p>
                        <div className=" flex justify-center">
                            <input type="submit" className="bg-[#e2711d] px-10 font-semibold text-white py-[8px] text-lg" />
                        </div>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProjectCard;