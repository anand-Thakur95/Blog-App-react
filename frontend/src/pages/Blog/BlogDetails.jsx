import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import Loading from '@/components/Loading'
import { showToast } from '@/helpers/showToast'
import { deleteData } from '@/helpers/handleDelete'
import { getEnv } from '@/helpers/getenv'
import { useFetch } from '@/hooks/useFetch'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from 'moment'

function BlogDetails() {
const [refreshData, setRefreshData] = useState(false)
  

    const {data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`,{
        method: 'get',
        credentials: 'include',

    },[refreshData])

    const handleDelete = async (id) => {
      try {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
          setRefreshData(!refreshData)
          showToast('success', 'Blog deleted successfully')
        }
      } catch (error) {
        showToast('error', error.message || 'Failed to delete blog')
      }
    }

   
    
   if(loading) return <Loading/>
  return (
    <div>
    <Card>
      <CardContent>
          <CardHeader>
              <div>
          <Button asChild>
              <Link to={RouteBlogAdd}>
              Add Blog
              </Link>
        
          </Button>

              </div>
          </CardHeader>
      </CardContent>
      <Table>

<TableHeader>
  <TableRow>
    <TableHead>Author</TableHead>
    <TableHead>Category</TableHead>
    <TableHead>Title</TableHead>
    <TableHead>slug</TableHead>
    <TableHead>Dated</TableHead>
    <TableHead>Action</TableHead>

    
  </TableRow>
</TableHeader>
<TableBody>
 {blogData && blogData.blog.length > 0 ? 
  
  blogData.blog.map(blog =>
      <TableRow key={blog._id}>
          <TableCell>{blog?.author?.name}</TableCell>
          <TableCell>{blog?.category?.name}</TableCell>
          <TableCell>{blog?.title}</TableCell>
          <TableCell>{blog?.slug}</TableCell>
          <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>


          
          <TableCell className = "flex gap-2">
              <Button variant = "outline" className= "hover:bg-violet-600 hover:text-white" asChild>
                  <Link to={RouteBlogEdit(blog._id)}>
                  <FaRegEdit />
                  </Link>
              </Button>

              <Button onClick= {()=> handleDelete(blog._id)} variant = "outline" className= "hover:bg-violet-600 hover:text-white">
              <FaRegTrashAlt />
                 
              </Button>
          </TableCell>
      </TableRow>
  )
  :
   <TableRow>
      <TableCell colSpan={6}>
          No Data
      </TableCell>
   </TableRow>
}
</TableBody>
</Table>

    </Card>
  </div>
  )
}

export default BlogDetails
