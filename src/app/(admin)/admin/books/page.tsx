import { Table } from "./_components/table";

export const metadata = {
  title: "Books",
  description: "Books",
};

export default async function Books() {
  return (
    <section>
      <Table />
    </section>
  );
}
