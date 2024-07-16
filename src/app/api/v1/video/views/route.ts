import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const query = new URLSearchParams(req.url.split("?")[1]);
  const id = query.get("id");

  if (!id) {
    return Response.json({ error: "No video id provided" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`,
    );
    const data = await res.json();
    return Response.json(data.items[0], { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Unexpected error occured" },
      { status: 500 },
    );
  }
};
