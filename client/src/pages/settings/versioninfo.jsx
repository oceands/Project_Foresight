import { useEffect } from "react";

const VersionInfo = ({ changeWelcomeText }) => {

    useEffect(() => {
      changeWelcomeText("Settings / System Information");
    }, []);
};

export default VersionInfo;