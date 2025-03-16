"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { UserRole } from "@/lib/types"

interface RoleToggleProps {
  role: UserRole
  onRoleChange: (role: UserRole) => void
}

export function RoleToggle({ role, onRoleChange }: RoleToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="role-toggle" className="text-sm font-medium">
        {role === "customer" ? "Customer View" : "Seller View"}
      </Label>
      <Switch
        id="role-toggle"
        checked={role === "seller"}
        onCheckedChange={(checked) => onRoleChange(checked ? "seller" : "customer")}
      />
    </div>
  )
}

