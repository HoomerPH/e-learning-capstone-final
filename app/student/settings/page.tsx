import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function StudentSettings() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Jane Student" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="student@example.com" />
              </div>
            </div>
            <Separator className="my-6" />
            <Button>Save Changes</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Learning Preferences</h2>
            <div className="space-y-4">
              {[
                "Show course progress on dashboard",
                "Email notifications for new lessons",
                "Weekly progress report",
                "Course completion certificates"
              ].map((setting) => (
                <div key={setting} className="flex items-center justify-between">
                  <span className="text-sm">{setting}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Security</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Separator className="my-6" />
            <Button>Update Password</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}