import { ElementOuterStyle, ElementStyle } from "@/lib/types/config.types";

interface TextComponentProps {
  style: ElementStyle;
  outerStyle?: ElementOuterStyle;
  text?: string;
}

function TextComponent({ style, text = "UNSTYLED TEXT" }: TextComponentProps) {
  return (
    <div style={style}>
      <h2>{text}</h2>
    </div>
  );
}

export default TextComponent;
