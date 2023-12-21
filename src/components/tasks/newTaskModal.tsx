import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type Props = {
  onClose: () => void;
};
const NewTaskModal = (props: Props) => {
  const { onClose } = props;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Task</DialogTitle>
        <DialogDescription>
          Tasks are used to track work that needs to be done.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Title</Label>
            <Input id="name" placeholder="Login page" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Subscription plan</Label>
            <Textarea id="plan" placeholder="Acme Inc." />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Continue</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default NewTaskModal;
