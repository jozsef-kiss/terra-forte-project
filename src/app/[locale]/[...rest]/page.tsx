import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // Ez a funkció azonnal aktiválja a not-found.tsx fájlt
  notFound();
}
