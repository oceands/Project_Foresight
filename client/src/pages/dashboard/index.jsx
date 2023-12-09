import { Box, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { FaGun } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import { Stack } from "@mui/material";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const colors = tokens;

  // apiService.js
  const API_URL = "http://127.0.0.1:5000/user"; // Replace with your actual API URL

  const fetchFireIncidentsCount = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents/count/fire`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.fire_incident_count;
    } catch (error) {
      console.error("Error fetching fire incident count:", error);
      return 0; // Return a default value in case of error
    }
  };

  const fetchWeaponIncidentsCount = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents/count/weapon`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.weapon_incident_count;
    } catch (error) {
      console.error("Error fetching weapon incident count:", error);
      return 0; // Return a default value in case of error
    }
  };

  const fetchVerifiedIncidentsCount = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents/count/verified`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.verified_incident_count;
    } catch (error) {
      console.error("Error fetching verified incident count:", error);
      return 0; // Return a default value in case of error
    }
  };

  const fetchDispatchData = async () => {
    try {
      const response = await fetch(`${API_URL}/dispatch/count`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIncidentData = async () => {
    try {
      const response = await fetch(`${API_URL}/incidents/monthly-count`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [fireIncidentCount, setFireIncidentCount] = useState(0);
  const [weaponIncidentCount, setWeaponIncidentCount] = useState(0);
  const [verifiedIncidentCount, setVerifiedIncidentCount] = useState(0);
  const [DispatchData, setDispatchData] = useState([]);
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fireCount = await fetchFireIncidentsCount();
      const weaponCount = await fetchWeaponIncidentsCount();
      const verifiedCount = await fetchVerifiedIncidentsCount();
      const dispatchCount = await fetchDispatchData();
      const incidentDataCount = await fetchIncidentData();

      setFireIncidentCount(fireCount);
      setWeaponIncidentCount(weaponCount);
      setVerifiedIncidentCount(verifiedCount);
      setDispatchData(dispatchCount);
      setIncidentData(incidentDataCount);
      console.log(incidentDataCount);
    };

    fetchData();
  }, []);

  const totalValue = DispatchData.reduce(
    (total, item) => total + item.value,
    0
  ); // Calculate total value for pie chart data
  const progressPercent = DispatchData.map(
    (item) => (item.value / totalValue) * 100
  ); // Calculate progress percentage and progress values for pie chart
  const progressValues = DispatchData.map((item) => item.value);

  return (
    // STATS, GRAPHS AND FEED

    <Box backgroundColor={colors.primary[500]} p={3} minHeight={"100vh"}>
      <Grid container spacing={1}>
        <Grid container xs={12} sm={7} lg={9}>
          <Stack
            spacing={1}
            flex="1 1 0"
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            p={2}
          >
            <Grid item xs={12} sm={12} md={3} lg={3} xl={4}>
              <Box
                backgroundColor={colors.secondary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="8px"
              >
                <StatBox
                  title={fireIncidentCount.toString()}
                  subtitle="Total Fire Incidents"
                  icon={
                    <AiFillFire
                      style={{
                        color: colors.orangeAccents[500],
                        fontSize: "26px",
                      }}
                    />
                  }
                />
              </Box>
            </Grid>

            {/* GRID ITEM 1.2*/}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={4}>
              <Box
                backgroundColor={colors.secondary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="8px"
              >
                <StatBox
                  title={weaponIncidentCount.toString()}
                  subtitle="Total Weapon Incidents"
                  icon={
                    <FaGun
                      style={{
                        color: colors.orangeAccents[500],
                        fontSize: "26px",
                      }}
                    />
                  }
                />
              </Box>
            </Grid>

            {/* GRID ITEM 1.3*/}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={4}>
              <Box
                backgroundColor={colors.secondary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="8px"
              >
                <StatBox
                  title={verifiedIncidentCount.toString()}
                  subtitle="Total Verified Incidents"
                  progress="0.30"
                  increase="+5%"
                  icon={
                    <MdVerified
                      style={{
                        color: colors.orangeAccents[500],
                        fontSize: "26px",
                      }}
                    />
                  }
                />
              </Box>
            </Grid>
          </Stack>

          <Stack spacing={1} p={2}>
            {/*FEED AND VIDEOS */}
            {/*THIS IS THE WHITE CONTAINER WHICH WILL STORE THE ITEMS */}

            <Box backgroundColor={colors.secondary[500]} borderRadius="8px">
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/*THIS IS THE CONTAINER WHICH WILL STORE THE lOGO AND NAME */}
                <Box display="flex" alignItems="center">
                  <BsFillCameraFill
                    style={{
                      color: colors.orangeAccents[500],
                      fontSize: "26px",
                    }}
                  />
                  <Typography
                    variant="h7"
                    fontWeight="bold"
                    paddingLeft={1}
                    sx={{ color: colors.blackAccents[500] }}
                  >
                    View Live Feed
                  </Typography>
                </Box>

                {/*THIS IS THE CONTAINER WHICH WILL HOLD THE ARROW */}
                <Box>
                  <Link to="/view_feed">
                    <IconButton>
                      <AiOutlineArrowRight
                        sx={{
                          fontSize: "26px",
                          color: colors.blackAccents[500],
                        }}
                      />
                    </IconButton>
                  </Link>
                </Box>
              </Box>

              <Box p={1}>
                {/*GRID 2 */}
                <Grid container rowSpacing={1} columnSpacing={1}>
                  {/*GRID item 2.1 */}
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={4}>
                    <Box
                      width="100%"
                      backgroundColor={colors.primary[400]}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/*Insert the video / RTSP FEED HERE */}
                      <img
                        src={"../../assets/vid-evidence.jpg"}
                        alt="sample"
                        style={{ maxWidth: "100%", height: "auto" }} // Controlling image dimensions
                      />
                    </Box>
                  </Grid>
                  {/*GRID item 2.2 */}
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={4}>
                    <Box
                      width="100%"
                      backgroundColor={colors.primary[400]}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/*Insert the video / RTSP FEED HERE */}
                      <img
                        src={"../../assets/vid-evidence.jpg"}
                        alt="sample"
                        style={{ maxWidth: "100%", height: "auto" }} // Controlling image dimensions
                      />
                    </Box>
                  </Grid>
                  {/*GRID item 2.3 */}
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={4}>
                    <Box
                      width="100%"
                      backgroundColor={colors.primary[400]}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/*Insert the video / RTSP FEED HERE */}
                      <img
                        src={"../../assets/vid-evidence.jpg"}
                        alt="sample"
                        style={{ maxWidth: "100%", height: "auto" }} // Controlling image dimensions
                      />
                    </Box>
                  </Grid>
                </Grid>
                {/*END OF THE GRID 2 */}
              </Box>
            </Box>
          </Stack>
        </Grid>

        <Grid container item xs={12} sm={12} lg={3} p={3}>
          <Box
            backgroundColor={colors.secondary[500]}
            width={"100%"}
            borderRadius="8px"
          >
            <Box
              mt="10px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/*THIS IS THE CONTAINER WHICH WILL STORE THE lOGO AND NAME */}
              <Box display="flex" alignItems="center">
                <FaChartPie
                  style={{
                    color: colors.orangeAccents[500],
                    fontSize: "26px",
                    transform: "scaleX(-1)",
                  }}
                />
                <Typography
                  variant="h7"
                  fontWeight="bold"
                  paddingLeft={1}
                  paddingTop={2}
                  sx={{ color: colors.blackAccents[500] }}
                >
                  Weekly Analytics
                </Typography>
              </Box>
            </Box>
            {/*This is the Box which will contain the pie chart */}
            <Box m="20px">
              <Box height="25vh">
                <PieChart isDashboard={true} data={DispatchData} />
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {DispatchData.map((item, index) => (
                  <Box
                    key={item.id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mb={2}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography fontWeight="medium">{item.label}</Typography>
                      <Typography fontWeight="medium">
                        {progressValues[index]}
                      </Typography>
                    </Box>
                    <progress
                      value={progressPercent[index]}
                      max={100}
                      style={{
                        width: "250px",
                        backgroundColor: item.color + " !important",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid container item xs={12} sm={12} lg={12} p={3}>
          <Box
            backgroundColor={colors.secondary[400]}
            borderRadius="8px"
            width={"100%"}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <FaChartPie
                  style={{
                    color: colors.orangeAccents[500],
                    fontSize: "26px",
                    transform: "scaleX(-1)",
                  }}
                />
                <Typography
                  variant="h7"
                  fontWeight="bold"
                  paddingLeft={1}
                  sx={{ color: colors.blackAccents[500] }}
                >
                  Dashboard Analytics
                </Typography>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} data={incidentData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
