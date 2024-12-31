import { NextRequest, NextResponse } from "next/server";
import { supabase } from "~/src/lib/supabase";

export const GET = async (req: NextRequest) => {
  try {
    // read query params
    const { searchParams } = req.nextUrl;
    const fileUrl = searchParams.get("fileUrl");
    if (!fileUrl) {
      throw new Error("No fileUrl");
    }

    const { data, error } = await supabase.storage.from("project-lamp").download(fileUrl);
    if (error) {
      throw error;
    }
    // Blob 데이터를 그대로 Response 객체로 반환
    return new Response(data, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Get Files: ", error);
    return NextResponse.json({ status: 500, message: "Error Get Files" });
  }
};
