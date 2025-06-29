import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getenv'
import Loading from '@/components/Loading'
  

function CategoryDetails() {


    const {data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
        method: 'get',
        Credential: 'include',

    })

   if(loading) return <Loading/>

   console.log(categoryData);
   
    
  return (
    <div>
      <Card>
        <CardContent>
            <CardHeader>
                <div>
            <Button asChild>
                <Link to={RouteAddCategory}>
                Add Categories
                </Link>
          
            </Button>

                </div>
            </CardHeader>
        </CardContent>
        <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead>Category</TableHead>
      <TableHead>Slug</TableHead>
      <TableHead>Action</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
   {categoryData && categoryData.category.length > 0 ? 
    
    categoryData.category.map(category =>
        <TableRow key={category._id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell className = "flex gap-2">
                <Button variant = "outline" className= "hover:bg-violet-600 hover:text-white" asChild>
                    <Link to={RouteEditCategory(category._id)}>
                    <FaRegEdit />
                    </Link>
                </Button>

                <Button variant = "outline" className= "hover:bg-violet-600 hover:text-white">
                <FaRegTrashAlt />
                   
                </Button>
            </TableCell>
        </TableRow>
    )
    :
     <TableRow>
        <TableCell colSpan={3}>
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

export default CategoryDetails
