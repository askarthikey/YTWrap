import { connectDB } from "@/lib/db";
import { Video } from "@/app/models/Vidoes/route";
import { NextResponse } from "next/server";
import Error from "next/error";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { channelid } = await request.json();
    const videos = Video.find({ channelid: channelid });
    NextResponse.json(videos);
  } catch (Error) {
    console.log(Error);
  }
}

export async function POST(request: Request) {
  // Changed 'req' to 'request' for App Router
  try {
    await connectDB();

    const { videoid, channelid, url } = await request.json();
    const videodata = { channelid, videoid, url };
    const video = await Video.create(videodata);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("Error posting video url to database:", error); // Changed to console.error for errors

    return NextResponse.json(
      {
        message: "Error uploading video",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
