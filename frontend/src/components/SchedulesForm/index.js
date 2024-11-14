import React, { useState, useEffect } from "react";
import { makeStyles, TextField, Grid, Container } from "@material-ui/core";
import { Formik, Form, FastField, FieldArray } from "formik";
import { isArray } from "lodash";
import NumberFormat from "react-number-format";
import ButtonWithSpinner from "../ButtonWithSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  textfield: {
    width: "100%",
  },
  row: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  control: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  buttonContainer: {
    textAlign: "right",
    padding: theme.spacing(1),
  },
}));

function SchedulesForm(props) {
  const { initialValues, onSubmit, loading, labelSaveButton } = props;
  const classes = useStyles();

  const [schedules, setSchedules] = useState([
    { weekday: "Segunda-feira", weekdayEn: "monday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
    { weekday: "Terça-feira", weekdayEn: "tuesday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
    { weekday: "Quarta-feira", weekdayEn: "wednesday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
    { weekday: "Quinta-feira", weekdayEn: "thursday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
    { weekday: "Sexta-feira", weekdayEn: "friday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
    { weekday: "Sábado", weekdayEn: "saturday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
    { weekday: "Domingo", weekdayEn: "sunday", startTime: "", endTime: "", startTimePM: "", endTimePM: "", },
  ]); 

  useEffect(() => {
    if (isArray(initialValues) && initialValues.length > 0) {
      setSchedules(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Formik
      enableReinitialize
      className={classes.fullWidth}
      initialValues={{ schedules }}
      onSubmit={({ schedules }) =>
        setTimeout(() => {
          handleSubmit(schedules);
        }, 500)
      }
    >
      {({ values }) => (
        <Form className={classes.fullWidth}>
          <FieldArray
            name="schedules"
            render={(arrayHelpers) => (
              <Grid spacing={4} container>
                {values.schedules.map((item, index) => {
                  return (
                      <Container>
                          <FastField
                            as={TextField}
                            label="Dia da Semana"
                            name={`schedules[${index}].weekday`}
                            disabled
                            variant="outlined"
                            style={{ marginRight: "3.2%", width: "20%" }}
                            margin="dense"
                          />
                          <FastField
                            name={`schedules[${index}].startTime`}
                            >
                            {({ field }) => (
                              <NumberFormat
                                label="Hora Inicial 1"
                                {...field}
                                variant="outlined"
                                margin="dense"
                                customInput={TextField}
                                format="##:##"
                                style={{ marginRight: "3.2%", width: "15%" }}
                              />
                            )}
                          </FastField>
                          <FastField
                            name={`schedules[${index}].endTime`}
                            >
                            {({ field }) => (
                              <NumberFormat
                                label="Hora Final 1"
                                {...field}
                                variant="outlined"
                                margin="dense"
                                customInput={TextField}
                                format="##:##"
                                style={{ marginRight: "3.2%", width: "15%" }}
                              />
                            )}
                          </FastField>  
                          <FastField
                            name={`schedules[${index}].startTimePM`}
                            >
                            {({ field }) => (
                              <NumberFormat
                                label="Hora Inicial 2"
                                {...field}
                                variant="outlined"
                                margin="dense"
                                customInput={TextField}
                                format="##:##"
                                style={{ marginRight: "3.2%", width: "15%" }}
                              />
                            )}
                          </FastField>
                          <FastField
                            name={`schedules[${index}].endTimePM`}
                            >
                            {({ field }) => (
                              <NumberFormat
                                label="Hora Final 2"
                                {...field}
                                variant="outlined"
                                margin="dense"
                                customInput={TextField}
                                format="##:##"
                                style={{ marginRight: "3.2%", width: "15%" }}
                              />
                            )}
                          </FastField>						  
                      </Container>

                  );
                })}
              </Grid>
            )}
          ></FieldArray>
          <div style={{ textAlign: "center", marginTop: "2%" }} className={classes.buttonContainer}>
            <ButtonWithSpinner
              loading={loading}
              type="submit"
              color="primary"
              variant="contained"
            >
              {labelSaveButton ?? "Salvar"}
            </ButtonWithSpinner>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SchedulesForm;
