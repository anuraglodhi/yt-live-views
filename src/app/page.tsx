import { CompareForm } from "@/components/compare-form";
import { Tabs } from "@/components/ui/tabs";
import { VideoForm } from "@/components/video-form";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col gap-4 sm:w-4/5">
      <Tabs defaultValue="video">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="video" className="text-lg font-semibold data-[state=active]:bg-muted rounded-lg border border-slate">Video</TabsTrigger>
          <TabsTrigger value="compare" className="text-lg font-semibold data-[state=active]:bg-muted rounded-lg border border-slate">Compare</TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <VideoForm />
        </TabsContent>
        <TabsContent value="compare">
          <CompareForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
