"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { mutate } from "../api/mutation";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const submitHandler: SubmitHandler<SignInSchema> = async (data) => {
        const result = await mutate(data);


        if (!result.success) return toast.error(result.error?.message);

        toast.success("User signed in successfully");

        redirect("/admin");
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
                Sign In
            </Button>
        </form>
    )
}