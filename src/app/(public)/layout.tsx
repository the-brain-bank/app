import { Header } from "@/components/widgets/header";
import { SearchBook } from "@/features/search-book";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="container mx-auto py-4">
        <SearchBook />
      </div>
      <main>{children}</main>
    </>
  );
}
