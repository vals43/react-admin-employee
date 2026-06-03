import { useMemo } from "react";
import { useGetList } from "react-admin";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DepartmentBarChart } from "./charts/DepartmentBarChart";
import { ActivityDonut } from "./charts/ActivityDonut";
import { InternPaidChart } from "./charts/InternPaidChart";

const statCards = [
  {
    title: "Total employés",
    accent: "#2aa8a8",
    bg: "rgba(42,168,168,0.08)",
    border: "rgba(42,168,168,0.2)",
  },
  {
    title: "Employés actifs",
    accent: "#4ab86a",
    bg: "rgba(74,184,106,0.08)",
    border: "rgba(74,184,106,0.2)",
  },
  {
    title: "Total stagiaires",
    accent: "#c4a35a",
    bg: "rgba(196,163,90,0.08)",
    border: "rgba(196,163,90,0.2)",
  },
  {
    title: "Rémunérés",
    accent: "#e04848",
    bg: "rgba(224,72,72,0.08)",
    border: "rgba(224,72,72,0.2)",
  },
];

const StatCard = ({ title, value, loading, accent, bg, border }) => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${border}`,
        backgroundColor: "#16181d",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          transform: "translateY(-2px)",
          borderColor: accent,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: accent,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#888890",
          }}
        >
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={28} sx={{ color: accent }} />
        ) : (
          <Typography
            sx={{
              fontSize: "2.25rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#e4e4e0",
              lineHeight: 1,
            }}
          >
            {value ?? 0}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Grid>
);

export const Dashboard = () => {
  const { total: totalEmployees, isPending: loadingEmployees } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
  });

  const { total: totalActive, isPending: loadingActive } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { active: true },
  });

  const { total: totalInterns, isPending: loadingInterns } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
  });

  const { total: totalPaidInterns, isPending: loadingPaidInterns } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { isRemunerate: true },
  });

  const { data: employees } = useGetList("employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const { data: interns } = useGetList("interns", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
  });

  const deptData = useMemo(() => {
    if (!employees) return [];
    const map = {};
    employees.forEach((emp) => {
      map[emp.department] = (map[emp.department] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [employees]);

  const internDeptData = useMemo(() => {
    if (!interns) return [];
    const map = {};
    interns.forEach((intern) => {
      if (!map[intern.department]) {
        map[intern.department] = { name: intern.department, total: 0, paid: 0 };
      }
      map[intern.department].total++;
      if (intern.isRemunerate) map[intern.department].paid++;
    });
    return Object.values(map);
  }, [interns]);

  const stats = [
    { title: "Total employés", value: totalEmployees, loading: loadingEmployees },
    { title: "Employés actifs", value: totalActive, loading: loadingActive },
    { title: "Total stagiaires", value: totalInterns, loading: loadingInterns },
    { title: "Stagiaires rémunérés", value: totalPaidInterns, loading: loadingPaidInterns },
  ];

  return (
    <Box sx={{ p: 0.5 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: "1.5rem",
          letterSpacing: "-0.02em",
          color: "#e4e4e0",
        }}
      >
        Tableau de bord
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} {...statCards[i]} />
        ))}
      </Grid>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActivityDonut
            active={totalActive ?? 0}
            inactive={(totalEmployees ?? 0) - (totalActive ?? 0)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <DepartmentBarChart data={deptData} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InternPaidChart data={internDeptData} />
        </Grid>
      </Grid>
    </Box>
  );
};
