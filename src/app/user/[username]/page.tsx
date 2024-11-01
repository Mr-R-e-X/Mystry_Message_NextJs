"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/message.schema";
import { Separator } from "@/components/ui/separator";
import dummyMessages, {
  anyThreeMessages,
} from "@/constants/dummyMessageSuggestion";
import axios, { AxiosError } from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/apiResponse";
import Link from "next/link";

const MessagePage = () => {
  const { username } = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAiMessage, setIsAiMessage] = useState<boolean>(false);
  const [suggestionsMessage, setSuggestionsMessage] = useState<string[]>([]);

  useEffect(() => {
    const messages = anyThreeMessages(dummyMessages);
    setSuggestionsMessage(messages);
  }, []);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { register, watch, setValue } = form;

  const content = watch("content");

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content,
      });
      toast({
        title: response?.data.message,
        variant: "default",
      });
      setValue("content", "");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMessagesFromAi = async () => {
    setIsAiMessage(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      console.log(response);
      const responseMessageArray = response.data?.split("||");
      if (responseMessageArray.length > 0) {
        setSuggestionsMessage(responseMessageArray);
      }

      toast({
        title: "Response generated.",
        variant: "default",
      });
    } catch (error) {
      console.log("Error is AI messages --> ", error);
      toast({
        title: "Error generating response",
        variant: "destructive",
      });
    } finally {
      setIsAiMessage(false);
    }
  };

  const setTextInputValue = async (value: string) => {
    setValue("content", value);
  };

  return (
    <div className="mt-2 mb-4 px-6 py-4 mx-auto bg-white w-full max-w-6xl flex flex-col justify-center gap-2">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-center tracking-tight">
          Public Profile Link
        </h1>
        <p className="text-base font-normal mb-2 text-center tracking-tight">
          {" "}
          <span className="font-bold">@{username}</span> is waiting for your
          message!
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[85%] space-y-4"
          >
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none w-full text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className="mx-auto w-max">
              <Button
                type="submit"
                className="mx-auto w-max font-medium text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                    Message
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Separator className="my-3" />
      <div>
        <div className="mx-auto w-max">
          <Button
            onClick={getMessagesFromAi}
            className="w-max font-normal text-base my-4"
            disabled={isAiMessage}
          >
            {isAiMessage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating New
                Suggestions
              </>
            ) : (
              "AI Message Suggestion"
            )}{" "}
          </Button>
        </div>
        <p className="mx-2 my-3">Click on any messages below to select it.</p>
        <div className="border p-2 rounded-md">
          <h1 className="text-2xl font-bold mx-4 tracking-tight"> Messages </h1>
          {isAiMessage
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  <Skeleton className="border w-full p-6 my-3 mx-4 text-center text-base font-medium tracking-tight rounded-md cursor-pointer" />
                </div>
              ))
            : suggestionsMessage.map((message, index) => (
                <div className="flex items-center justify-center" key={index}>
                  <span
                    className="border w-full p-2 my-3 mx-4 text-center text-base font-semibold tracking-tight rounded-md cursor-pointer"
                    onClick={() => setTextInputValue(message)}
                  >
                    {" "}
                    {message}{" "}
                  </span>
                </div>
              ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-4 gap-2">
        <p>Get Your Own Message Board</p>
        <Link href="/sign-up">
          <Button type="button" variant="default">
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MessagePage;
