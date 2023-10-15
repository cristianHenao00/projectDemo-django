import { useForm } from "react-hook-form";
import { createTask, getTask, deleteTask, updateTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function TasksFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (!params.id) {
      await createTask(data);
      toast.success("Task New created");
    } else {
      await updateTask(params.id, data);
      toast.success("Task updated");
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
        toast.success("Task loaded");
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.title && <span>This field is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full"
        ></textarea>
        {errors.title && <span>This field is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm(
                "Are you sure you want to delete this task?"
              );
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Task deleted");
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
