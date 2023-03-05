import React from "react";
import "../styles/Dashboard.css";
import DisplayTaskToday from "../components/DisplayTaskToday";
import DisplayPinTask from "../components/DisplayPinTask";
const getDate = () => {
  const Month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date = new Date();
  return { day: date.getDate(), month: Month[date.getMonth()] };
};
const Dashboard = (props) => {
  const date = getDate();
  const listTask = [
    {
       id: "1",
      sectionID:"",
      title: "Task 1",
      description: "Task này sắp đến hạn rồi bé ơi Task này sắp đến hạn rồi bé ơi đúng nhận sai cãi",
      image:"",
      status:"",
      createTime:"",
      TaskTo:"",
      TaskFrom:"",
      PinTask: true,
      TagID:"",
      Attachment:""
    },
    {
      id: "2",
      sectionID:"",
      title: "Task 2",
      description: "Hello đây là task 2",
      image:"",
      status:"",
      createTime:"",
      TaskTo:"",
      TaskFrom:"",
      PinTask: false,
      TagID:"",
      Attachment:""
      
    },
  ];

  return (
    <div className="content">
      <div className="dashboard-content">
        <div className="element">
          <div className="today">
            <h2>Today</h2>
            <div className="date-box">
              <h1 className="month">{date.month}</h1>
              <p className="day">{date.day}</p>
            </div>
          </div>
        </div>
        <div className="element">
          <div className="task-today">
            <h2>Your Task Today</h2>
            <DisplayTaskToday listTask={listTask} />
          </div>
        </div>
        <div className="element">
          <div className="pin-task">
            <h2>Pin Task</h2>
            <DisplayPinTask listTask={listTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
