import { toast } from "sonner";

export const errorHandler = (error: any) => {
  if (error.data) {
    toast.error(error.data.message);
  } else {
    toast.error(error.message);
  }
};
