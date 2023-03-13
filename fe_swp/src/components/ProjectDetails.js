import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import "../styles/ProjectDetails.css";
import authAxios from "../services/AxiosInstance";
import "../styles/Project.css";
import Section from "./Section";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "28%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const styleList = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
function ProjectDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const handleClose = () => setOpen(false);
  const [sections, setSections] = useState([
    {
      id: 30,
      workSpaceId: 16,
      title: "Title 312321",
      describe: "Describe 312321",
      status: false,
    },
    {
      id: 33,
      workSpaceId: 16,
      title: "Title sssssssssssssssssssssssssssssssss",
      describe: "Describe sssssssssssssssssssssssssssssssss",
      status: false,
    },
    {
      id: 36,
      workSpaceId: 16,
      title: "Title fafafs",
      describe: "Describe fafafs",
      status: false,
    },
    {
      id: 37,
      workSpaceId: 16,
      title: "Title to top",
      describe: "Describe to top",
      status: false,
    },
    {
      id: 38,
      workSpaceId: 16,
      title: "Title ",
      describe: "Describe ",
      status: false,
    },
  ]);
  const [check, setCheck] = useState(false);
  const [opened, setOpened] = useState(false);
  const [userInWorkSpace, setUserInWorkSpace] = useState();
  const [openListMember, setOpenListMember] = React.useState(false);
  const handleCloseListMember = () => setOpenListMember(false);
  const handleOpenListMember = () => setOpenListMember(true);
  const [kicked, setKicked] = React.useState(false);
  async function kickMemmber(idKicked) {
    console.log(idKicked);
    console.log(props.project.id);
    console.log(localStorage.getItem("id"));
    await authAxios
      .delete(
        `/User/DeleteUserWorkSpace?workSpaceID=${
          props.project.id
        }&userIdDeleted=${idKicked}&userAdminId=${localStorage.getItem("id")}`,
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.data == null) {
          alert("You are not allowed to kick");
        }
        setKicked(!kicked);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  }
  function assginTask(id) {
    alert("display all task in project to assign " + id);
  }
  function handleOpen(e) {
    setOpen(true);
  }
  useEffect(() => {
    authAxios
      .get(`/User/Workspace/${props.project.id}`)
      .then(function (response) {
        console.log(response.data.data);
        setUserInWorkSpace(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [kicked, open]);
  useEffect(() => {
    authAxios
      .get(`/User`)
      .then(function (response) {
        console.log(response.data.data);
        setUsers(
          response.data.data.filter((item) =>
            item.userName.toLowerCase().includes(searchText.toLowerCase()),
          ),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchText]);

  function addSection() {
    setOpened(!opened);
  }
  async function addMemmber() {
    await authAxios
      .post(
        `/WorkSpace/AddMember/${props.project.id}?nameUser=${
          document.querySelector(".add-member").value
        }&roleID=2`,
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  }

  async function addSectionApi() {
    document.querySelector(".section_input").style.display = "none";
    await authAxios
      .post(`/Section?userID=${localStorage.getItem("id")}&roleID=1`, {
        workSpaceId: props.project.id,
        title: "Title " + document.querySelector(".des_section").value,
        describe: "Describe " + document.querySelector(".des_section").value,
        status: false,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCheck(!check);
  }

  useEffect(() => {
    authAxios
      .get(`/Section/Workspace/${props.project.id}`)
      .then(function (response) {
        console.log(response.data.data);
        setSections(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [check]);

  return (
    <div className='project_component'>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "1vh" }}>{props.project.name}</h1>
          <p>{props.project.describe}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            width: "12vw",
          }}
        >
          <div
            className='btn_share kick'
            onClick={() => handleOpenListMember()}
          >
            <FaUserFriends></FaUserFriends>
          </div>
          <div className='btn_share add' onClick={(e) => handleOpen(e)}>
            <AiOutlinePlus></AiOutlinePlus>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div style={{ marginBottom: "20px" }}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Add Member
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "100%", padding: "0px 20px" }}
                  placeholder='Username'
                  class='add-member'
                  onChange={(e) => setSearchText(e.target.value)}
                ></input>
                <Button onClick={() => addMemmber()}>Add </Button>
              </div>

              {users != null && (
                <div
                  style={{
                    width: "270px",
                    height: "130px",
                    overflowY: "auto",
                    backgroundColor: "white",
                    borderRadius: " 0 0 5px 5px",
                    border: "1px solid gray",
                  }}
                  className='modal_add_member'
                >
                  <ul>
                    {users != null &&
                      users.map((u) => (
                        <li
                          onClick={() => {
                            document.querySelector(".add-member").value =
                              u.userName;
                          }}
                          key={u.id}
                        >
                          {u.userName}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </Box>
          </Modal>
          <Modal
            open={openListMember}
            onClose={handleCloseListMember}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={styleList}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Member
              </Typography>

              {users != null && (
                <div
                  style={{
                    cursor: "pointer",
                    marginTop: "2vh",
                    padding: "2vh 2vw",
                    width: "100%",
                    height: "fit-content",
                    overflowY: "auto",
                    backgroundColor: "white",
                    borderRadius: " 5px",
                    border: "1px solid gray",
                  }}
                  className='modal_add_member'
                >
                  {userInWorkSpace != null &&
                    userInWorkSpace.map((u) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "2px 0",
                        }}
                        onClick={() => {
                          document.querySelector(".add-member").value =
                            u.userName;
                        }}
                        key={u.id}
                      >
                        <div> {u.userName}</div>
                        <div>
                          <Button onClick={() => assginTask(u.id)}>
                            Assign Task
                          </Button>
                          <Button onClick={() => kickMemmber(u.id)}>
                            Kick member
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Box>
          </Modal>
        </div>
      </div>

      <div className='Create_section'>
        {sections != null &&
          sections.map((section) => (
            <Section key={section.id} section={section}></Section>
          ))}
        <div className='section_base'>
          <div className='section_name'>Name section</div>
          <div className='section_task'>
            <div onClick={() => addSection()} className='section_btnAdd'>
              {opened ? "X" : <AiOutlinePlus size='30px'></AiOutlinePlus>}
            </div>
          </div>
        </div>
        {opened && (
          <div className='section_input'>
            <div className='section_in'>
              <div className='section_name'>
                <input
                  autoFocus='true'
                  name='data'
                  className='des_section'
                ></input>
                <button onClick={() => addSectionApi()}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
