import { DownloadIcon, ImageIcon, Link2Icon, Share2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { toBlob, toPng, toSvg } from "html-to-image";
import { usePreferencesStore } from "@/store/use-preferences-store";
import { useHotkeys } from "react-hotkeys-hook";

export default function ExportOptions({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement>;
}) {
  const title = usePreferencesStore((state) => state.title);

  const copyImage = async () => {
    const loading = toast.loading("Copying...");

    try {
      // generate blob from DOM node using html-to-image library
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      });

      // Create a new ClipboardItem from the image blob
      const img = new ClipboardItem({ "image/png": imgBlob as Blob });
      navigator.clipboard.write([img]);

      toast.remove(loading);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.remove(loading);
      toast.error("Something went wrong!");
    }
  };

  const copyLink = () => {
    try {
      // Get the current state using the 'usePreferencesStore ' hook
      const state = usePreferencesStore.getState();

      // Encode the 'code' property of the state object to base-64 encoding
      const encodedCode = btoa(state.code);

      // Create a new URLSearchParams object with state parameters, including the encoded 'code'
      const queryParams = new URLSearchParams({
        ...state,
        code: encodedCode,
      } as unknown as string).toString();

      // Construct the URL with query parameters and copy it to the clipboard
      navigator.clipboard.writeText(`${location.href}?${queryParams}`);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // Save images in different formats
  const saveImage = async (name: string, format: string) => {
    const loading = toast.loading(`Exporting ${format} image...`);

    try {
      let imgUrl, filename;
      switch (format) {
        case "PNG":
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.png`;
          break;
        case "SVG":
          imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.svg`;
          break;

        default:
          return;
      }
      // using anchor tag prompt dowload window
      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = filename;
      a.click();

      toast.remove(loading);
      toast.success("Exported successfully!");
    } catch (error) {
      console.error(error);
      toast.remove(loading);
      toast.error("Something went wrong!");
    }
  };

  useHotkeys("ctrl+c", copyImage);
  useHotkeys("shift+ctrl+c", copyLink);
  useHotkeys("ctrl+s", () => saveImage(title, "PNG"));
  useHotkeys("shift+ctrl+s", () => saveImage(title, "SVG"));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onClick={copyLink}>
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "PNG")}
        >
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "SVG")}
        >
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
