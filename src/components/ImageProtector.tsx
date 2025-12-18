"use client";

import { useEffect } from "react";

export default function ImageProtector() {
  useEffect(() => {
    // Ez a funkció fut le minden jobb klikknél
    const handleContextMenu = (e: MouseEvent) => {
      // Megnézzük, hogy amire kattintottak, az egy KÉP-e (IMG)
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault(); // Letiltjuk a menüt
      }
    };

    // Ez a funkció fut le, ha valaki megpróbálja elhúzni a képet
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault(); // Letiltjuk a húzást
      }
    };

    // Hozzáadjuk az eseményfigyelőket az egész dokumentumhoz
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    // Takarítás, ha elhagynánk az oldalt (tisztaság végett)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  // Ez a komponens nem rajzol ki semmit, csak "figyel"
  return null;
}
