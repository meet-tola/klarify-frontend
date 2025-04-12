"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading-screen";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, loading, setUser } = useAuthContext();
  const [emailData, setEmailData] = useState({
    email: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setEmailData({
        email: user.user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUser();
      setUser(null);

      toast.success("Account deleted successfully!");
      router.push("/signup");
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading your profile..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account email and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all of your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
                  <div>
                    <h4 className="font-medium text-destructive">
                      Warning: This action cannot be undone
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, all of your data will be
                      permanently removed. This includes your profile,
                      assessment results, learning progress, and achievements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and all of your data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage how your data is used and shared.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Data Usage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect anonymous usage data to improve our
                        platform
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="personalization">Personalization</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to use your data to personalize your experience
                      </p>
                    </div>
                    <Switch id="personalization" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Profile Visibility</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users on the platform
                      </p>
                    </div>
                    <Switch id="public-profile" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-achievements">
                        Show Achievements
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Display your badges and achievements on your public
                        profile
                      </p>
                    </div>
                    <Switch id="show-achievements" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Data Export</h3>
                <p className="text-sm text-muted-foreground">
                  You can request a copy of all the data we have about you.
                </p>
                <Button variant="outline">Request Data Export</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
