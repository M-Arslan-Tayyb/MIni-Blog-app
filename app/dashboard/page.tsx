import { blogs } from "@/data/blogs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import CustomHeader from "@/components/CustomHeader";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const authUser = cookieStore.get("authUser")?.value ?? null;
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <CustomHeader userEmail={authUser || ""} />

      <main className="flex-1 max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {authUser}!</h1>
        <h2 className="text-2xl font-semibold mb-4">Latest Blogs</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  loading="lazy"
                  className="object-cover rounded-md hover:scale-105 transition"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-slate-500 mb-2">
                By {blog.author} • {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="text-slate-600 text-sm flex-1">
                {blog.content.slice(0, 120)}...
              </p>

              <Button
                asChild
                className="mt-4 bg-sky-600 hover:bg-sky-700"
                size="sm"
              >
                <Link href={`/blog/${blog.id}`}>View Blog</Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
