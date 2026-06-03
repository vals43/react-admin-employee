import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#2aa8a8", "#c4a35a", "#4ab86a", "#e04848", "#7a5aea"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        backgroundColor: "rgba(18,20,24,0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <Typography variant="body2" sx={{ color: "#a0a0a8", fontSize: "0.7rem", mb: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "#e8e8e4", fontWeight: 600 }}>
        {payload[0].value} employé{payload[0].value > 1 ? "s" : ""}
      </Typography>
    </Box>
  );
};

export const DepartmentBarChart = ({ data }) => (
  <Box sx={{ width: "100%", height: 240 }}>
    <ResponsiveContainer>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`deptBarGrad-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity={0.7} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: "#5a5a62", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#8a8a92", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={100}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
          {data?.map((_, i) => (
            <Cell key={i} fill={`url(#deptBarGrad-${i % COLORS.length})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Box>
);
