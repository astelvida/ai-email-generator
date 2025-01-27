"use client";

import { useState } from "react";

export function useToggleView() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleView = () => {
    setIsMobile((prev) => !prev);
  };

  return { isMobile, toggleView };
}
