"use client";

import { FacebookLogo, GithubLogo, InstagramLogo, TikTokLogo } from "@/components/SocialIcons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ElementPreview({ element }: { element: any }) {
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

  console.log("element", element);

  switch (element.type) {
    case "button":
      return (
        <div className="rounded-md bg-background p-2">
          <Button className="w-full" style={{ ...commonStyles, ...element.style }}>
            {element.extraAttributes?.text || "A Button"}
          </Button>
        </div>
      );
    case "text":
      return (
        <div className="rounded-md bg-background p-2">
          <p style={{ ...commonStyles, ...element.style }} className="text-muted-foreground">
            {element.extraAttributes?.text || "A Text"}
          </p>
        </div>
      );
    case "title":
      return (
        <div className="rounded-md bg-background p-2">
          <h1 style={{ ...commonStyles, ...element.style }} className="text-muted-foreground">
            {element.extraAttributes?.text || "A Title"}
          </h1>
        </div>
      );
    case "image":
      return (
        <div
          className={cn(
            "flex aspect-video items-center justify-center rounded-lg bg-background bg-muted p-2",
          )}
          style={{ ...commonStyles, ...element.style }}
        >
          <span className="text-muted-foreground">Image Placeholder</span>
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
    case "icons":
      return (
        <div className="rounded-md bg-background p-2">
          <div className="flex justify-center gap-2">
            {[TikTokLogo, FacebookLogo, InstagramLogo, GithubLogo].map((SocialIcon, index) => (
              <Button
                key={SocialIcon.name || `social-icon-${index}`}
                variant="ghost"
                size="icon"
                style={{
                  backgroundColor: style.backgroundColor,
                  color: style.textColor,
                  borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
                }}
              >
                <SocialIcon />
                <span className="sr-only">{SocialIcon.name || "Social Icon"}</span>
              </Button>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
