import { Counter } from "../modules/v1/order/counter.model";

export async function getNextOrderNumber(): Promise<string> {
  const counter = await Counter.findOneAndUpdate(
    { name: "orders" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return `ORD-${new Date().getFullYear()}-${String(counter.value).padStart(5, "0")}`;
}
