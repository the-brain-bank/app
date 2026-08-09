import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import type { User } from "@/core/domain/entities/user";
import { cn } from "@/lib/utils";
import { Edit, Image as ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import NextImage from "next/image";

export function Root({
  className,
  influencerId,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  influencerId: User["id"];
}) {
  return (
    <Link href={`/influencers/${influencerId}`} className="block w-full">
      <div
        className={cn("group relative flex flex-col gap-3", className)}
        {...props}
      />
    </Link>
  );
}

export function Image({
  className,
  src,
  alt,
  ...props
}: ComponentPropsWithoutRef<typeof NextImage>) {
  return (
    <div className={cn("w-full overflow-hidden bg-neutral-100/10", className)}>
      {src ? (
        <NextImage
          src={src as string}
          fill
          alt={alt || "influencer cover"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          {...props}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <ImageIcon className="h-10 w-10 opacity-20" />
        </div>
      )}
    </div>
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

// visible only for influencerized users
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

// visible only for influencerized users
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
