"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signinSchema } from "@/schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Signin = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [providesList, setProvidesList] = useState({});
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const provider = async () => {
      const provider = await getProviders();
      setProvidesList((prev) => {
        return { ...prev, provider };
      });
    };
    provider();
  }, []);

  //zod implementation
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error || "Incorrect username or password.",
        variant: "destructive",
      });
    }
    if (result?.url) {
      router.replace("dashboard");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-xl shadow-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Join Mystery Messages
          </h1>
          <p className="mb-4">Signup to start your anonymous adventure.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email or username"
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Signin"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account?
            <Link
              href={"/sign-up"}
              className="text-blue-500 hover:text-blue-800 font-bold"
            >
              {" "}
              Sign up{" "}
            </Link>
          </p>
          <p className="mt-1">
            Forget Password?
            <Link
              href={"/forgot-password"}
              className="text-blue-500 hover:text-blue-800 font-bold"
            >
              {" "}
              Forget Password{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
