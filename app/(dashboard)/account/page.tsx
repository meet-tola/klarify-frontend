import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Award, BarChart, CreditCard, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings and preferences.",
}

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight roca-bold">Account</h1>
        <p className="text-muted-foreground">Manage your account settings and view your progress.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/account/profile">
          <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                View and edit your personal information and personality assessment results.
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/account/achievements">
          <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Track your completed milestones and earned badges.</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/account/activity">
          <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Monitor your goals, learning progress, and streaks.</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/account/billing">
          <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billing</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Manage your subscription and payment methods.</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/account/settings">
          <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Update your email, password, and notification preferences.
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
