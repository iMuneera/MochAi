"use client"; // for Next.js App Router
import { useEffect, useState } from "react";
import TypingHeader from "./component/TypingHeader";
import BlogSection from "./component/Blog";


export default function Home() {
  interface Data {
    message: string;
    status: string;
  }

  const [data, setData] = useState<Data | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);



  useEffect(() => {


    // Fetch other data from the API
    fetch("http://127.0.0.1:8000/send_data/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
   
    <main>
     
      <section id="home" className="mt-36">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(94,66,174,0.3),transparent)]"></div>
        </div>

        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg">
            <TypingHeader />

            {data ? (
              <div className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                <p>{data.message}</p>
                <p>Status: {data.status}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            {/* Display CSRF Token */}
            {csrfToken && (
              <div className="mt-4 text-sm font-medium text-gray-600">
                <p>CSRF Token: {csrfToken}</p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <img className="rounded-lg h-[700px] w-auto" src="/landing1.png" />
          </div>
        </div>
      </section>
      <BlogSection />
    </main>
  );
}
