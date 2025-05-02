"use client"; // for Next.js App Router
import { useEffect, useState } from "react";

export default function Home() {
  interface Data {
    message: string;
    status: string;
  }

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/send_data/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <main>
      <h1>Frontend + Django API</h1>
      {data ? (
        <div>
          <p>{data.message}</p>
          <p>Status: {data.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
