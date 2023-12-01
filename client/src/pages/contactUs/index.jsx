import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { IoLocationSharp } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";

const StyledForm = styled.form`
  /* Add any additional styling you need */
`;

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "projectforesight",
        "form1",
        form.current,
        "E06Hiw_CcD4K58j-k"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const colors = tokens;
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid!")
      .required("Required"),
    address1: yup.string().required("Required"),
    address2: yup.string().required("Required"),
  });

  return (
    <Box
      display="flex"
      height={"100vh"}
      backgroundColor={colors.primary[500]}
      minHeight={"100vh"}
    >
      <Box
        flex="1"
        p={2}
        style={{
          backgroundImage: "url('../../assets/ContactUsBackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            gutterBottom
            paddingBottom={3}
          >
            Our Contacts
          </Typography>
          {mockDataContacts.map((contact, index) => (
            <Box key={contact.id} mb={2}>
              <Box display="flex" alignItems="center">
                <IoLocationSharp
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                    color: colors.blueAccents[500],
                  }}
                />
                <Typography variant="h6" whiteSpace="pre-line">
                  {contact.city}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IoMailSharp
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                    color: colors.blueAccents[500],
                  }}
                />
                <Typography variant="h6" whiteSpace="pre-line">
                  {contact.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <BsTelephoneFill
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                    color: colors.blueAccents[500],
                  }}
                />
                <Typography variant="h6" whiteSpace="pre-line">
                  {contact.phone}
                </Typography>
              </Box>
              {index < mockDataContacts.length - 1 && <Box mb={8} />}
            </Box>
          ))}
        </Box>
      </Box>

      <Box flex="0.8" padding={5}>
        <Box p={10} backgroundColor={colors.secondary[500]} borderRadius="8px">
          <Typography variant="h5" textAlign={"center"} paddingBottom={3}>
            Get in touch!
          </Typography>
          <Typography variant="h7" paddingBottom={3}>
            Fill in the form with your details, and our team will reach out to
            you!
          </Typography>

          <StyledForm ref={form} onSubmit={sendEmail}>
          <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="First Name"
              name="user_firstname"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              name="user_lastname"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="email"
              label="Email"
              name="user_email"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              name="user_number"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address1"
              name="user_address"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address2"
              name="user_addresss"
              sx={{ gridColumn: "span 4" }}
            />

            <Button
              type="submit"
              variant="contained"
              style={{
                gridColumn: "span 4",
                height:"150%",
                backgroundColor: colors.orangeAccents[500],
              }}
            >
              Send 🡲
            </Button>
            </Box>

          </StyledForm>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;