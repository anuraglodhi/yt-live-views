"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const videoFormSchema = z.object({
  searchQuery: z.string().trim(),
});

export const VideoForm = () => {
  const [videos, setVideos] = useState<any[]>([]);

  const form = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: { searchQuery: "" },
  });

  async function onSubmit(values: z.infer<typeof videoFormSchema>) {
    const res = await fetch(`/api/v1/video/search?q=${values.searchQuery}`);
    const data = await res.json();
    setVideos(data);
  }

  const router = useRouter();

  return (
    <>
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle>Find live views</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search query</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Search using any query / url / video id"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              {form.formState.isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Button type="submit">Search</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle>Found videos</CardTitle>
        </CardHeader>
        <CardContent>
          {videos.length == 0 ? (
            <span>No videos found</span>
          ) : (
            <div className="flex flex-col gap-4">
              {videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className="flex w-full gap-8 cursor-pointer"
                  onClick={() => router.push(`/video/${video.id.videoId}`)}
                >
                  <Image
                    alt={video.snippet.title}
                    src={video.snippet.thumbnails.high.url}
                    width={video.snippet.thumbnails.high.width}
                    height={video.snippet.thumbnails.high.height}
                    className="h-[90px] w-[120px] rounded-md"
                  ></Image>
                  <div className="flex flex-col justify-center gap-2">
                    <h3 className="text-lg">{video.snippet.title}</h3>
                    <span className="text-md text-muted-foreground">
                      {video.snippet.channelTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
