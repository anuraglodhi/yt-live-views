"use client";

import { LiveCompare } from "@/components/live-compare";
import { LiveViews } from "@/components/live-views";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function ComparePage({
  params,
}: {
  params: { id1: string; id2: string };
}) {
  const {
    isPending: isPending1,
    error: error1,
    data: data1,
  } = useQuery({
    queryKey: ["videoData", params.id1],
    queryFn: () =>
      fetch(`/api/v1/video/details?id=${params.id1}`).then((res) => res.json()),
  });

  const {
    isPending: isPending2,
    error: error2,
    data: data2,
  } = useQuery({
    queryKey: ["videoData", params.id2],
    queryFn: () =>
      fetch(`/api/v1/video/details?id=${params.id2}`).then((res) => res.json()),
  });

  if (isPending1 || isPending2) return "Loading...";

  if (error1 || error2)
    return "An error has occurred: " + error1?.message + " " + error2?.message;

  return (
    <main className="flex w-full flex-1 flex-col gap-4 sm:w-4/5">
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle className="grid grid-cols-2 gap-4">
            <VideoDetails data={data1} />
            <VideoDetails data={data2} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Live view difference</h2>
          <LiveCompare id1={params.id1} id2={params.id2}/>
        </CardContent>
      </Card>
    </main>
  );
}

const VideoDetails = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col gap-4">
      <Image
        alt={data.snippet.title}
        src={data.snippet.thumbnails.high.url}
        width={data.snippet.thumbnails.high.width}
        height={data.snippet.thumbnails.high.height}
        className="w-[200px] rounded-md"
      ></Image>
      <div className="flex flex-col gap-2">
        <h2>{data.snippet.title}</h2>
        <span className="text-lg text-muted-foreground">
          {data.snippet.channelTitle}
        </span>
      </div>
    </div>
  );
};
