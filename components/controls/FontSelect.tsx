import { fonts } from "@/options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePreferencesStore } from "@/store/use-preferences-store";

export default function FontSelect() {
  const fontStyle = usePreferencesStore((state) => state.fontStyle);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font
      </label>
      <Select
        value={fontStyle}
        onValueChange={(fontStyle) =>
          usePreferencesStore.setState({ fontStyle })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
