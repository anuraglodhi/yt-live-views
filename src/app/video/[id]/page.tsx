"use client";

import { LiveViews } from "@/components/live-views";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function VideoIdPage({ params }: { params: { id: string } }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["videoData"],
    queryFn: () =>
      fetch(`/api/v1/video/details?id=${params.id}`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex w-4/5 flex-1 flex-col gap-4">
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Image
              alt={data.snippet.title}
              src={data.snippet.thumbnails.maxres.url}
              width={data.snippet.thumbnails.maxres.width}
              height={data.snippet.thumbnails.maxres.height}
              className="w-[200px] rounded-md"
            ></Image>
            <div className="flex flex-col gap-2">
              <h2>{data.snippet.title}</h2>
              <span className="text-lg text-muted-foreground">
                {data.snippet.channelTitle}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Live views</h2>
          <LiveViews id={data.id} />
        </CardContent>
      </Card>
    </main>
  );
}
