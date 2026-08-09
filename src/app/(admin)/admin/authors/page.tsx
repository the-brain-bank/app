import { Table } from "./_components/table";

export const metadata = {
  title: "Authors",
  description: "Authors",
};

export default async function Authors() {
  return (
    <section>
      <Table />
    </section>
  );
}
