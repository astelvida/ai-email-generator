import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Element } from "./types";

export function ElementPreview({ element }: { element: Element }) {
  const style = element.style || {};

  // Common inline styles based on element.style
  const commonStyles = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
    fontWeight: style.fontWeight,
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
    padding: style.padding ? `${style.padding}px` : undefined,
    textAlign: style.textAlign,
    width: style.width,
    height: style.height,
  };

  switch (element.type) {
    case "button":
      return (
        <div className="rounded-md bg-background p-2">
          <Button className="w-full" style={commonStyles}>
            {element.content}
          </Button>
        </div>
      );
    case "text":
      return (
        <div className="rounded-md bg-background p-2">
          <p style={commonStyles} className="text-muted-foreground">
            {element.content}
          </p>
        </div>
      );
    case "image":
      return (
        <div
          className={cn(
            "flex aspect-video items-center justify-center rounded-lg bg-background bg-muted p-2",
          )}
          style={commonStyles}
        >
          <span className="text-muted-foreground">Image Placeholder</span>
        </div>
      );
    case "logo":
      return (
        <div
          className={cn(
            "flex h-12 items-center justify-center rounded-lg bg-background bg-muted p-2",
          )}
          style={commonStyles}
        >
          <span className="text-muted-foreground">Logo Placeholder</span>
        </div>
      );
    case "divider":
      return (
        <div className="rounded-md bg-background p-2">
          <hr
            className="my-4"
            style={{
              borderColor: style.backgroundColor || style.textColor,
              borderWidth: style.fontSize ? `${style.fontSize}px` : undefined,
              width: style.width,
            }}
          />
        </div>
      );
    case "social":
      return (
        <div className="rounded-md bg-background p-2">
          <div className="flex justify-center gap-2">
            {["Twitter", "Facebook", "Instagram"].map((social) => (
              <Button
                key={social}
                variant="outline"
                size="icon"
                style={{
                  backgroundColor: style.backgroundColor,
                  color: style.textColor,
                  borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
                }}
              >
                {social[0]}
              </Button>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
