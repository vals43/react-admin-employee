import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const COLORS = ["#2aa8a8", "#c4a35a", "#4ab86a", "#e04848"];

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
      <Typography variant="body2" sx={{ color: "#2aa8a8" }}>
        {payload[0].value} employé{payload[0].value > 1 ? "s" : ""}
      </Typography>
    </Box>
  );
};

export const DepartmentBarChart = ({ data }) => (
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
        Employés par département
      </Typography>
      <Box sx={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <CartesianGrid stroke="#22252b" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#888890", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#888890", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
              {data?.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);
