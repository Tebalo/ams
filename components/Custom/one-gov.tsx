'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/auth"

const FormSchema = z.object({
    email: z.string().min(1, "This field is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormData = z.infer<typeof FormSchema>

interface Response {
    refresh?: string;
    access?: string;
    roles?: string[];
    detail?: string;
}

export const OneGovID: React.FC = () => {
    const router = useRouter()
    const [response, setResponse] = useState<Response | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [redirecting, setIsRedirecting] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', data.email);
            formData.append('password', data.password);
            
            const sessionData = await login(formData);
            
            if (sessionData?.auth?.access) {
                setIsRedirecting(true);
                router.push('/ams/dashboard');
            } else {
                // If login was unsuccessful but didn't throw an error
                setResponse({ detail: 'Login unsuccessful. Please check your credentials.' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setResponse({ 
                detail: error instanceof Error ? error.message : 'An error occurred during login. Please try again.' 
            } as Response);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {response?.detail && (
                    <p className="text-red-600 text-sm">{response.detail}</p>
                )}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>1Gov ID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your 1Gov ID"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 
                <Button 
                    type="submit" 
                    disabled={isLoading || redirecting}
                    className="w-full"
                >
                    {isLoading ? 'Authenticating...' : 
                     redirecting ? 'Redirecting...' : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}