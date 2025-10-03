import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import Image from "next/image";
import { cookies } from "next/headers";
import CustomHeader from "@/components/CustomHeader";

export default async function BlogDetailPage({ params }: any) {
  const blogId = Number(params.id);
  const blog = blogs.find((b) => b.id === blogId);

  const cookieStore = await cookies();
  const authUser = cookieStore.get("authUser")?.value ?? null;

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomHeader userEmail={authUser || ""} />
      <div className="max-w-4xl mx-auto py-10 px-6">
        {/* Blog image */}
        <div className="relative w-full h-64 sm:h-96 mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded-lg shadow"
          />
        </div>

        {/* Blog content */}
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-slate-500 text-sm mb-6">
          By {blog.author} • {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="text-lg text-slate-700 whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
