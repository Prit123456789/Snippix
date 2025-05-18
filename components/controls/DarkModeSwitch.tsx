import { usePreferencesStore } from "@/store/use-preferences-store";
import { Switch } from "../ui/switch";

export default function DarkModeSwitch() {
  const darkMode = usePreferencesStore((state) => state.darkMode);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        DarkMode
      </label>
      <Switch
        checked={darkMode}
        onCheckedChange={(checked) =>
          usePreferencesStore.setState({ darkMode: checked })
        }
        className="my-1.5"
      />
    </div>
  );
}
