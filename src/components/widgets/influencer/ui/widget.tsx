import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Edit,  Trash2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import NextImage from "next/image";

export function Root({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("group relative flex flex-col gap-3", className)}
      {...props}
    />
  );
}

export function Image({
  className,
  src,
  alt,
  ...props
}: ComponentPropsWithoutRef<typeof NextImage>) {
  return (
    <NextImage
      src={src as string}
      alt={alt || "influencer cover"}
      className={cn(
        "object-cover",
        className,
      )}
      {...props}
    />
  );
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start w-full",
        className,
      )}
      {...props}
    />
  );
}

export function Title({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <TypographyH3
      className={cn(
        "line-clamp-1 text-xl font-semibold leading-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Bio({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "mt-1 text-base font-normal text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Actions({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 text-foreground", className)}
      {...props}
    />
  );
}

export function EditButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button variant="outline" size="icon-lg" className={className} {...props}>
      <Edit className="h-4 w-4" />
      <span className="sr-only">Edit</span>
    </Button>
  );
}

export function DeleteButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="icon-lg"
      className={cn(
        "hover:bg-destructive/10 hover:text-destructive",
        className,
      )}
      {...props}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}
