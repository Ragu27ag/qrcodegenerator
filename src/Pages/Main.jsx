import { Box, Button, TextField, Typography } from "@mui/material";

import React, { useState } from "react";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Main = () => {
  const [qrColor, setQrColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [format, setFormat] = useState("");
  const [blobDown, setblobDown] = useState("");

  console.log(qrColor);

  //   const validation = yup.object().shape({
  //     title: yup.string().required("Enter the title"),
  //     width: yup.number().required("Enter the width"),
  //     height: yup.number().required("Enter the height"),
  //     qrcolor: yup.string().required("Enter the qrcolor"),
  //     bgcolor: yup.string().required("Enter the bgcolor"),
  //     formats: yup.string().required("Enter the formats"),
  //   });

  //   const formData = useFormik({
  //     initialValues: {
  //       title: "",
  //       width: "",
  //       height: "",
  //       qrcolor: "",
  //       bgcolor: "",
  //       formats: "",
  //     },
  //     onSubmit: (data) => {
  //       console.log(data);
  //     },
  //     validationSchema: validation,
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};
    Array.from(e.target.elements).forEach((ele) => {
      if (ele.nodeName === "INPUT") {
        data[ele.name] = ele.value;
      }
    });
    console.log(qrColor.slice(1));
    setName(data.title);
    setFormat(data.formats);

    const fdata = await fetch(
      `http://api.qrserver.com/v1/create-qr-code/?data=${
        data.title
      }&size=[${Number(data.height)}]*[${Number(
        data.width
      )}]&color=${qrColor.slice(1)}&bgcolor=${bgColor.slice(1)}`
    );

    setUrl(fdata.url);
    const fdatablob = await fdata.blob();
    setblobDown(fdatablob);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDownload = async () => {
    document.getElementById("form").reset();
    setBgColor("");
    setQrColor("");
    setAge("");
    let bloburl = URL.createObjectURL(blobDown);
    console.log(name, format, bloburl);
    const atag = document.createElement("a");
    atag.href = bloburl;
    atag.setAttribute("download", `${name}QR.${format}`);
    document.body.appendChild(atag);
    atag.click();
    atag.remove();
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right ,#74ebd5,#9face6)",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{ marginTop: "5px", color: "#7879ff" }}
          gutterBottom
          variant="h4"
        >
          QR Code Generator
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          background: "linear-gradient(to right ,#74ebd5,#9face6)",
        }}
      >
        <Box
          sx={{
            marginTop: "50px",
            border: "1px solid grey",
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            minWidth: "300px",
            textAlign: "center",
            position: "relative",
            minHeight: "500px",
            background: "linear-gradient(to right ,#e4efe9,#e4efe9)",
          }}
        >
          <form id="form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              name="title"
              id="standard-basic"
              label="Enter title "
              variant="standard"
              // onChange={formData.handleChange}
              // value={formData.title}
              required
              sx={{ marginTop: "5px" }}
            />
            <br />
            <TextField
              name="width"
              id="standard-basic"
              label="Enter width"
              variant="standard"
              // onChange={formData.handleChange}
              // value={formData.width}
              required
            />
            <br />
            <TextField
              name="height"
              id="standard-basic"
              label="Enter height "
              variant="standard"
              // onChange={formData.handleChange}
              // value={formData.height}
              required
            />
            <br />
            <TextField
              name="qrcolor"
              id="standard-basic"
              label="Enter QR color"
              variant="standard"
              onChange={(e) => setQrColor(e.target.value)}
              required
            />
            <br />
            <div
              style={{
                border: "1px solid",
                height: "10px",
                width: "30px",
                backgroundColor: `${qrColor}`,
                position: "absolute",
                right: "50px",
                top: "170px",
              }}
            ></div>
            <TextField
              name="bgcolor"
              id="standard-basic"
              label="Enter background Color "
              variant="standard"
              onChange={(e) => setBgColor(e.target.value)}
              required
            />
            <br />
            <div
              style={{
                border: "1px solid",
                height: "10px",
                width: "30px",
                backgroundColor: `${bgColor}`,
                position: "absolute",
                right: "50px",
                top: "220px",
              }}
            ></div>
            <br />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Formats
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Format"
                name="formats"
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"png"}>PNG</MenuItem>
                <MenuItem value={"gif"}>GIF</MenuItem>
                <MenuItem value={"jpeg"}>JPEG</MenuItem>
                <MenuItem value={"jpg"}>JPG</MenuItem>
                <MenuItem value={"svg"}>SVG</MenuItem>{" "}
                <MenuItem value={"eps"}>EPS</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Button sx={{ margin: "5px" }} type="submit" variant="contained">
              Generate
            </Button>
          </form>
          <br />
          <Button
            sx={{ margin: "5px" }}
            variant="contained"
            onClick={handleDownload}
          >
            Download
          </Button>
        </Box>
        <Box mt={10}>
          {url !== "" && (
            <>
              {" "}
              <Typography gutterBottom sx={{ color: "#7879ff" }} variant="h6">
                Scan or Click download{" "}
              </Typography>
              <img src={url} alt="url" />{" "}
            </>
          )}{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
