import { ExpenseGroup, GetAllExpenseGroupsUseCase } from "expenses-app-domain";
import { InMemoryExpenseGroupRepository } from "expenses-app-data";
import { useLoaderData } from "remix";

export async function loader(): Promise<ExpenseGroup[]> {
  const { data, error } = await new GetAllExpenseGroupsUseCase(
    new InMemoryExpenseGroupRepository()
  ).perform();

  if (error) {
    throw new Error(`[${error.type}] ${error.message}`);
  }

  return data || [];
}

export default function Index() {
  const expenseGroups = useLoaderData<ExpenseGroup[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {JSON.stringify(expenseGroups)}
    </div>
  );
}
