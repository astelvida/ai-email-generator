"use client";

import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

function SignInButton() {
  const createUserMutation = useMutation(api.users.createUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("tokenResponse", tokenResponse);

      const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });

      const user = await createUserMutation({
        email: userInfo?.data?.email,
        name: userInfo?.data?.name,
        picture: userInfo?.data?.picture,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...userInfo?.data, _id: user?._id || user })
        );
      }
    },
    onError: (errorResponse) => console.log("errorResponse", errorResponse),
  });
  return (
    <div>
      <Button onClick={() => googleLogin()}>Sign In with Google</Button>
    </div>
  );
}

export default SignInButton;
