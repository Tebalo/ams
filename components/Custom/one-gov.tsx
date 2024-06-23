'use client'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface UserCredentials{
    email: string,
    password: string,
}
interface Response{
    refresh: string;
    access: string;
    roles: string[];
    detail: string;
}
export const OneGovID: React.FC = () => {
    const router = useRouter()
    const FormSchema = z.object({
        email: z.string(),
        password: z.string()
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    })
    const [response, setResponse] = useState<Response | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [redirecting, setIsRedirecting] = useState(false);
    async function onSubmit(data: z.infer<typeof FormSchema>){
        setIsLoading(true)
        const formData = new FormData();
        
        formData.append('username', data.email);
        formData.append('password', data.password);
        
        const res = await login(formData);
        setResponse(res || null)
        if(res?.access){
            setIsLoading(false)
            setIsRedirecting(true)
            router.push('/ams/home')   
        }
        setIsLoading(false)
    }
    const email = form.watch('email');
    const password = form.watch('password');
    return(
        <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    <span className="text-red-600 text-sm">{response?.detail}</span>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) =>{
                            return <FormItem>
                                <FormLabel>1Gov ID</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder=""
                                    type="text"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }}
                    /> 
                    <FormField
                            control={form.control}
                            name="password"
                            render={({field}) =>{
                                return <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder=""
                                        type="password"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            }}
                        /> 
                        <Button type="submit" disabled={isLoading || redirecting}>
                            {isLoading ? (
                                <>authenticating...</>
                            ) : redirecting ? (
                                <>redirecting...</>
                            ) : (
                                <>Submit</>
                            )}
                        </Button>
                </div>
            </form>
        </Form>
        </>
    )
}