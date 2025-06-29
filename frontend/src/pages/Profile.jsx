import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getenv'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { MdOutlineCameraAlt } from "react-icons/md";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'



function Profile() {

    const [filePreview, setFilePreview] = useState()
const [file, setFile] = useState()
    const user = useSelector((state) => state.user)

    const { data: userData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`, { method: 'get', credentials: 'include' })

    console.log(userData);



    const dispatch = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email(),
        bio: z.string().min(3, 'bio must be at least 3 characters'),
        password: z.string().min(4, { message: 'Password filled required' }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            password: '',
        },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio,
            })
        }
    }, [userData])

    async function onSubmit(values) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(values))

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispatch(setUser(data.user))
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }


    const handleFileSelection = (files)=> {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFilePreview(preview)
        setFile(file)
        console.log(files);
        

    }

    if (loading) return <Loading />
    return (
        <Card className="max-w-screen-md mx-auto">

            <CardContent>
                <div className='flex justify-center items-center mt-10'>

                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (

                            <div {...getRootProps()}>
                                <input {...getInputProps()} />

                                <Avatar className="w-24 h-24 relative group ">
                                    <AvatarImage src={filePreview ? filePreview : userData?.user?.avatar} />
                                    console.log(filePreview);
                                    
                                    <div className='absolute hidden z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex cursor-pointer'>
                                        <MdOutlineCameraAlt color='#7c3aed' />
                                    </div>
                                </Avatar>
                            </div>

                        )}
                    </Dropzone>




                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            <div className='mb-3 '>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your Name" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className='mb-3 '>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className='mb-3 '>
                            <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>

                                                <Textarea type="password" placeholder="Enter bio" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            {/* password field   */}
                            <div className='mb-3 '>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">save</Button>
                        </form>
                    </Form>

                </div>
            </CardContent>
        </Card>
    )
}

export default Profile
