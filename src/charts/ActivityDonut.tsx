import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const COLORS = ["#2aa8a8", "#22252b"];

const CustomLabel = ({ cx, cy }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
    <tspan x={cx} dy="-4" fill="#e4e4e0" fontSize="28" fontWeight="600">
      100%
    </tspan>
  </text>
);

export const ActivityDonut = ({ active, inactive }) => {
  const total = active + inactive;
  const activePct = total > 0 ? Math.round((active / total) * 100) : 0;
  const data = [
    { name: "Actifs", value: active },
    { name: "Inactifs", value: inactive },
  ];

  return (
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
          Taux d'activité
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: 140, height: 140, flexShrink: 0 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={62}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "2.5rem", fontWeight: 600, lineHeight: 1, color: "#e4e4e0", letterSpacing: "-0.02em" }}
            >
              {activePct}%
            </Typography>
            <Typography variant="body2" sx={{ color: "#888890", mt: 0.5 }}>
              {active} actif{active > 1 ? "s" : ""} sur {total}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
