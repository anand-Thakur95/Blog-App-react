import { useFetch } from '@/hooks/useFetch'

import React from 'react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import UserIcon from '@/assets/Images/user.png'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { getEnv } from '@/helpers/getenv'

const CommentList = ({ props }) => {
    const user = useSelector(state => state.user)

    
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get/${props.blogid}`, {
        method: 'get',
        credentials: 'include',
    }, [props.newComment, props.refreshData])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No comments found</div>

    const commentLength = data.comment ? data.comment.length : 0

    return (
        <div>
            <h4 className='text-2xl font-bold'>
                {
                    props.newComment ?
                        <span className='me-2'>{commentLength + 1 }</span>
                        :
                        <span className='me-2'>{commentLength}</span>
                }
                Comments</h4>
            <div className='mt-5'>
                {data.comment && data.comment.length > 0 && data.comment.map(comment => (
                    <div key={comment._id} className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={comment?.user?.avatar || UserIcon} />
                        </Avatar>
                        <div>
                            <p className='font-bold'>{comment?.user?.name || 'Anonymous'}</p>
                            <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {comment?.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentList