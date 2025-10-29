import { useState } from "react";
import { LogOut, Mail, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-blue-600 rounded-xl"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <User className="w-5 h-5 text-purple-500" />
          <span>{user?.name || "Hello"}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-2xl shadow-lg p-2 bg-white"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="px-3 py-2 text-sm text-gray-600 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-500" />
          {user?.email || "No email"}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 font-medium cursor-pointer hover:bg-red-100"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
