import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#2aa8a8", "rgba(255,255,255,0.06)"];

export const ActivityDonut = ({ active, inactive }) => {
  const total = active + inactive;
  const pct = total > 0 ? Math.round((active / total) * 100) : 0;
  const data = [
    { name: "Actifs", value: active },
    { name: "Inactifs", value: inactive || 1 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 240,
      }}
    >
      <Box sx={{ width: 140, height: 140, position: "relative", mb: 2, flexShrink: 0 }}>
        <ResponsiveContainer>
          <PieChart>
            <defs>
              <radialGradient id="donutGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2aa8a8" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#2aa8a8" stopOpacity={0} />
              </radialGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={64}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#e8e8e4",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {pct}%
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#2aa8a8",
              boxShadow: "0 0 6px rgba(42,168,168,0.4)",
            }}
          />
          <Typography variant="body2" sx={{ color: "#8a8a92", fontSize: "0.75rem" }}>
            {active} actif{active > 1 ? "s" : ""}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          />
          <Typography variant="body2" sx={{ color: "#8a8a92", fontSize: "0.75rem" }}>
            {inactive} inactif{inactive > 1 ? "s" : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
