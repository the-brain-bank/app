import { CheckIcon, ChevronsUpDownIcon, Loader2Icon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type AsyncSearchFetchArgs = {
  search: string;
  signal: AbortSignal;
};

export type AsyncSearchMultiDropdownProps<T> = {
  /** Selected options' stable values (strings). */
  value: string[];
  /**
   * Fired when the user picks/unpicks options. Receives the values plus the original
   * items.
   */
  onChange: (value: string[], items: T[]) => void;
  /** Async loader — receives current search and an abort signal. */
  fetchPage: (args: AsyncSearchFetchArgs) => Promise<T[]>;
  getOptionValue: (item: T) => string;
  getOptionLabel: (item: T) => string;
  /** Optional rich row content (defaults to `getOptionLabel`). */
  renderOption?: (item: T, opts: { selected: boolean }) => React.ReactNode;
  /**
   * Items the parent already knows about for the current `value`
   */
  initialItems?: T[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  loadingText?: string;
  /** Debounce (ms) applied to the search input before re-fetching. */
  debounceMs?: number;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  contentClassName?: string;
  id?: string;
  /** Max labels to display before summarizing */
  maxDisplay?: number;
};

export function AsyncSearchMultiDropdown<T>({
  value,
  onChange,
  fetchPage,
  getOptionValue,
  getOptionLabel,
  renderOption,
  initialItems = [],
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results",
  loadingText = "Loading...",
  debounceMs = 250,
  disabled,
  invalid,
  className,
  contentClassName,
  id,
  maxDisplay = 3,
}: AsyncSearchMultiDropdownProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [items, setItems] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!open) return;
    const x = window.scrollX;
    const y = window.scrollY;
    const restore = () => {
      if (window.scrollX !== x || window.scrollY !== y) {
        window.scrollTo({
          left: x,
          top: y,
          behavior: "instant" as ScrollBehavior,
        });
      }
    };
    let cancelled = false;
    const id1 = requestAnimationFrame(() => {
      if (cancelled) return;
      restore();
      requestAnimationFrame(() => {
        if (cancelled) return;
        restore();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id1);
    };
  }, [open]);

  const fetchPageRef = React.useRef(fetchPage);
  React.useEffect(() => {
    fetchPageRef.current = fetchPage;
  }, [fetchPage]);

  // Keep track of item objects for selected values
  const [selectedItemsMap, setSelectedItemsMap] = React.useState<Map<string, T>>(() => {
    const map = new Map<string, T>();
    initialItems.forEach((it) => map.set(getOptionValue(it), it));
    return map;
  });

  React.useEffect(() => {
    setSelectedItemsMap((prev) => {
      const next = new Map(prev);
      let changed = false;
      items.forEach((it) => {
        const val = getOptionValue(it);
        if (value.includes(val) && !next.has(val)) {
          next.set(val, it);
          changed = true;
        }
      });
      // Do not delete items from map even if they are not in `value`, 
      // because we might still need them if they get re-selected. 
      // Actually, if we delete them, it's fine as long as we add them back on select.
      return changed ? next : prev;
    });
  }, [value, items, getOptionValue]);

  React.useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    const delay = search ? debounceMs : 0;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const next = await fetchPageRef.current({
          search,
          signal: ctrl.signal,
        });
        if (!ctrl.signal.aborted) setItems(next);
      } catch {
        if (!ctrl.signal.aborted) setItems([]);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, delay);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [open, search, debounceMs]);

  React.useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Prepend selected items to results when they aren't in the current page
  const merged = React.useMemo<T[]>(() => {
    const map = new Map<string, T>();
    items.forEach((it) => map.set(getOptionValue(it), it));

    const res = [...items];
    value.forEach((val) => {
      if (!map.has(val)) {
        const it = selectedItemsMap.get(val);
        if (it) {
          res.unshift(it);
          map.set(val, it);
        }
      }
    });
    return res;
  }, [items, value, selectedItemsMap, getOptionValue]);

  const handleSelect = (itemValue: string, item: T) => {
    const isSelected = value.includes(itemValue);
    const nextValue = isSelected
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];

    const nextItemsMap = new Map(selectedItemsMap);
    if (!isSelected) {
      nextItemsMap.set(itemValue, item);
    }
    const nextItems = nextValue.map((v) => nextItemsMap.get(v)!).filter(Boolean);

    setSelectedItemsMap(nextItemsMap);
    onChange(nextValue, nextItems);
  };

  const selectedLabels = value.map((v) => {
    const it = selectedItemsMap.get(v);
    return it ? getOptionLabel(it) : v;
  });

  return (
    <Popover open={open} onOpenChange={(o) => !disabled && setOpen(o)}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            "w-full justify-between gap-2 font-normal p-2",
            value.length === 0 && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex flex-wrap gap-1 items-center max-w-[calc(100%-1rem)]">
            {value.length === 0 ? (
              <span className="truncate">{placeholder}</span>
            ) : selectedLabels.length <= maxDisplay ? (
              selectedLabels.map((label, i) => (
                <div
                  key={i}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 truncate max-w-full"
                >
                  {label}
                </div>
              ))
            ) : (
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 truncate max-w-full">
                {value.length} selected
              </div>
            )}
          </div>
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-(--anchor-width) min-w-(--anchor-width) p-0",
          contentClassName,
        )}
      >
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={searchPlaceholder}
          />
          <CommandList className="mt-2 px-1">
            {loading ? (
              <div className="mt-2 flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" /> {loadingText}
              </div>
            ) : merged.length === 0 ? (
              <CommandEmpty>{emptyText}</CommandEmpty>
            ) : (
              merged.map((item, index) => {
                const v = getOptionValue(item);
                const isSelected = value.includes(v);
                return (
                  <CommandItem
                    key={v}
                    value={v}

                    className={cn(index > 0 ? "mt-1" : "")}
                    onSelect={() => handleSelect(v, item)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={cn(
                          "flex items-center justify-center size-4 border rounded-sm shrink-0",
                          isSelected
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-primary"
                        )}
                      >
                        {isSelected && <CheckIcon className="size-3" />}
                      </div>
                      <div className="flex-1 truncate">
                        {renderOption
                          ? renderOption(item, { selected: isSelected })
                          : getOptionLabel(item)}
                      </div>
                    </div>
                  </CommandItem>
                );
              })
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
