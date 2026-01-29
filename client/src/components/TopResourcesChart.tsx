import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export default function TopResourcesChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-[450px] bg-transparent">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 120, left: 40, bottom: 20 }}
          style={{ overflow: "visible" }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={true}
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fill: "#ffffff", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`}
          />
          <YAxis
            dataKey="Autor"
            type="category"
            width={180}
            tick={{ fill: "#ffffff", fontSize: 12, fontWeight: 800 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickLine={false}
          />
          <Bar dataKey="Valor" radius={[0, 10, 10, 0]} barSize={40}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 0
                    ? "#e2fb5f"
                    : `rgba(226, 251, 95, ${0.9 - index * 0.05})`
                }
              />
            ))}
            <LabelList
              dataKey="Valor"
              position="right"
              offset={15}
              formatter={(v: number) => `R$ ${(v / 1_000_000).toFixed(2)}M`}
              style={{
                fill: "#e2fb5f",
                fontSize: "14px",
                fontWeight: "900",
                fontFamily: "monospace",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
