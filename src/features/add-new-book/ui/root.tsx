import { categoryRepository, userRepository } from "@/composition";
import { Form } from "./form";

export async function Root() {
  const users = await userRepository.findAll(100);
  const categories = await categoryRepository.findAll(1000, 0);

  return <Form authors={users} categories={categories?.data || []} />;
}
