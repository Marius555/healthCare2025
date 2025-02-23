import { Input } from "@/components/ui/input";

export default function FileInput() {
  return (
    (<div className="space-y-2">
      <Input
        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        type="file" />
    </div>)
  );
}
