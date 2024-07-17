import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const query = new URLSearchParams(req.url.split("?")[1]);
  const searchQuery = query.get("q");

  if (!searchQuery) {
    return Response.json({ error: "No video id provided" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}&type=video`,
    );
    const data = await res.json();
    return Response.json(data.items, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Unexpected error occured" },
      { status: 500 },
    );
  }
};
