import { User } from "entities";
import { useLoaderData } from "remix";

export async function loader(): Promise<User> {
  return { id: "1", name: "John" };
}

export default function Index() {
  const user = useLoaderData<User>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {JSON.stringify(user)}
    </div>
  );
}
