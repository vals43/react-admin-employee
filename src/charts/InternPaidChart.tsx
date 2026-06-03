import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        backgroundColor: "#1e2128",
        border: "1px solid #22252b",
        borderRadius: 1.5,
        px: 1.5,
        py: 1,
      }}
    >
      <Typography variant="body2" sx={{ color: "#e4e4e0", fontWeight: 500 }}>
        {label}
      </Typography>
      {payload.map((entry, i) => (
        <Typography key={i} variant="body2" sx={{ color: entry.fill }}>
          {entry.value} stagiaire{entry.value > 1 ? "s" : ""}
        </Typography>
      ))}
    </Box>
  );
};

export const InternPaidChart = ({ data }) => (
  <Card
    sx={{
      borderRadius: 3,
      border: "1px solid #22252b",
      backgroundColor: "#16181d",
      height: "100%",
    }}
  >
    <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#888890",
        }}
      >
        Stagiaires par département
      </Typography>
      <Box sx={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ left: -16, right: 0, top: 0, bottom: 0 }}>
            <CartesianGrid stroke="#22252b" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#888890", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#888890", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="total" name="Total" fill="#2aa8a8" radius={[6, 6, 0, 0]} barSize={28} />
            <Bar dataKey="paid" name="Rémunérés" fill="#c4a35a" radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);
