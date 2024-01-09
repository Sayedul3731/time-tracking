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
    const [currentId, setCurrentId] = useState('')
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
    console.log(currentId);
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

    const [time, setTime] = useState({  s: 0, m: 0, h: 0 });
    const [interV, setInterV] = useState();
    const start = () => {
        run();
        setInterV(setInterval(run, 1000));
    }
    const stop = () => {
        clearInterval(interV);
    }
    const resume = () => {
        clearInterval(interV);
        setTime({ s: 0, m: 0, h: 0 })
    }

    var updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        updatedS++;
        return setTime({ s: updatedS, m: updatedM, h: updatedH });
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>

            <div>
                <h1 className="text-4xl font-semibold text-white pl-4">Live Counter</h1>
            </div>

            <div className="min-h-[500px]">
                <div className="my-10">
                    <div className=" flex justify-between">
                        <div>  <h1 className="text-2xl font-semibold pl-4 text-white">Create New Project Here</h1></div>
                        <div>
                            <div className="flex justify-center items-center">
                                <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.h >= 10) ? time.h : "0" + time.h} h</span>
                                <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.m >= 10) ? time.m : "0" + time.m} m</span>
                                <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.s >= 10) ? time.s : "0" + time.s} s</span>
                            </div>
                            <div className="flex justify-center items-center mt-4 text-white">
                                <button onClick={start} className="border px-5 py-2">Start</button>
                                <button onClick={stop} className="border px-5 py-2 mx-2">Pause</button>
                                <button onClick={resume} className="border px-5 py-2">Resume</button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 min-h-[300px]">
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
                            <p>
                                <input type='text' className='w-full my-4 px-3 py-1' placeholder='Total time (second)' {...register('time', { required: true })} />
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
                        projects?.map(project => <div key={project._id} className="rounded-md bg-base-100 shadow-md">
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
                        </div>)
                    }
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
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;