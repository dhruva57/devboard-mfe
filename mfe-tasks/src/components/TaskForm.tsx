import { useState } from "react";
import type { ITaskModule } from "../types/ITask";
import { useTasks } from "../utils/useTasks";
import { PRIORITY_LIST, PRIORITIES } from "common_remote/constants";

const initialForm: ITaskModule.ICreateTaskPayload = {
  title: "",
  description: "",
  priority: PRIORITIES.medium,
  dueDate: "",
};

export const TaskForm = () => {
  const { handleCreateTask } = useTasks();

  const [form, setForm] = useState<ITaskModule.ICreateTaskPayload>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (
    field: keyof ITaskModule.ICreateTaskPayload,
    value: string | TaskPriority
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): string | null => {
    if (!form.title.trim()) {
      return "Title is required";
    }

    if (!form.dueDate) {
      return "Due date is required";
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      await handleCreateTask({
        title: form.title.trim(),
        description: form.description?.trim() || "",
        priority: form.priority,
        dueDate: new Date(form.dueDate).toISOString(),
      });

      setForm(initialForm);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Failed to create task"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="text-xl font-semibold text-gray-900">Create Task</div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-0 transition focus:border-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add an optional description"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-0 transition focus:border-gray-900"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              value={form.priority}
              onChange={(e) =>
                handleChange(
                  "priority",
                  e.target.value as ITaskModule.ITaskPriority
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-0 transition focus:border-gray-900"
            >
              {PRIORITY_LIST.map((item: ITaskModule.ITaskPriority) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="datetime-local"
              value={form.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-0 transition focus:border-gray-900"
            />
          </div>
        </div>

        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};
