import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import default_picture from "../Images/default_profile_picture.png";
import EmailForm from "./EmailForm";
import { auth, changeEmail, changeDisplayName, changeUserEmail, signOut } from "../firebase";
import { Form } from "react-bootstrap";
import { navigate } from "@reach/router";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email } = user;
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [displayNameDialogOpen, setDisplayNameDialogOpen] = useState(false);
  const [profilePicDialogOpen, setProfilePicDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [newUsername, setNewUsername] = useState("");
  const [currentUsername, setCurrentUsername] = useState(displayName);

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
      width: 140,
    },
  });

  const classes = useStyles();

  const handleForm = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setNewUsername(value)
    }
  }
  
  const handleButton = async (event) => {
    const { name } = event.currentTarget;
    if (name === "changeEmailButton") {
      setEmailDialogOpen(true);
    }
    if (name === "changeUsernameButton") {
      setDisplayNameDialogOpen(true);
    }
    if (name === "changeProfilePicButton") {
      setProfilePicDialogOpen(true);
    }
    if (name === "cancel") {
      setEmailDialogOpen(false);
      setDisplayNameDialogOpen(false);
      setProfilePicDialogOpen(false);
    }
    if (name === "emailSubmit") {
      if (await changeUserEmail(newEmail) === "auth/requires-recent-login") {
        signOut();
        navigate("/")
      }
      changeEmail(auth.currentUser.uid, newEmail);
      setEmailDialogOpen(false);
      setCurrentEmail(newEmail);
    }
    if (name === "displayNameSubmit") {
      changeDisplayName(auth.currentUser.uid, newUsername);
      setDisplayNameDialogOpen(false);
      setCurrentUsername(newUsername);
    }
  };

  return (
    <div>
      <Card bg="info">
        <Grid container>
          <Grid item xs>
            <CardMedia
              className={classes.media}
              image={photoURL || default_picture}
              title="Default Profile Picture"
            />
            <Button name="changeProfilePicButton" onClick={handleButton}>
              Change Profile Picture
            </Button>
          </Grid>
          <Grid item xs>
            <h2>{currentUsername}</h2>
            <Button name="changeUsernameButton" onClick={handleButton}>
              Change Username
            </Button>
          </Grid>
          <Grid item xs>
            <h2>{currentEmail}</h2>
            <Button name="changeEmailButton" onClick={handleButton}>
              Change Email
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={profilePicDialogOpen}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <h2>UNDER DEVELOPMENT</h2>
        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleButton}>
            Cancel
          </Button>
          <Button name="profilePicSubmit" onClick={handleButton}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={displayNameDialogOpen}>
        <DialogTitle>Change Username</DialogTitle>
        <DialogContent>
          <Form>
            <Form.Control
              name="username"
              type="username"
              placeholder="Enter Username"
              value={newUsername}
              onChange={handleForm}
            />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleButton}>
            Cancel
          </Button>
          <Button name="displayNameSubmit" onClick={handleButton}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={emailDialogOpen}>
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          <EmailForm
            email={newEmail}
            isValidEmail={isValidEmail}
            setEmail={setNewEmail}
            setIsValidEmail={setIsValidEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button name="cancel" onClick={handleButton}>
            Cancel
          </Button>
          <Button name="emailSubmit" onClick={handleButton}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ProfilePage;
