"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { teamSchema } from "@/lib/schemas/team";
import { LuLoader2 } from "react-icons/lu";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { createTeam } from "@/actions/teams";
import { errorHandler } from "@/lib/errorHandler";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";

type Props = {
  onClose: () => void;
};

const NewTeamForm = (props: Props) => {
  const { onClose } = props;
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      make_default: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof teamSchema>) => {
    setLoading(true);
    try {
      const { data, error } = await createTeam(values);
      if (error) {
        throw error;
      }
      form.reset();
      revalidatePath(pathname);
    } catch (error: any) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>
              Teams are where you and your team collaborate. They can be private
              or public.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Wakanda" {...field} />
                    </FormControl>
                    <FormDescription>
                      Team names must be unique.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Wakanda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="make_default"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Make default team
                      </FormLabel>
                      <FormDescription>
                        This will be your default team.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading && <LuLoader2 className="animate-spin mr-2" />}
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
};

export default NewTeamForm;
