import { ElementStyle } from "@/lib/types/config.types";

interface ButtonComponentProps {
  style: ElementStyle;
  text?: string;
  url?: string;
}

function ButtonComponent({ style, text = "UNSTYLED Button", url }: ButtonComponentProps) {
  return (
    <a href={url} style={style}>
      {text}
    </a>
  );
}

export default ButtonComponent;
