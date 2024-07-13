interface AlertsProps {
  alerts: string;
}

export default function Alerts({ alerts }: AlertsProps) {
  return (
    <div
      className="overflow-x-auto flex flex-col gap-4"
      style={{ height: "calc(100vh - 224px)" }}
    >
      {alerts?.length > 0 &&
        alerts.split("#$").map((alert) => {
          const [toReplace, proposal] = alert.split("&&&");
          return (
            <div className="flex items-start gap-2 shadow-sm bg-[#fff] p-2 rounded-lg">
              ⚠️
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-red-500">
                    {toReplace.replaceAll("***", "")}
                  </span>
                  {` a `}
                  <span className="text-green-500">{proposal}</span>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
