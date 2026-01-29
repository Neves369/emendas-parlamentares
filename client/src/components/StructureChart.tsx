import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const COLORS = ["#e2fb5f", "#c4de4b", "#a6c239", "#89a528", "#6d8a18"];

export default function StructureChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-full bg-transparent">
      <ResponsiveContainer width="100%" height="100%">
        {/* Adicionado overflow visible para a label não sumir */}
        <BarChart
          data={data}
          margin={{ top: 50, right: 20, left: 10, bottom: 60 }}
          style={{ overflow: "visible" }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="Estrutura"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fill: "#000000", fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
          />
          {/* Aumentamos o domínio (domain) para criar teto para a label */}
          <YAxis
            domain={[0, "dataMax + 200000"]}
            tick={{ fill: "#000000", fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickFormatter={value => `${(value / 1_000_000).toFixed(0)}M`}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={() => null}
          />
          <Bar dataKey="Valor" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <LabelList
              dataKey="Valor"
              position="top"
              offset={15}
              formatter={(value: number) =>
                `R$ ${(value / 1_000_000).toFixed(1)}M`
              }
              style={{
                fill: "#000000",
                fontSize: "13px",
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
