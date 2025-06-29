import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { data, Link, useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getenv.js'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice.js'
import { createSlice } from '@reduxjs/toolkit'

function Signin() {

    const dispatch = useDispatch()

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(4, { message: 'Password filled required' }),
    })

    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(value) {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(value)
            });

            if (!response.ok) {
                const errorData = await response.json();
                showToast('error', errorData.message);
            } else {
                const successData = await response.json();
                showToast('success', successData.message);
                dispatch(setUser(data.user));
                navigate(RouteIndex);
            }
        } catch (error) {
            console.log(error);
            showToast('error', error.message);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='w-[400px] p-5'>
                <h1 className='text-2xl font-bold text-center mb-5'>Login Into account</h1>
                <div className=''>
                    <GoogleLogin />
                </div>
                <div className='border my-5 flex justify-center items-center'>
                    <span className='absolute bg-white'>Or</span>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <div className='mt-5'>
                            <Button type="submit" className="w-full">Sign in</Button>
                          <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                            <p>Don&apos;t have accout?</p>
                            <Link to={RouteSignUp} className='text-blue-800 hover:underline'>Sign Up</Link>
                          </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )

}
export default Signin
