"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import dummyMessages, {
  DummyMessageObject,
  shuffleMessages,
} from "@/constants/dummyMessageSuggestion";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";

const Home = () => {
  const [shuffledMessages, setShuffledMessages] = useState<
    DummyMessageObject[]
  >([]);
  useEffect(() => {
    setShuffledMessages(shuffleMessages(dummyMessages));
  }, []);
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the world of Anonymous Conversations.
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Explore Mystery Message - Where your identity remains a secret.
        </p>
      </section>
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full max-w-lg md:max-w-xl"
      >
        <CarouselContent>
          {shuffledMessages.map((data, index) => (
            <CarouselItem key={index} className="p-4">
              <div className="p-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{data.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{data.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {data.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
};

export default Home;
