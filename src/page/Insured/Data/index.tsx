import { useEffect, useState } from "react";
import {
  Plan,
  ResponsePlans,
  ResponseSinistrosType,
  ResponseTechnician,
  ResponseUsuario,
  SinistroType,
  Usuario,
} from "../../../helper/interfaces";
import api from "../../../services/api";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import InputMask from "react-input-mask";

export default function InsuredData() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, defaultValues },
  } = useForm<Usuario>();

  const onSubmit = handleSubmit((data) => {
    setFetchLoading(true);
    api
      .put<ResponseUsuario>("/usuario", data)
      .then((res) => {
        const { data } = res;
        console.log(data.usuarios);
        reset({
          ...data.usuarios,
        });
      })
      .finally(() => {
        setFetchLoading(false);
      });
  });

  async function fetch() {
    Promise.all([
      api.get<ResponsePlans>("/plans"),
      api.get<ResponseUsuario>("/usuario", { params: { apolice: "1" } }),
    ])
      .then(([planRes, usuarioRes]) => {
        setPlans(planRes.data.plans);

        reset({
          ...usuarioRes.data.usuarios,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    void fetch();
  }, []);

  return (
    <div className="container-form">
      <h1>Meus Dados</h1>
      {isLoading ? (
        <CircularProgress />
      ) : !defaultValues ? (
        "Dados não encontrados"
      ) : (
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                {...(errors.apolice && {
                  error: true,
                })}
                label="Apolice"
                variant="outlined"
                {...register("apolice", { required: "Campo obrigatório" })}
                helperText={errors.apolice?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl
                fullWidth
                {...(errors.planType && {
                  error: true,
                })}
              >
                <InputLabel id="demo-simple-select-label">
                  Tipos de Plano
                </InputLabel>
                <Controller
                  name="planType"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tipos de Plano"
                      onChange={onChange}
                      value={value}
                    >
                      {plans.map((plan) => (
                        <MenuItem key={plan.id} value={plan.name}>
                          {plan.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.planType?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...(errors.name && {
                  error: true,
                })}
                label="Nome"
                variant="outlined"
                {...register("name", { required: "Campo obrigatório" })}
                helperText={errors.name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...(errors.email && {
                  error: true,
                })}
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email Inválido",
                  },
                })}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field: { value, onChange } }) => (
                  <InputMask
                    mask={"(+99) 9 9999-9999"}
                    value={value}
                    disabled={false}
                    onChange={onChange}
                  >
                    <TextField
                      label="Celular"
                      {...(errors.phone && {
                        error: true,
                      })}
                      helperText={errors.phone?.message}
                      fullWidth
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="cpf"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field: { value, onChange } }) => (
                  <InputMask
                    mask={"999.999.999-99"}
                    value={value}
                    disabled={false}
                    onChange={onChange}
                  >
                    <TextField
                      label="CPF"
                      {...(errors.cpf && {
                        error: true,
                      })}
                      helperText={errors.cpf?.message}
                      fullWidth
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="cep"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field: { value, onChange } }) => (
                  <InputMask
                    mask={"99.999-999"}
                    value={value}
                    disabled={false}
                    onChange={onChange}
                  >
                    <TextField
                      label="CEP"
                      {...(errors.cep && {
                        error: true,
                      })}
                      helperText={errors.cep?.message}
                      fullWidth
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                {...(errors.street && {
                  error: true,
                })}
                label="Rua"
                variant="outlined"
                {...register("street", { required: "Campo obrigatório" })}
                helperText={errors.street?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...(errors.district && {
                  error: true,
                })}
                label="Bairro"
                variant="outlined"
                {...register("district", { required: "Campo obrigatório" })}
                helperText={errors.district?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                {...(errors.city && {
                  error: true,
                })}
                label="Cidade"
                variant="outlined"
                {...register("city", { required: "Campo obrigatório" })}
                helperText={errors.city?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button disabled={fetchLoading} variant="contained" type="submit">
                {fetchLoading ? <CircularProgress /> : "Atualizar Segurado"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}
