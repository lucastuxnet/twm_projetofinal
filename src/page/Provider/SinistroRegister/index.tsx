import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import InputMask from "react-input-mask";
import {
  Plan,
  ResponsePlans,
  ResponseSinistros,
  ResponseSinistrosType,
  Sinistro,
  SinistroType,
} from "../../../helper/interfaces";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import dayjs from "dayjs";
import { StaticTimePicker, TimePicker } from "@mui/x-date-pickers";

export default function SinistroRegister() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Sinistro>({
    defaultValues: {
      sinistrosTypes: [],
    },
  });

  const [plans, setPlans] = useState<Plan[]>([]);
  const [sinistrosType, setSinistrosType] = useState<SinistroType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isError, setError] = useState({ status: false, message: "" });

  const onSubmit = handleSubmit((data) => {
    setFetchLoading(true);
    api
      .post("/sinistro", data)
      .then(() => {
        reset();
      })
      .catch((error) => {
        const { message } = error.response.data;

        setError({ status: true, message: message });
      })
      .finally(() => {
        setFetchLoading(false);
      });
  });

  async function fetch() {
    Promise.all([
      api.get<ResponsePlans>("/plans"),
      api.get<ResponseSinistrosType>("/sinistros/types"),
    ])
      .then(([planRes, sinistroRes]) => {
        setPlans(planRes.data.plans);
        setSinistrosType(sinistroRes.data.sinistrosTypes);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    void fetch();
  }, []);

  return (
    <div>
      <h1>Adicionar Sinistro</h1>
      <div>
        <Snackbar
          open={isError.status}
          autoHideDuration={6000}
          onClose={() => setError({ status: false, message: "" })}
        >
          <Alert
            onClose={() => setError({ status: false, message: "" })}
            severity="error"
            sx={{ width: "100%" }}
          >
            {isError.message}
          </Alert>
        </Snackbar>
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                {...(errors.matricula && {
                  error: true,
                })}
                label="Matricula"
                variant="outlined"
                {...register("matricula", { required: "Campo obrigatório" })}
                helperText={errors.matricula?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                {...(errors.apolice && {
                  error: true,
                })}
                label="Numero da Apolice"
                variant="outlined"
                {...register("apolice", { required: "Campo obrigatório" })}
                helperText={errors.apolice?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name="planType"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field: { value, onChange } }) => (
                  <FormControl
                    fullWidth
                    {...(errors.planType && {
                      error: true,
                    })}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Tipos de Plano
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Tipos de Plano"
                      onChange={onChange}
                    >
                      {plans.map((plan) => (
                        <MenuItem key={plan.id} value={plan.name}>
                          {plan.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.planType?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="initHour"
                  control={control}
                  defaultValue={null as any}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field: { value, onChange } }) => (
                    <TimePicker
                      label="Horario de Chegada"
                      value={value}
                      onChange={onChange}
                      renderInput={(params: any) => (
                        <TextField
                          {...(errors.initHour && {
                            error: true,
                          })}
                          {...register("initHour", {
                            required: "Campo obrigatório",
                          })}
                          {...params}
                          variant="outlined"
                          helperText={errors.initHour?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="endHour"
                  control={control}
                  defaultValue={null as any}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field: { value, onChange } }) => (
                    <TimePicker
                      label="Horario de Saida"
                      value={value}
                      onChange={onChange}
                      renderInput={(params: any) => (
                        <TextField
                          {...(errors.endHour && {
                            error: true,
                          })}
                          {...register("endHour", {
                            required: "Campo obrigatório",
                          })}
                          {...params}
                          variant="outlined"
                          helperText={errors.endHour?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...(errors.address && {
                  error: true,
                })}
                label="Endereço de Atendimento"
                variant="outlined"
                {...register("address", { required: "Campo obrigatório" })}
                helperText={errors.address?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
            <Grid item xs={6}>
              <TextField
                {...(errors.resp_locale && {
                  error: true,
                })}
                label="Responsavel no local"
                variant="outlined"
                {...register("resp_locale", { required: "Campo obrigatório" })}
                helperText={errors.resp_locale?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name="phone_contact"
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
                      label="Numero de contato"
                      {...(errors.phone_contact && {
                        error: true,
                      })}
                      helperText={errors.phone_contact?.message}
                      fullWidth
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                error={!!errors?.sinistrosTypes}
              >
                <FormLabel component="legend">
                  Especificações do sinistro:
                </FormLabel>
                <FormGroup row>
                  {sinistrosType.map((sinistroType, index) => (
                    <Controller
                      name="sinistrosTypes"
                      control={control}
                      key={sinistroType.name}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={() => {
                                if (!value.includes(sinistroType)) {
                                  onChange([...value, sinistroType]);
                                  return;
                                }
                                const newTopics = value.filter(
                                  (item) => item !== sinistroType
                                );
                                onChange(newTopics);
                              }}
                              name={sinistroType.name}
                            />
                          }
                          label={sinistroType.name}
                        />
                      )}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={fetchLoading} variant="contained" type="submit">
                {fetchLoading ? <CircularProgress /> : "Adicionar Sinistro"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}
