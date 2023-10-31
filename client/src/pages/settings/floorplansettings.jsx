import { useEffect } from "react";

const FloorplanSettings = ({ changeWelcomeText }) => {

    useEffect(() => {
      changeWelcomeText("Settings / Floor Plan");
    }, []);
};

export default FloorplanSettings;