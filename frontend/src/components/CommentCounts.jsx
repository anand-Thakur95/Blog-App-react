import { getEnv } from '@/helpers/getenv';
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { FaRegComment } from "react-icons/fa";
const CommentCount = ({ props, refresh }) => {
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
        method: 'get',
        credentials: 'include',
    }, [props.blogid, refresh])

    console.log(data);
    
    return (
        <button type='button' className='flex justify-between items-center gap-1'>
            <FaRegComment />
            {data && data.comment}
            
          
            
        </button>
    )
}

export default CommentCount