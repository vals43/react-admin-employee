import { useMemo, useState, useEffect } from "react";
import { useGetList } from "react-admin";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DepartmentBarChart } from "./charts/DepartmentBarChart";
import { ActivityDonut } from "./charts/ActivityDonut";
import { InternPaidChart } from "./charts/InternPaidChart";

const ACCENTS = [
  { bar: "#2aa8a8", bg: "rgba(42,168,168,0.06)", border: "rgba(42,168,168,0.15)" },
  { bar: "#4ab86a", bg: "rgba(74,184,106,0.06)", border: "rgba(74,184,106,0.15)" },
  { bar: "#c4a35a", bg: "rgba(196,163,90,0.06)", border: "rgba(196,163,90,0.15)" },
  { bar: "#e04848", bg: "rgba(224,72,72,0.06)", border: "rgba(224,72,72,0.15)" },
];

const ICONS = [
  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
  "M3 13h8v10H3z M15 9h8v14H15z M9 3h8v20H9z",
  "M12 2l10 6v12l-10 6L2 20V8z",
  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
];

const AnimatedNumber = ({ value, accent }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === undefined || value === null) return;
    const start = display;
    const diff = value - start;
    const duration = 800;
    const startTime = performance.now();

    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * ease));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <Typography
      sx={{
        fontSize: "2.25rem",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "#e8e8e4",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        transition: "color 0.3s ease",
      }}
    >
      {display}
    </Typography>
  );
};

const StatCard = ({ title, value, loading, accent, bg, border, icon, index }) => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Box
      sx={{
        p: "1px",
        borderRadius: 3.5,
        background: `linear-gradient(135deg, ${border}, rgba(255,255,255,0.02), ${border})`,
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        animation: `fadeSlideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.08}s both`,
        "&:hover": {
          transform: "translateY(-4px) scale(1.01)",
          "& .card-glow": { opacity: 1 },
        },
      }}
    >
      <Card
        className="card-glow-parent"
        sx={{
          borderRadius: 3,
          backgroundColor: "#121418",
          border: "none",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2.5,
            background: `linear-gradient(90deg, ${accent}, ${accent}88, ${accent})`,
            opacity: 0.8,
          },
        }}
      >
        <Box
          className="card-glow"
          sx={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}15, transparent 70%)`,
            opacity: 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />
        <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#7a7a82",
                fontSize: "0.7rem",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bg,
                border: `1px solid ${border}`,
                flexShrink: 0,
                ml: 1.5,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon} />
              </svg>
            </Box>
          </Box>
          {loading ? (
            <CircularProgress size={24} sx={{ color: accent, opacity: 0.6 }} />
          ) : (
            <AnimatedNumber value={value ?? 0} accent={accent} />
          )}
        </CardContent>
      </Card>
    </Box>
  </Grid>
);

const ChartCard = ({ title, children, index = 0, fullHeight }) => (
  <Box
    sx={{
      p: "1px",
      borderRadius: 3.5,
      background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
      height: fullHeight ? "100%" : "auto",
      animation: `fadeSlideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${0.35 + index * 0.1}s both`,
      transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      "&:hover": {
        transform: "translateY(-2px)",
        "& .chart-card-inner": {
          borderColor: "rgba(255,255,255,0.08)",
        },
      },
    }}
  >
    <Card
      className="chart-card-inner"
        sx={{
          borderRadius: 3,
          backgroundColor: "#121418",
          border: "none",
          transition: "border-color 0.4s ease",
          height: fullHeight ? "100%" : "auto",
        }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Typography
          variant="body2"
          sx={{
            mb: 2.5,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#7a7a82",
            fontSize: "0.7rem",
          }}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  </Box>
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
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(42,168,168,0.04), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: "10%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,163,90,0.03), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            mb: 4,
            animation: "fadeSlideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) both",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Box
              sx={{
                width: 3,
                height: 20,
                borderRadius: 1.5,
                background: "linear-gradient(180deg, #2aa8a8, #c4a35a)",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#7a7a82",
                fontSize: "0.7rem",
              }}
            >
              Vue d'ensemble
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: "1.65rem",
              letterSpacing: "-0.03em",
              color: "#e8e8e4",
            }}
          >
            Tableau de bord
          </Typography>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} {...ACCENTS[i]} icon={ICONS[i]} index={i} />
          ))}
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ChartCard title="Taux d'activité" index={0} fullHeight>
              <ActivityDonut
                active={totalActive ?? 0}
                inactive={(totalEmployees ?? 0) - (totalActive ?? 0)}
              />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ChartCard title="Employés par département" index={1} fullHeight>
              <DepartmentBarChart data={deptData} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ChartCard title="Stagiaires par département" index={2}>
              <InternPaidChart data={internDeptData} />
            </ChartCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
