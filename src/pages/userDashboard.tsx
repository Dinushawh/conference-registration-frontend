import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../models/userModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

function DataDisplay() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [, setSelectedUser] = useState<User | null>(null);
  const [updatedUserData, setUpdatedUserData] = useState<User>({
    _id: "",
    registrationType: "",
    attendees: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>(
        "http://localhost:5090/api/attendees"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isUpdateDialogOpen]);

  const handleUpdateData = (user: User) => {
    setSelectedUser(user);
    setUpdatedUserData(user);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const BaseUrl = import.meta.env.VITE_API_URL as string;

  const handleSaveUpdatedData = async () => {
    console.log(updatedUserData._id);
    await axios
      .put(`${BaseUrl}/update/${updatedUserData._id}`, {
        registrationType: updatedUserData.registrationType,
        attendees: updatedUserData.attendees,
      })
      .then((res) => {
        console.log(res);
        toast.success("User data updated successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("User data update failed");
      });
    setUpdateDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Registered Users for conference
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 2,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((user) => (
            <Card key={user._id} style={{ marginBottom: 16 }}>
              <CardContent>
                <Typography
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: 16,
                  }}
                >
                  Registration ID: {user._id}
                </Typography>

                <Typography variant="h5">
                  {user.registrationType.toLocaleUpperCase()}
                </Typography>
                <Typography>{"Registerd users"}</Typography>

                {user.attendees.map((attendee, index) => (
                  <div key={index}>
                    <div style={{ display: "inline-block" }}>
                      <Typography variant="body1" style={{ color: "gray" }}>
                        Name:
                      </Typography>
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "5px" }}>
                      <Typography variant="body1">{attendee.name}</Typography>
                    </div>
                    <div
                      style={{ display: "inline-block", marginLeft: "10px" }}
                    >
                      <Typography variant="body1" style={{ color: "gray" }}>
                        Email:
                      </Typography>
                    </div>
                    <div
                      style={{ display: "inline-block", marginLeft: "10px" }}
                    >
                      <Typography variant="body1">{attendee.email}</Typography>
                    </div>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateData(user)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">
            No data available or an error occurred.
          </Typography>
        )}
      </Box>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Edit User Data</DialogTitle>
        <DialogContent>
          <TextField
            style={{ margin: 16 }}
            label="Registration Type"
            value={updatedUserData.registrationType}
            onChange={(e) =>
              setUpdatedUserData({
                ...updatedUserData,
                registrationType: e.target.value,
              })
            }
          />

          {updatedUserData.attendees.map((attendee, index) => (
            <div key={index} className="p-2">
              <TextField
                style={{ margin: 16 }}
                label={`Email ${index + 1}`}
                value={attendee.email}
                onChange={(e) =>
                  setUpdatedUserData((prevData) => {
                    const updatedAttendees = [...prevData.attendees];
                    updatedAttendees[index] = {
                      ...updatedAttendees[index],
                      email: e.target.value,
                    };
                    return { ...prevData, attendees: updatedAttendees };
                  })
                }
              />
              <TextField
                style={{ margin: 16 }}
                label={`Name ${index + 1}`}
                value={attendee.name}
                onChange={(e) =>
                  setUpdatedUserData((prevData) => {
                    const updatedAttendees = [...prevData.attendees];
                    updatedAttendees[index] = {
                      ...updatedAttendees[index],
                      name: e.target.value,
                    };
                    return { ...prevData, attendees: updatedAttendees };
                  })
                }
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUpdatedData} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DataDisplay;
