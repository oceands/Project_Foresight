import React, { useState, useEffect, useRef } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { tokens } from "../../theme";

const CameraList = () => {
  const [cameras, setCameras] = useState([]);

  const fetchCameras = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/user/settings/camsettings"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      if (result.success && Array.isArray(result.camera)) {
        setCameras(result.camera);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      console.error("There was an error fetching camera:", error);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []); // Dependencies array

  const startWebRTC = (videoRef, cameraId) => {
    const webrtcUrl = `http://localhost:8083/stream/${cameraId}/channel/0/webrtc`;

    const webrtc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      sdpSemantics: "unified-plan",
    });

    webrtc.ontrack = function (event) {
      console.log(event.streams.length + " track is delivered");
      videoRef.srcObject = event.streams[0];
      videoRef.play();
    };

    webrtc.addTransceiver("video", { direction: "sendrecv" });

    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
      const offer = await webrtc.createOffer();

      await webrtc.setLocalDescription(offer);

      fetch(webrtcUrl, {
        method: "POST",
        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            webrtc.setRemoteDescription(
              new RTCSessionDescription({ type: "answer", sdp: atob(data) })
            );
          } catch (e) {
            console.warn(e);
          }
        });
    };

    const webrtcSendChannel = webrtc.createDataChannel("rtsptowebSendChannel");
    webrtcSendChannel.onopen = (event) => {
      console.log(`${webrtcSendChannel.label} has opened`);
      webrtcSendChannel.send("ping");
    };
    webrtcSendChannel.onclose = (_event) => {
      console.log(`${webrtcSendChannel.label} has closed`);
      startWebRTC(videoRef, cameraId);
    };
    webrtcSendChannel.onmessage = (event) => console.log(event.data);
  };

  const colors = tokens;
  return (
    <Box backgroundColor={colors.primary[500]} p={3} minHeight={"100vh"}>
      <Grid container spacing={2}>
        {cameras.map((camera) => (
          <Grid item key={camera.id} xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              style={{ padding: "20px", textAlign: "center" }}
            >
              <strong>{camera.CameraName}</strong>
              <br />
              {camera.Description}
              <br />
              {/* Pass camera.id to startWebRTC */}
              <video
                ref={(videoRef) => startWebRTC(videoRef, camera.id)}
                autoPlay
                muted
                playsInline
                controls
                style={{ width: "100%", marginTop: "10px" }}
              ></video>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CameraList;
