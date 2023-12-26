import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { LuLoader2 } from "react-icons/lu";
import { IconContext } from "react-icons";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { errorHandler } from "@/lib/errorHandler";
import { useTasks } from "@/contexts/tasksContext";
import { generateDescription } from "@/actions/ai";
import { useForm } from "react-hook-form";
import { taskSchema } from "@/lib/schemas/task";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextEditor from "../shared/textEditor";
import { toast } from "sonner";
import { useApi } from "@/hooks/useApi";
import { getPriorities } from "@/actions/priorities";
import { Priority, PriorityType } from "@/lib/types/priority";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { createTask } from "@/actions/tasks";
import { Workflow } from "@/lib/types/workflow";

type Props = {
  onClose: () => void;
  workflow: Workflow;
};

const NewTaskModal = (props: Props) => {
  const { onClose, workflow } = props;
  const [aiProcessing, setAiProcessing] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const { selectedProject } = useTasks();
  const { data } = useApi<{ data: Priority[] | null }>({
    url: "/priorities",
    fetcher: getPriorities,
  });

  const priorities = data?.data || [];

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority_id: PriorityType.Medium,
    },
  });

  const { setValue, watch, getValues, register, formState, handleSubmit } =
    form;
  const errors = formState.errors;

  const name = watch("name");

  const generateDescriptionForName = async () => {
    if (!name?.trim().length || name.trim().length < 3) {
      toast.error("Please enter a valid name");
      return;
    }
    setAiProcessing(true);
    try {
      const res = await generateDescription({
        name: name!,
        type: "task",
        projectName: selectedProject?.name,
        projectDescription: selectedProject?.description,
      });
      setValue("description", res.content);
      toast.success("Description generated successfully");
    } catch (error) {
      errorHandler(error);
    } finally {
      setAiProcessing(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    setSubmitting(true);
    try {
      const selectedPriorityId = priorities.find(
        (priority) => priority.name === data.priority_id
      )?.id;

      const res = await createTask({
        projectMataData: {
          project_id: selectedProject?.id!,
          team_id: selectedProject?.team?.id!,
          workflow_id: workflow.id!,
        },
        task: {
          ...data,
          priority_id: selectedPriorityId as PriorityType,
        },
      });
      const { data: resData, error } = res;
      if (error) {
        throw error;
      }

      console.log({ resData });
      toast.success("Task created successfully");
      onClose();
    } catch (error) {
      errorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              Create Task for <Badge>{workflow.name}</Badge>
            </SheetTitle>
            <SheetDescription>
              Tasks are used to track work that needs to be done.
            </SheetDescription>
          </SheetHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Task name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="priority_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.id} value={priority.name}>
                              <Label>{priority.name}</Label>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Description
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={generateDescriptionForName}
                                disabled={
                                  aiProcessing ||
                                  !name?.trim().length ||
                                  name.trim().length < 3
                                }
                              >
                                {aiProcessing ? (
                                  <LuLoader2 className="animate-spin mr-2 text-xl" />
                                ) : (
                                  <IconContext.Provider
                                    value={{
                                      className: "text-xl text-primary",
                                    }}
                                  >
                                    <FaWandMagicSparkles />
                                  </IconContext.Provider>
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Generate with AI</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <TextEditor
                          onChange={(value) => field.onChange(value)}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={formState.isSubmitting}
            >
              Continue
            </Button>
          </SheetFooter>
        </SheetContent>
      </form>
    </Form>
  );
};

export default NewTaskModal;
