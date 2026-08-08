"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/core/domain/entities/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "../api/mutation";
import { FormFields, formSchema } from "../model/schema";
import { useDeleteCategoryStore } from "../model/store";

type Props = {
  category: Pick<Category, "id" | "name">;
};

export function Form(props: Props) {
  const qc = useQueryClient();
  const store = useDeleteCategoryStore();
  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: props.category,
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(data: FormFields) {
    const response = await mutate(data);
    if (!response.success) {
      toast.error(response.error || "Failed to delete the category");
      return;
    }
    qc.invalidateQueries({ queryKey: ["categories"] });
    toast.success(`Category deleted successfully!`, {
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    });
    store.close();
    form.reset();
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="w-full sm:w-auto"
          onClick={() => {
            form.reset();
            store.close();
          }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          variant="destructive"
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Deleting...
            </>
          ) : (
            "Yes, delete"
          )}
        </Button>
      </div>
    </form>
  );
}
