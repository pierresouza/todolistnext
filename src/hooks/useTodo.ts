import { taskList } from "@/state/index";
import { useAtom } from "jotai";

export function useTodo() {
  const [taskTodo, setTaskTodo] = useAtom(taskList);
  return { taskTodo, setTaskTodo };
}
