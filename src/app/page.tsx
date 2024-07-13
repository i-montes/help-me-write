"use client";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/nav";
import Alerts from "@/components/alerts";
import Tweets from "@/components/tweets";
import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { AlertsAi, TweetsAi } from "./actions";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Index() {
  const [selectedTab, setSelectedTab] = useState("twitter");
  const [content, setContent] = useState("");
  const [outputByAi, setOutput] = useState<string>("");

  const generateToTweet = async () => {
    const { output } = await TweetsAi(content);

    for await (const delta of readStreamableValue(output)) {
      setOutput((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  const generateAlerts = async () => {
    const { output } = await AlertsAi(content);

    for await (const delta of readStreamableValue(output)) {
      setOutput((currentGeneration) => `${currentGeneration}${delta}`);
    }
  }

  const generate = async (content: string) => {
    if (content.length > 0) {
      if (selectedTab === "twitter") {
        generateToTweet();
      } else if(selectedTab === "alerts") {
        generateAlerts();
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-80 flex-col border-r bg-background p-4 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-xl font-bold">Help me write ✍️</h2>
        </div>
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 pl-7">
              <h1 className="text-3xl font-bold">Write a new article</h1>
              <Textarea
                placeholder="Start writing your article here..."
                className="resize-none text-lg"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ height: "calc(100vh - 240px)" }}
              />
              <Button
                className="w-full bg-green-500 text-white"
                onClick={() => generate(content)}
              >
                Generate 🚀
              </Button>
            </div>
            <div
              className="space-y-4 rounded-lg p-4 w-full"
              style={{
                height: "calc(100vh - 135px)",
                backgroundColor: "hsl(240 4.8% 95.9%)",
                maxWidth: "380px",
              }}
            >
              <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="flex justify-between">
                  <TabsTrigger value="twitter">To Twitter</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  {/* <TabsTrigger value="imagine">Imagine</TabsTrigger> */}
                </TabsList>
                <TabsContent
                  value="twitter"
                  forceMount={true}
                  hidden={selectedTab !== "twitter"}
                >
                  <Tweets tweet={outputByAi} />
                </TabsContent>
                <TabsContent
                  value="alerts"
                  forceMount={true}
                  hidden={selectedTab !== "alerts"}
                >
                  <Alerts alerts={outputByAi} />
                </TabsContent>
                {/* <TabsContent
                  value="imagine"
                  forceMount={true}
                  hidden={selectedTab !== "imagine"}
                >
                  <h2 className="text-xl font-semibold">Graphic Options</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="include-image" />
                      <Label htmlFor="include-image">Include Image</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="include-diagram" />
                      <Label htmlFor="include-diagram">Include Diagram</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="include-chart" />
                      <Label htmlFor="include-chart">Include Chart</Label>
                    </div>
                  </div>
                </TabsContent> */}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
