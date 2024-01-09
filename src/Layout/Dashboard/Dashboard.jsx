import { useForm } from "react-hook-form";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";


const Dashboard = () => {
    const { register, handleSubmit } = useForm();
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const handleNewProject = data => {
        console.log(data);
        const newInfo = {
            userEmail: user?.email,
            title: data?.title,
            description: data?.description,
            createdDate: data?.createdDate,
            quality: data?.quality
        }
        axiosPublic.post('/projects', newInfo)
        .then(res => {
            console.log(res.data);
        })
    }
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <div className="min-h-[650px]">
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
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;