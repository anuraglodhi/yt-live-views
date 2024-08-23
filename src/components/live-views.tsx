import {
  Area,
  AreaChart,
  CartesianGrid,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip } from "./ui/chart";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "@/hooks/use-interval";
import {
  type NameType,
  type ValueType,
} from "recharts/types/component/DefaultTooltipContent";
const config = {
  views: {
    label: "views",
    color: "#ff0000",
  },
} satisfies ChartConfig;

const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });
const commas = new Intl.NumberFormat("en-Us");

type viewData = { time: string; views: number };

export const LiveViews = ({ id }: { id: string }) => {
  const [data, setData] = useState<viewData[]>([]);
  const [domain, setDomain] = useState<number[]>([]);
  let min = useRef<number>(+Infinity);
  let max = useRef<number>(-Infinity);

  async function fetchViews() {
    const time = new Date(Date.now()).toTimeString().split(" ")[0];

    const res = await fetch(`/api/v1/video/views?id=${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setData((prev) => [
      { time: time, views: data.statistics.viewCount },
      ...prev,
    ]);

    min.current = Math.min(min.current, data.statistics.viewCount);
    max.current = Math.max(max.current, data.statistics.viewCount);
    setDomain(getDomain([min.current, max.current]));
  }

  useInterval(fetchViews, 2000);
  useEffect(() => {
    fetchViews();
  }, []);

  function getDomain(domain: number[]) {
    if (domain[0] == -Infinity || domain[1] == Infinity) return [0, 0];
    const margin = (domain[1] - domain[0]) * 0.1;

    return [domain[0], domain[1] + margin];
  }

  // console.log(data[0]?.views || 0);


  return (
    <>
      <div className="flex items-center justify-center text-lg">
        Views: &nbsp;
        {commas.format(data[0]?.views || 0)}
      </div>
      <ChartContainer config={config} className="h-[450px]">
        <AreaChart data={data}>
          <CartesianGrid vertical={false} />
          <YAxis
            dataKey="views"
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => formatter.format(value)}
            domain={getDomain(domain)}
          />
          <XAxis reversed dataKey="time" />
          <Area dataKey="views" />
          <ChartTooltip content={<Tooltip />} />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

const Tooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || !payload.length) return;
  return (
    <div className="rounded-md border border-slate-100 px-4 py-2">
      <div>
        Views: {commas.format(Number.parseInt(payload[0].value!.toString()))}
      </div>
      <div>at {label}</div>
    </div>
  );
};
