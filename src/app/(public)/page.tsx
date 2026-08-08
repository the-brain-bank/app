import { TopAuthors } from "@/features/top-authors";
import { TopBooks } from "@/features/top-books";

export default async function HomePage() {
  return (
    <>
      <TopBooks />
      <TopAuthors />
    </>
  );
}
