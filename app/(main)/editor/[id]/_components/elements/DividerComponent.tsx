import React from "react";
import { ElementStyle } from "@/lib/types/config.types";

interface DividerComponentProps {
  style: ElementStyle;
}

function DividerComponent({ style }: DividerComponentProps) {
  return <hr style={style} />;
}

export default DividerComponent;
