import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Plan, ResponsePlans } from "../../helper/interfaces";
import api from "../../services/api";
import "./style.css";

function Home() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setLoading] = useState(true);

  function fetch() {
    api
      .get<ResponsePlans>("/plans")
      .then((res) => {
        const { data } = res;
        setPlans(data.plans);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    void fetch();
  }, []);

  return (
    <div className="container">
      <h1>TWM Seguros</h1>
      <div className="container-plan">
        <h2>Planos</h2>
        <div className="wrapper-plan">
          {isLoading ? (
            <CircularProgress />
          ) : !plans.length ? (
            "Nenhum plano encontrado"
          ) : (
            plans.map((plan) => (
              <Box key={plan.id} sx={{ maxWidth: 275 }}>
                <Card variant="outlined" sx={{ minWidth: 275, minHeight: 200 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Plano
                    </Typography>
                    <Typography variant="h5" component="div">
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" className="description-plan">
                      {plan.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
