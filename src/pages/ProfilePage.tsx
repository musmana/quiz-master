import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import { Avatar, AvatarFallback } from "../components/ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Save } from "lucide-react";
import { recentAttempts } from "../data/mock";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Quiz enthusiast",
    location: "San Francisco",
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-slate-500">{user.bio}</p>
              </div>
            </div>

            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            {recentAttempts.map((attempt) => (
              <Card key={attempt.id}>
                <CardContent className="p-4 flex justify-between">
                  <div>
                    <h4>{attempt.quizTitle}</h4>
                    <p className="text-sm text-slate-500">
                      {attempt.date}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
                <CardDescription>
                  Update your details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input label="Full Name" defaultValue={user.name} />
                <Input label="Email" defaultValue={user.email} />
                <Input label="Location" defaultValue={user.location} />

                <div className="flex justify-end">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" /> Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
