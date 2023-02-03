import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress } from "@mui/material";
import InputMask from "react-input-mask";
import api from "../../../services/api";
import { Technician,
  ResponseTechnician } from "../../../helper/interfaces";

export default function ProviderData() {
  const [isLoading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Technician>();

  const [fetchLoading, setFetchLoading] = useState(false);

  const onSubmit = handleSubmit((data) => {
    setFetchLoading(true);
    api
      .put<ResponseTechnician>("/technicians", data)
      .then((res) => {
        const { data } = res;
        console.log(data.technicians);
        reset({
          ...data.technicians,
        });
      })
      .finally(() => {
        setFetchLoading(false);
      });
  });

  async function fetch() {
    Promise.all([
      api.get<ResponseTechnician>("/technician", { params: { matricula: "1" } }),
    ])
      .then(([tecnicoRes]) => {
        
        reset({
          ...tecnicoRes.data.technicians,
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
    <div>
      <h1>Atualizar Prestador</h1>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
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
          <Grid item xs={7}>
            <TextField
              {...(errors.technicianBy && {
                error: true,
              })}
              label="Tecnico em"
              variant="outlined"
              {...register("technicianBy", { required: "Campo obrigatório" })}
              helperText={errors.technicianBy?.message}
              fullWidth
            />
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
          <Grid item xs={6}>
            <Controller
              name="nctps"
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
                    label="Numero da Carteira de Trabalho"
                    {...(errors.nctps && {
                      error: true,
                    })}
                    helperText={errors.nctps?.message}
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
              {fetchLoading ? <CircularProgress /> : "Atualizar Prestador"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
