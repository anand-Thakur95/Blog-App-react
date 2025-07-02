import React, { useEffect } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { getEnv } from '@/helpers/getenv'
import { showToast } from '@/helpers/showToast'


function AddCategory() {

    const formSchema = z.object({
        name: z.string().min(4, { message: 'Name must be at least 4 characters long' }).max(20),
        slug: z.string().min(4, { message: 'Name must be at least 4 characters long' }).max(20),
       
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
           
        },
    })

    useEffect(() => {
        const CategoryName = form.watch('name')
        if (CategoryName) {
            const slug = slugify(CategoryName, { lower: true })
            form.setValue('slug', slug)
        }
    })

    async function onSubmit(value) {

        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(value)
            });
            // const data = await response.json()
            if (!response.ok) {
                const errorData = await response.json();
                showToast('error', errorData.message)
            } else {
                const successData = await response.json();
                showToast('success', successData.message)
             form.reset()
            }
        } catch (error) {
           
            showToast('error', error.message);
        }
    }

  return (
    <div>
            <Card className= "pt-5 max-w-screen-md mx-auto">
               <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">

                        <div className='mb-1'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Name" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className='mb-1 '>
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Slug" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                   
                        <div className='mt-5'>
                            <Button type="submit" className="w-full">Submit</Button>
                        </div>
                    </form>
                </Form>
                </CardContent>
            </Card>
            </div>
  )
}

export default AddCategory
