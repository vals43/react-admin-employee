import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";

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
      <Typography variant="body2" sx={{ color: "#a0a0a8", fontSize: "0.7rem", mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((entry, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: entry.fill }} />
          <Typography variant="body2" sx={{ color: "#e8e8e4", fontWeight: 500, fontSize: "0.8rem" }}>
            {entry.name}: {entry.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const CustomLegend = ({ payload }) => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 1 }}>
    {payload?.map((entry, i) => (
      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: entry.color }} />
        <Typography variant="body2" sx={{ color: "#8a8a92", fontSize: "0.75rem" }}>
          {entry.value}
        </Typography>
      </Box>
    ))}
  </Box>
);

export const InternPaidChart = ({ data }) => (
  <Box sx={{ width: "100%", height: 220 }}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ left: -12, right: 0, top: 4, bottom: 4 }}>
        <defs>
          <linearGradient id="totalBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2aa8a8" stopOpacity={1} />
            <stop offset="100%" stopColor="#2aa8a8" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="paidBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4a35a" stopOpacity={1} />
            <stop offset="100%" stopColor="#c4a35a" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#8a8a92", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#5a5a62", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
        <Legend content={<CustomLegend />} />
        <Bar dataKey="total" name="Total" fill="url(#totalBarGrad)" radius={[4, 4, 0, 0]} barSize={28} />
        <Bar dataKey="paid" name="Rémunérés" fill="url(#paidBarGrad)" radius={[4, 4, 0, 0]} barSize={28} />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);
