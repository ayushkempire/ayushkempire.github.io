import { revalidatePath } from "next/cache";
import { getContent, saveContent, defaultContent, type Content } from "@/lib/content";
import { isAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(await getContent());
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Content;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // shallow shape check against the known content sections
  for (const key of Object.keys(defaultContent) as (keyof Content)[]) {
    if (!(key in body)) {
      return Response.json({ error: `Missing section: ${key}` }, { status: 400 });
    }
  }

  try {
    await saveContent(body);
  } catch {
    return Response.json(
      { error: "Could not write content file (read-only filesystem?)." },
      { status: 500 }
    );
  }

  revalidatePath("/");
  return Response.json({ ok: true });
}
