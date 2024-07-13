import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface TweetProps {
  tweet: string;
}

export default function Tweets({ tweet }: TweetProps): JSX.Element {
  const tweetSplited = tweet.split("#$");
  const firstTweet = tweetSplited[0];
  const anothersTweets = tweetSplited.slice(1);
  return (
    <div
      className="overflow-x-auto flex flex-col gap-4"
      style={{ height: "calc(100vh - 224px)" }}
    >
      {firstTweet && (
        <Accordion type="single" defaultValue="tweet-principal">
          <AccordionItem value="tweet-principal">
            <AccordionTrigger
              className="flex items-start gap-2  bg-[#fff] p-2 rounded-lg preserve-format text-left hover:no-underline"
            >
              {firstTweet}
            </AccordionTrigger>
            <AccordionContent>
              {anothersTweets.length > 0 && (
                <div className="flex flex-col gap-4 mt-4 p-2 rounded-lg preserve-format text-left hover:no-underline">
                  {anothersTweets.map((tweet, index) => (
                    <div className="flex gap-x-3" key={`tweet-${index}`}>
                      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-500">
                        <div className="relative z-10 size-7 flex justify-center items-center">
                          <div className="size-2 rounded-full bg-gray-400"></div>
                        </div>
                      </div>

                      <div className="grow pt-0.5 pb-8 bg-[#fff] p-2 rounded-lg">
                        <p className="mt-1 text-sm text-gray-600">{tweet.replaceAll("#$", "").replaceAll("\n", "")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
