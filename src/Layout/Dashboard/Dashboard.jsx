import { useForm } from "react-hook-form";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useProjects from "../../hooks/useProjects";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Dashboard = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const [projects, refetch] = useProjects();
    console.log(projects);
    const axiosPublic = useAxiosPublic();
    const handleNewProject = data => {
        console.log(data);
        const newInfo = {
            userEmail: user?.email,
            title: data?.title,
            description: data?.description,
            createdDate: data?.createdDate,
            quality: data?.quality,
            image: data?.photoURL
        }
        axiosPublic.post('/projects', newInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Project Created Successfully.",
                        icon: "success"
                    });
                    refetch()
                }
            })
    }
    const handleDelete = (id) => {
        console.log('click delete btn', id);
        axiosPublic.delete(`/projects/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.deletedCount > 0){
                Swal.fire({
                    title: "Success!",
                    text: "Project Deleted Successfully.",
                    icon: "success"
                });
                refetch()
            }
        })
    }
    const handleUpdate = (id) => {
        console.log('click update btn', id);
    }

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>

            <div>
                <div className="flex justify-center items-center">
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.h >= 10) ? time.h : "0" + time.h}</span>
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.m >= 10) ? time.m : "0" + time.m}</span>
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.s >= 10) ? time.s : "0" + time.s}</span>
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.ms >= 10) ? time.ms : "0" + time.ms}</span>
                </div>
                <div className="flex justify-center items-center my-5 text-white">
                    <button className="border px-5 py-2">Start</button>
                    <button className="border px-5 py-2 mx-2">Start</button>
                    <button className="border px-5 py-2">Start</button>
                </div>
            </div>

            <div className="min-h-[500px]">
                <div className="my-10">
                    <h1 className="text-2xl font-semibold pl-4 text-white">Create New Project Here</h1>
                    <div className="my-5 min-h-[300px]">
                        <form onSubmit={handleSubmit(handleNewProject)} className="mx-4">
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
                    </div>
                </div>
            </div>
            <div className="my-5">
                <h1 className="text-5xl font-semibold text-center mb-10 text-white">My Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                    {
                        projects?.map(project => <div key={project._id} className="card bg-base-100 shadow-md">
                            <figure><img src={project.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{project.title}</h2>
                                <p>{project.description.length > 200 ? project.description.slice(0, 200) + "..." : project.description}</p>
                                <div className="flex justify-end items-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <p onClick={() => handleUpdate(project._id)} className="text-xl cursor-pointer"> <FaEdit></FaEdit> </p>
                                        <p onClick={() => handleDelete(project._id)} className="text-2xl cursor-pointer"> <MdDelete></MdDelete> </p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;