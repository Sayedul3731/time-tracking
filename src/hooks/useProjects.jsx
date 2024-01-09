import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic/useAxiosPublic';

const useProjects = () => {
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    const axiosPublic = useAxiosPublic()
    const { data: projects = [],refetch } = useQuery({
        queryKey: ['projects', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/projects/${user?.email}`)
            return res.data;
        }
    })
    return [projects, refetch];
};

export default useProjects;