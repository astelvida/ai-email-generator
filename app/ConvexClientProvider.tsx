"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailsProvider } from "@/contexts/user-details-context";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <UserDetailsProvider>{children}</UserDetailsProvider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}
