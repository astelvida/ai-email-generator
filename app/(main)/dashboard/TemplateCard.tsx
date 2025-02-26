import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, Calendar, User } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface TemplateCardProps {
  template: {
    title: string;
    id: string;
    content: string;
    userId: string;
    userName: string | null;
    userEmail: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  // Truncate content to show as preview
  const contentPreview = template.content.slice(0, 100) + "...";
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg text-primary">{template.title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <User className="w-4 h-4" />
              <span>{template.userName || template.userEmail || "Anonymous"}</span>
            </div>
          </div>
          <Link href={`/editor/${template.id}`}>
            <Button
              size="lg"
              className="rounded-lg transition-all duration-300 gap-2  shadow-md hover:shadow-lg 
bg-gradient-to-r from-primary to-purple-500/80 hover:from-purple-500/90 hover:to-purple-500/70 text-primary-foreground "
            >
              <EditIcon className="w-5 h-5" />
              Edit
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{contentPreview}</p>
      </CardContent>

      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Created {formatDistanceToNow(new Date(template.createdAt))} ago</span>
        </div>
        <div>Last updated: {formatDistanceToNow(new Date(template.updatedAt))} ago</div>
      </CardFooter>
    </Card>
  );
}
