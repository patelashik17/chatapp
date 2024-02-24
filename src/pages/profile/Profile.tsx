import DrawerAppBar from "@/components/DrawerAppBar";
import "./Style.scss";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "axios-hooks";
import CustomToaster from "@/components/CustomToaster";
import Loader from "@/components/loader/loader";

interface FormDataType {
  age: number;
  gender: string;
  relationship_status: string;
  sex_orientation: string;
  no_of_relationships: number;
  current_relationship_issues: string;
  self_esteem_levels: string;
  mental_health_history: string;
  cultural_or_religious_background: string;
}

const initialValue = {
  age: 0,
  gender: "",
  relationship_status: "",
  sex_orientation: "",
  no_of_relationships: 0,
  current_relationship_issues: "",
  self_esteem_levels: "",
  mental_health_history: "",
  cultural_or_religious_background: "",
};

const Profile = () => {
  //  eslint-disable-next-line
  const [error, setError] = useState(null);

  const [profileFormData, setProfileFormData] =
    useState<FormDataType>(initialValue);

  const navigate = useNavigate();
  const [{ loading }, makeRequest] = useAxios({}, { manual: true });
  const [userId, setUserId] = useState("");
  const [{ loading: profileLoading }, updateProfile] = useAxios(
    {
      method: "patch",
    },
    { manual: true }
  );
  const [toasterState, setToasterState] = useState({
    isShown: false,
    message: "",
    messageType: "",
  });

  useEffect(
    () => {
      makeRequest({ url: "user", method: "get" })
        .then(({ data }) => {
          setUserId(data.user.id);
          const userDetails = { ...data.user };
          delete userDetails.id;
          delete userDetails.is_registration_complete;
          delete userDetails.name;
          delete userDetails.created_at;
          delete userDetails.sessions;
          delete userDetails.updated_at;
          delete userDetails.email;
          setProfileFormData(userDetails);
        })
        .catch((error) => {
          if (error.response.status === 500) {
            setToasterState({
              isShown: true,
              message: "Something Went wrong",
              messageType: "error",
            });
          } else {
            setToasterState({
              isShown: true,
              message: error.response.data.error_message,
              messageType: "error",
            });
          }
        });
    },
    //  eslint-disable-next-line
    []
  );

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfileFormData({
      ...profileFormData,
      [name]: value,
    });
  };

  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId) {
      updateProfile({
        url: `/user/${userId}`,
        data: profileFormData,
        method: "patch",
      })
        .then((response) => {
          if (response) {
            setToasterState({
              isShown: true,
              message: "Successfully updated your personal information",
              messageType: "success",
            });
          } else {
            setToasterState({
              isShown: true,
              message: "something went wrong",
              messageType: "error",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            setToasterState({
              isShown: true,
              message: "Something Went wrong",
              messageType: "error",
            });
          } else {
            setToasterState({
              isShown: true,
              message: error.response.data.error_message,
              messageType: "error",
            });
          }
        });
    }
  };

  const cancelButtonHandler = () => {
    navigate("/dashboard");
  };

  const handleClose = () => {
    setToasterState({ ...toasterState, isShown: false });
  };

  return (
    <>
      {(loading || profileLoading) && <Loader />}

      <DrawerAppBar />
      <CustomToaster
        isShown={toasterState.isShown}
        handleClose={handleClose}
        message={toasterState.message}
        messageType={toasterState.messageType}
      />
      <div className="profile-wrapper">
        <div className="profile-form-wrapper">
          {/* {loading ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1 }} /> Waiting for
              response...
            </>
          ) : ( */}
          <div className="auth-form">
            <div className="title">Profile</div>
            <div>
              <form className="form" onSubmit={onFormSubmitHandler}>
                <TextField
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  type="type"
                  name="age"
                  onChange={onChangeHandler}
                  value={profileFormData.age}
                />
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender Identity
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    onChange={onChangeHandler}
                    value={profileFormData.gender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="transgender"
                      control={<Radio />}
                      label="Transgender"
                    />
                    <FormControlLabel
                      value="nonBinary"
                      control={<Radio />}
                      label="NonBinary"
                    />
                    <FormControlLabel
                      value="preferNotToSay"
                      control={<Radio />}
                      label="Prefer not to say"
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  id="outlined-basic1"
                  label="Cultural/Religious Background"
                  variant="outlined"
                  type="text"
                  name="cultural_or_religious_background"
                  onChange={onChangeHandler}
                  value={profileFormData.cultural_or_religious_background}
                />

                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Relationship Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="relationship_status"
                    onChange={onChangeHandler}
                    value={profileFormData.relationship_status}
                  >
                    <FormControlLabel
                      value="single"
                      control={<Radio />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="married"
                      control={<Radio />}
                      label="Married"
                    />
                    <FormControlLabel
                      value="divorced"
                      control={<Radio />}
                      label="Divorced"
                    />
                    <FormControlLabel
                      value="inRelationship"
                      control={<Radio />}
                      label="In a Relationship"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Sexual Orientation
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="sex_orientation"
                    onChange={onChangeHandler}
                    value={profileFormData.sex_orientation}
                  >
                    <FormControlLabel
                      value="straight"
                      control={<Radio />}
                      label="Straight"
                    />
                    <FormControlLabel
                      value="heterosexual"
                      control={<Radio />}
                      label="Heterosexual"
                    />
                    <FormControlLabel
                      value="gayOrLesbian"
                      control={<Radio />}
                      label="Gay or Lesbian"
                    />
                    <FormControlLabel
                      value="bisexual"
                      control={<Radio />}
                      label="Bisexual"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  id="outlined-basic"
                  label="Number of Past Relationship"
                  variant="outlined"
                  type="text"
                  name="no_of_relationships"
                  onChange={onChangeHandler}
                  value={profileFormData.no_of_relationships}
                />

                <TextField
                  id="outlined-basic"
                  label="Current Relationship Issues"
                  variant="outlined"
                  type="text"
                  name="current_relationship_issues"
                  onChange={onChangeHandler}
                  minRows={2}
                  maxRows={4}
                  multiline
                  value={profileFormData.current_relationship_issues}
                />
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Self-Esteem Levels
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="self_esteem_levels"
                    onChange={onChangeHandler}
                    value={profileFormData.self_esteem_levels}
                  >
                    <FormControlLabel
                      value="low"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="medium"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="high"
                      control={<Radio />}
                      label="High"
                    />

                    <FormControlLabel
                      value="doNotKnow"
                      control={<Radio />}
                      label="Don't Know"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="History of Mental Health"
                  variant="outlined"
                  type="text"
                  name="mental_health_history"
                  className="textarea"
                  onChange={onChangeHandler}
                  value={profileFormData.mental_health_history}
                  minRows={2}
                  maxRows={4}
                  multiline
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  className="buttonContainer"
                >
                  <Button
                    type="submit"
                    loading={profileLoading}
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    className="cancelButton"
                    variant="contained"
                    onClick={cancelButtonHandler}
                  >
                    Cancel
                  </Button>
                </Stack>
              </form>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Profile;
