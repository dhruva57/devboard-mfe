import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { IDashboard } from "../types/IDashboard";

export const SimpleBarChart = ({ stats }: IDashboard.ISimpleBarChartProps) => {
  const data = [
    { label: "Total", value: stats.total, fill: "#111827" },
    { label: "Completed", value: stats.completed, fill: "#10b981" },
    { label: "Pending", value: stats.pending, fill: "#f59e0b" },
    {
      label: "Overdue",
      value: stats.overdue,
      fill: "#ef4444",
      border: "black",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <div className="text-lg font-semibold text-gray-900">Task Summary</div>
        <p className="mt-1 text-sm text-gray-500">
          Visual breakdown of current task counts.
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="label"
              type="category"
              tick={{ fill: "#4b5563", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              barSize={24}
              minPointSize={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
