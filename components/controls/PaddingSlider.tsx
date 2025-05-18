import { usePreferencesStore } from "@/store/use-preferences-store";
import { Slider } from "../ui/slider";

export default function PaddingSlider() {
  const padding = usePreferencesStore((state) => state.padding);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>
      <Slider
        className="w-44 my-5"
        value={[padding]}
        onValueChange={([padding]) => usePreferencesStore.setState({ padding })}
        max={128}
        step={8}
      />
    </div>
  );
}
