import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const query = new URLSearchParams(req.url.split("?")[1]);
  const id = query.getAll("id");

  if (!id) {
    return Response.json({ error: "No video id provided" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id[0]}%2C${id[1]}&key=${process.env.YOUTUBE_API_KEY}`,
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
