"use client";
import React, { useState } from "react";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";

const ForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });
  const { setValue } = form;

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(
        `/api/forget-password`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        toast({
          title:
            response?.data?.message ||
            "An reset email has been sent to your email",
          variant: "default",
        });
      }
      setValue("email", "");
      setValue("username", "");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title:
          axiosError.response?.data.message || "An unexpected error occurred!",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-xl shadow-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Forgot Password?
          </h1>
          <p className="mb-4">
            Please provide your email and username to reset your password.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please provide your registered email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please provide your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-3">
          <p>
            Go back to
            <Link
              href={"/sign-in"}
              className="text-blue-500 hover:text-blue-800 font-bold"
            >
              {" "}
              Sign In{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
