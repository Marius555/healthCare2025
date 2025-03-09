import { Button } from "@/components/ui/button";
import NavBarWrapper from "@/components/navBarWrapper";
export default function Home() {
  return (
    <>
      <NavBarWrapper />
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
        <Button>Click me</Button>
      </div>
    </>
  );
}
