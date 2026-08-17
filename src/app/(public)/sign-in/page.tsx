import { TypographyH1 } from "@/components/ui/typography";
import { SignInForm } from "@/features/sign-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Brain Bank account to manage your reading lists and recommendations.",
};

export default function SignIn() {
    return (
        <section className="py-8 min-h-screen flex items-center justify-center">
            <div className="container max-w-md">
                <TypographyH1 className="text-center mb-4">
                    Welcome back!
                </TypographyH1>
                <p className="text-muted-foreground text-center mb-8">
                    Enter your details to sign in to your account
                </p>
                <SignInForm />
            </div>
        </section>
    )
}