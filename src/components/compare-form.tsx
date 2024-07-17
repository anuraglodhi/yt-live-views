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
import { Check, Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const videoFormSchema = z.object({
  searchQuery: z.string().trim(),
});

export const CompareForm = () => {
  const [videos1, setVideos1] = useState<any[]>([]);
  const [videos2, setVideos2] = useState<any[]>([]);

  const [selected, setSelected] = useState(["", ""]);

  const form1 = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: { searchQuery: "" },
  });

  const form2 = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: { searchQuery: "" },
  });

  async function onSubmit(
    values: z.infer<typeof videoFormSchema>,
    setValues: Dispatch<SetStateAction<any[]>>,
  ) {
    const res = await fetch(`/api/v1/video/search?q=${values.searchQuery}`);
    const data = await res.json();
    setValues(data);
  }

  function onSelect(id: string, index: number) {
    let newSelected = [...selected];
    if (newSelected[index] == id) {
      newSelected[index] = "";
    } else {
      newSelected[index] = id;
    }

    setSelected(newSelected);
  }

  const router = useRouter();

  return (
    <>
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle>Find live views</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>First video</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form1}>
                <form
                  onSubmit={form1.handleSubmit((values) =>
                    onSubmit(values, setVideos1),
                  )}
                >
                  <CardContent className="flex flex-col gap-4">
                    <FormField
                      control={form1.control}
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
                    {videos1.length > 0 && (
                      <div className="flex flex-col gap-4">
                        {videos1.map((video) => (
                          <div
                            key={video.id.videoId}
                            className={`flex w-full cursor-pointer gap-8`}
                            onClick={() => onSelect(video.id.videoId, 0)}
                          >
                            <Image
                              alt={video.snippet.title}
                              src={video.snippet.thumbnails.high.url}
                              width={video.snippet.thumbnails.high.width}
                              height={video.snippet.thumbnails.high.height}
                              className="h-[90px] w-[120px] rounded-md"
                            ></Image>
                            <div className="flex flex-col justify-center gap-2">
                              <h3 className="text-lg">
                                {video.snippet.title}
                                {selected[0] === video.id.videoId && (
                                  <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-muted px-2 py-1 text-sm">
                                    Selected
                                    <Check className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                )}
                              </h3>
                              <span className="text-md text-muted-foreground">
                                {video.snippet.channelTitle}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {form1.formState.isSubmitting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Button type="submit" disabled={form1.getValues().searchQuery === ""}>Search</Button>
                    )}
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Second video</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form2}>
                <form
                  onSubmit={form2.handleSubmit((values) =>
                    onSubmit(values, setVideos2),
                  )}
                >
                  <CardContent className="flex flex-col gap-4">
                    <FormField
                      control={form2.control}
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
                    {videos2.length > 0 && (
                      <div className="flex flex-col gap-4">
                        {videos2.map((video) => (
                          <div
                            key={video.id.videoId}
                            className="flex w-full cursor-pointer gap-8"
                            onClick={() => onSelect(video.id.videoId, 1)}
                          >
                            <Image
                              alt={video.snippet.title}
                              src={video.snippet.thumbnails.high.url}
                              width={video.snippet.thumbnails.high.width}
                              height={video.snippet.thumbnails.high.height}
                              className="h-[90px] w-[120px] rounded-md"
                            ></Image>
                            <div className="flex flex-col justify-center gap-2">
                              <h3 className="text-lg">
                                {video.snippet.title}
                                {selected[1] === video.id.videoId && (
                                  <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-muted px-2 py-1 text-sm">
                                    Selected
                                    <Check className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                )}
                              </h3>
                              <span className="text-md text-muted-foreground">
                                {video.snippet.channelTitle}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {form2.formState.isSubmitting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Button type="submit" disabled={form2.getValues().searchQuery === ""}>Search</Button>
                    )}
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              router.push(`/compare/${selected[0]}/${selected[1]}`)
            }
            disabled={!selected[0] || !selected[1]}
          >
            Compare
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
