import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteSignIn } from '@/helpers/RouteName'
import GoogleLogin from "../components/GoogleLogin.jsx"
import { getEnv } from '@/helpers/getenv.js'
import { showToast } from '@/helpers/showToast'
import { useSelector } from 'react-redux'

function SignUp() {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const formSchema = z.object({
        name: z.string().min(4, { message: 'Name must be at least 4 characters long' }).max(20),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
        confirmPassword: z.string().refine(data => data.password === data.confirmPassword, { message: 'Passwords do not match' })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    })

    async function onSubmit(value) {

        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(value)
            });

            if (!response.ok) {
                const errorData = await response.json();
                showToast('error', errorData.message)
            } else {
                const successData = await response.json();
                showToast('success', successData.message)
                navigate(RouteSignIn)
            }
        } catch (error) {
        
            showToast('error', error.message);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='w-[400px] p-5'>
                <h1 className='text-2xl font-bold text-center mb-2'>Create Your account</h1>
                <div className=''>
                    <GoogleLogin />
                </div>
                <div className='border my-5 flex justify-center items-center'>
                    <span className='absolute bg-white'>Or</span>
                </div>
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
                        {/* password field   */}
                        <div className='mb-1 '>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
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
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password again" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mt-5'>
                            <Button type="submit" className="w-full">Sign Up</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p> Already have accout?</p>
                                <Link to={RouteSignIn} className='text-blue-800 hover:underline'>Sign In</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp
