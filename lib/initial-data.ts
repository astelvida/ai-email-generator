"use client";

import type React from "react";
// import { createContext, useContext, useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import type { BuilderElement } from "@/lib/types";
import { Love_Light } from "next/font/google";

type BuilderElement = {
  id: string;
  type?: string;
  label?: string;
  text?: string;
  style?: React.CSSProperties;
  src?: string;
  alt?: string;
  children?: BuilderElement[];
  columns?: number;
};

export const initialElements: BuilderElement[] = [
  {
    id: "1334",
    type: "layout",
    label: "2 Column",
    columns: 2,
    children: [
      {
        id: "1334-0-0",
        type: "image",
        label: "Image",
        src: "https://via.placeholder.com/150",
        alt: "Image",
        style: {
          width: "100%",
          height: "100%",
        },
        children: [],
      },
      {
        id: "1334-0-1",
        type: "text",
        label: "Text",
        text: "Hello, world!",
        children: [],
      },
    ],
  },
  // {
  //   id: "1335",
  //   type: "text",
  //   label: "Text",
  //   text: "Hello, world!",
  // },
  {
    id: "1336",
    type: "layout",
    label: "3 Column",
    columns: 3,
    children: [
      {
        id: "1336-2-0",
        type: "button",
        label: "Button",
        text: "1st Column, 1st Row!",
        style: {
          fontWeight: "bold",
          color: "#FAFAFA",
          textAlign: "center",
          backgroundColor: "#AA5AFA",
          borderRadius: "10px",
          padding: "10px",
        },
        children: [],
      },
      {
        id: "1336-2-1",
        type: "text",
        label: "Text",
        text: "2nd Column, 3rd Row!",
        style: {
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
        },
        children: [],
      },
      {
        id: "1336-2-2",
        type: "column",
        label: "ENTER CONTENT HERE",
        children: [],
      },
    ],
  },
];
