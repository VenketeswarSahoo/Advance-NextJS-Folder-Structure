import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex gap-2 justify-center items-center h-screen">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
};

export default page;
