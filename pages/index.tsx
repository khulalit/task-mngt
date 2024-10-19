import Header from "@/components/Header.tsx";

import TaskList from "@/components/Task/TaskList";
import { openDb } from "@/lib/db";
import { GetServerSideProps } from "next";
import localFont from "next/font/local";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({ tasks }: any) {
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] px-2`}
    >
      <Header setFilterTerm={setFilterTerm} />
      <TaskList
        tasks={tasks.filter(
          (task: any) =>
            task.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(filterTerm.toLowerCase())
        )}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await openDb();
  const tasks = await db.all(
    `SELECT * FROM tasks 
     ORDER BY priority ASC, updatedAt DESC`
  );

  return {
    props: {
      tasks: tasks,
    },
  };
};
