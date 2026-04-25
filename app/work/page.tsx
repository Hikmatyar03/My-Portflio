import type { Metadata } from "next";
import { projects } from "@/lib/site-content";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Work"
};

export default function WorkPage() {
  return <WorkPageClient projects={projects} />;
}
