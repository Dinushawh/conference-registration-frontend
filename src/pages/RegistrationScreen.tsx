import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

function RegistrationForm() {
  const [registrationType, setRegistrationType] = useState("single");
  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setAttendees([{ name: "", email: "" }]);
  };

  const handleRegistrationTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationType(event.target.value);
    resetForm();
  };

  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: "", email: "" }]);
  };

  const handleAttendeeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index] = {
      ...updatedAttendees[index],
      [event.target.name]: event.target.value,
    };
    setAttendees(updatedAttendees);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const registrationData = {
      registrationType,
      attendees: registrationType === "single" ? [attendees[0]] : attendees,
    };

    const BaseURl = import.meta.env.VITE_API_URL as string;
    try {
      const response = await axios.post(
        `${BaseURl}/api/register`,
        registrationData
      );
      console.log(response);
      toast.success("Registration Successful");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAttendee = (index: number) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>
                Registration Type:
                <input
                  type="radio"
                  value="single"
                  checked={registrationType === "single"}
                  onChange={handleRegistrationTypeChange}
                />{" "}
                Single
                <input
                  type="radio"
                  value="group"
                  checked={registrationType === "group"}
                  onChange={handleRegistrationTypeChange}
                />{" "}
                Group
              </label>
            </Grid>
            <Grid item xs={12}>
              {registrationType === "single" ? (
                <div>
                  <TextField
                    style={{ margin: 16 }}
                    label="Name"
                    type="text"
                    name="name"
                    value={attendees[0].name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAttendeeChange(0, event)
                    }
                  />
                  <TextField
                    style={{ margin: 16 }}
                    label="Email"
                    type="text"
                    name="email"
                    value={attendees[0].email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAttendeeChange(0, event)
                    }
                  />
                </div>
              ) : (
                <div>
                  {attendees.map((_attendee, index) => {
                    return (
                      <div key={index}>
                        <TextField
                          style={{ margin: 16 }}
                          label="Name"
                          type="text"
                          name="name"
                          value={attendees[index].name}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleAttendeeChange(index, event)}
                        />

                        <TextField
                          style={{ margin: 16 }}
                          label="Email"
                          type="text"
                          name="email"
                          value={attendees[index].email}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleAttendeeChange(index, event)}
                        />

                        <Button
                          variant="outlined"
                          style={{ marginTop: 25 }}
                          onClick={() => handleRemoveAttendee(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                  <Button variant="outlined" onClick={handleAddAttendee}>
                    Add Attendee
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default RegistrationForm;
