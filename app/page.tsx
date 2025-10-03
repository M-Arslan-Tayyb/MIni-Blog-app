import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomHeader from "@/components/CustomHeader";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <CustomHeader />

      {/* Hero */}
      <section className="flex-1 bg-slate-50 w-full">
        <div className="max-w-6xl mx-auto py-20 px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Welcome to My Blog
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              Share your thoughts and explore insights from others. Sign in to
              access your personalized dashboard and start your journey.
            </p>
            <p className="text-lg text-slate-600">
              Our platform is designed to give you a clean, distraction-free
              reading and writing experience. Join today and connect with other
              developers, writers, and creators who are shaping the future of
              the web.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1">
            <Image
              src="/images/blog-img.jpg"
              alt="Blog illustration"
              width={600}
              height={400}
              className="mx-auto lg:mx-0 rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-white">
        <div className="max-w-6xl mx-auto py-6 px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
