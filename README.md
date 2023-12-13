# Project_Foresight 🚀

<div align="center">

_A modern CCTV management system with hazard detection for efficient incident response 🛡️._

![GitHub last commit](https://img.shields.io/github/last-commit/oceands/Project_Foresight)
![GitHub Downloads](https://img.shields.io/github/downloads/oceands/Project_Foresight/total.svg)
![Collaborators](https://img.shields.io/badge/collaborators-5-blue)
![Node Version](https://img.shields.io/badge/node_version-v18.16.1-red)
![Python Version](https://img.shields.io/badge/python_version-v3.11.4-purple)

_Foresight: Real-time CCTV 📹 Fire and Weapon detection and incident prediction. YOLOV8-powered 🧠 security for proactive threat prevention._

</div>

![page github](https://github.com/oceands/Project_Foresight/assets/94485584/f047fe12-1401-496e-81a9-6f0ba44e4e5f)


## Introduction 🌟
_Project Foresight_ is an YOLOV8-powered security system 🛡️ designed to provide proactive threat prevention by analyzing real-time CCTV footage. Our system identifies potential hazards and anomalies, ensuring timely and efficient incident response.

## Features 🚀
- **Real-time Anomaly Detection:** Utilizes cutting-edge AI to monitor CCTV footage for unusual activity.
- **Incident Prediction:** Predicts potential incidents before they occur, enhancing proactive measures.
- **Automated Alerts:** Notifies relevant authorities and individuals upon detection of any threats.
- **Easy Integration:** Seamlessly integrates with existing CCTV infrastructure.
- **User-Friendly Interface:** Intuitive design for ease of use and efficient management.

## Tech-stack 💻
Our system is built using the latest technologies for optimal performance and scalability.

![page github 2](https://github.com/oceands/Project_Foresight/assets/94485584/c04d9c56-9242-4223-8c19-674ec8026358)

## Installation Guide 🛠️

### Frontend Setup
Clone the Repository
```sh
git clone https://github.com/oceands/Project_Foresight.git
```
Enter Client Dir
```sh
cd client
```
Install packages
```sh
npm install --force
```
Run Front End Server 
```sh
npm run start
```


### Backend Setup
Change to Server Directory
```sh
cd server
```
Create a Venv
```sh
python3 -m  venv .venv
```
Activate venv
```sh
.venv/Scripts/Activate
```
Install Requirments
```sh
pip install - r requirements.txt
```
Run Flask Server
```sh
flask run
```
### WebRTC server Setup
Change to Server Directory
```sh
cd RTSPtoWeb
```
Run server
```sh
go run .
```

### Additional Setup

#### Postman API Setup
Configure and Use Postman for API Testing
- Install Postman on your device.
- Open Postman and either sign up or log in.
- Enter the following URL in a new tab: `http://127.0.0.1:5000/auth/api/users/register`
- Set the method to POST and body to raw JSON.
- Enter user details as shown in the example:

  ```json
  {
      "Fname": "First Name",
      "Lname": "Last Name",
      "email": "email@example.com",
      "role": "user role",
      "password": "your password"
  }
  ```

- Send the request in Postman.
- Log in on the frontend using the provided email and password

## Usage 📚

###View Dashboard stats
https://private-user-images.githubusercontent.com/94485584/290295846-86d1b082-2242-46b5-ac01-81654362f661.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDI0OTcxMTcsIm5iZiI6MTcwMjQ5NjgxNywicGF0aCI6Ii85NDQ4NTU4NC8yOTAyOTU4NDYtODZkMWIwODItMjI0Mi00NmI1LWFjMDEtODE2NTQzNjJmNjYxLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjEzVDE5NDY1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg4MTRjMmI2NTExZDAzYmE1YWY2MWIxOThiM2U2NTVlNTljOGQyODBkM2I1ODUxMzViN2RmMWYzMTlkMjcxZDQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.mV0tAY92tro5Cbff9CqB9Aknt5RTmDn7z9Ob8EG6VLA


