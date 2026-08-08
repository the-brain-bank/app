"use client";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AsyncSearchMultiDropdown } from "@/components/widgets/async-search-dropdown/ui/multi-select";
import { AsyncSearchDropdown } from "@/components/widgets/async-search-dropdown/ui/widget";
import { Category } from "@/core/domain/entities/category";
import { User } from "@/core/domain/entities/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { searchCategoriesAction, searchUsersAction } from "../api/actions";
import { mutation } from "../api/mutation";
import { FormFields, formSchema } from "../model/schema";
import { Book } from "@/core/domain/entities/book";

interface Props {
  book: Book;
  onSuccess?: () => void;
}

export function Form(props: Props) {
  const router = useRouter();
  const mutationResult = useMutation({
    mutationKey: ["edit-book", props.book.id],
    mutationFn: async (fields: FormFields) => {
      const result = await mutation({
        ...fields,
        bookId: props.book.id,
      });
      if (result.success === false) {
        return toast.error(result.error);
      }
      toast.success("Successfully updated!");
      router.refresh();
      props.onSuccess?.();
    },
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: props.book.title,
      description: props.book.description,
      authorId: props.book.authorId,
      categoryIds: props.book.categories?.map(c => c.id) || [],
    },
  });

  function onSubmit(data: FormFields) {
    mutationResult.mutateAsync(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FieldGroup className="max-h-[74vh] overflow-y-auto">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...field}
                id="description"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="min-h-[150px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="authorId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="author">
                  Select the author of the book
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <AsyncSearchDropdown<User>
                id="author"
                value={field.value || null}
                onChange={(val) => field.onChange(val)}
                fetchPage={async ({ search }) => {
                  return searchUsersAction(search);
                }}
                getOptionValue={(u) => u.id}
                getOptionLabel={(u) => u.name}
                placeholder="Select author"
                invalid={fieldState.invalid}
                initialItem={props.book.author}
              />
            </Field>
          )}
        />

        <Controller
          name="categoryIds"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="category">
                  Select categories for the book
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <AsyncSearchMultiDropdown<Category>
                id="category"
                value={field.value || []}
                onChange={(val) => field.onChange(val)}
                fetchPage={async ({ search }) => {
                  return searchCategoriesAction(search);
                }}
                getOptionValue={(c) => c.id}
                getOptionLabel={(c) => c.name}
                placeholder="Select categories"
                invalid={fieldState.invalid}
                initialItems={props.book.categories || []}
              />
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={mutationResult.isPending || !form.formState.isDirty}
      >
        {mutationResult.isPending && <Loader2 className="animate-spin mr-2" />}
        Save changes
      </Button>
    </form>
  );
}
