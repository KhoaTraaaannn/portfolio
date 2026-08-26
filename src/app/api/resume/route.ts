import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "resume",
      "resume.pdf",
    );

    const file = await readFile(filePath);

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition":
          'inline; filename="Tran-Nguyen-Anh-Khoa-Resume.pdf"',

        /*
         * Do not cache the resume while developing.
         *
         * This prevents Chrome from continuing to
         * display the old PDF metadata.
         */
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",

        Pragma: "no-cache",

        Expires: "0",
      },
    });
  } catch (error) {
    console.error(
      "Failed to load resume PDF:",
      error,
    );

    return new Response(
      "Resume PDF not found.",
      {
        status: 404,
      },
    );
  }
}