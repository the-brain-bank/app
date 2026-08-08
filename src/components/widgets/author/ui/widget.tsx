import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import { User } from "@/core/domain/entities/user";
import { cn } from "@/lib/utils";
import { Edit, Image as ImageIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export function AuthorRoot({
  className,
  authorId,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  authorId: User["id"];
}) {
  return (
    <Link href={`/authors/${authorId}`} className="block w-full">
      <div
        className={cn(
          "group relative flex flex-col gap-3",
          className,
        )}
        {...props}
      />
    </Link>
  );
}

export function AuthorImage({
  className,
  src,
  alt,
  ...props
}: ComponentPropsWithoutRef<"img">) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden bg-neutral-100/10",
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "author cover"}
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

export function AuthorContent({
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

export function AuthorTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <TypographyH3
      className={cn("line-clamp-1 text-xl font-semibold leading-tight text-foreground", className)}
      {...props}
    />
  );
}

export function AuthorBio({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
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

export function AuthorActions({
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

// visible only for authorized users
export function AuthorEditButton({
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

// visible only for authorized users
export function AuthorDeleteButton({
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
