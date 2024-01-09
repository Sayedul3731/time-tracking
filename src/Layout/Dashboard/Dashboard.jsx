/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useProjects from "../../hooks/useProjects";
import TimeCounter from "../../components/TimeCounter/TimeCounter";
import ProjectTimer from "../../components/ProjectTimer/ProjectTimer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";


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
   
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <div className="flex justify-start items-center gap-5 my-5">
                <h1 className="text-4xl font-semibold text-white pl-4">Live Counter</h1>
                <TimeCounter/>
            </div>
            <div className="min-h-[500px] mt-32">
                <div className="my-10">
                    <ProjectTimer/>
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
                <h1 className="text-5xl font-semibold text-center mb-10 mt-20 text-white">My Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                    {
                        projects?.map(project => <ProjectCard key={project._id} project={project}></ProjectCard>)
                    }
                </div>
            </div>

         
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;