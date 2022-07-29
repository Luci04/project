import React, { useEffect, useState } from "react";
import { Card, Row, Col, Divider, Button, Modal, Input } from "antd";
import {
  FileAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Bucket.css";

import { SampleData } from "../../SAMPLE_DATA";

function Bucket() {
  const { id, BucketName } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCardModalVisible, setAddCardIsModalVisible] = useState(false);
  const [isEditCardModalVisible, setEditCardIsModalVisible] = useState(false);
  const [videoDetail, setVideoDetail] = useState({});

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [link, setlink] = useState("");
  const [editCardID, setEditCardID] = useState(null);
  const [data, setData] = useState([]);

  //Modal Settings
  const showModal = (videoLocation, videotitle) => {
    var iframe = document.querySelector("iframe");

    if (iframe !== null) {
      iframe.src = videoLocation;
    }

    setIsModalVisible(true);

    setVideoDetail({ videoLocation, videotitle });
    console.log(videoLocation, videotitle);
  };

  const showAddCardModal = () => {
    setAddCardIsModalVisible(true);
  };

  const showEditCardModal = ({ id, title, desc, link }) => {
    setEditCardIsModalVisible(true);
    setlink(link);
    settitle(title);
    setdesc(desc);
    setEditCardID(id);
  };

  const handleOk = () => {
    //Closing Video
    var iframe = document.querySelector("iframe");
    var video = document.querySelector("video");

    if (iframe !== null) {
      var iframeSrc = iframe.src;
      iframe.src = "";
    }

    setVideoDetail({});
    setIsModalVisible(false);
  };

  const handleAddCardOk = () => {
    setAddCardIsModalVisible(false);
    const newData = data;
    newData.push({ id: uuidv4(), link: link + "?autoplay=1", title, desc });
    setData(newData);
    setlink("");
    settitle("");
    setdesc("");
  };

  const handleEditCardOk = () => {
    const newData = data;

    const index = newData.findIndex((element) => element.id === editCardID);

    newData[index] = { id: id, title: title, link: link, desc: desc };

    console.log(newData);

    setData(newData);

    setEditCardIsModalVisible(false);
    setlink("");
    settitle("");
    setdesc("");
  };

  // Add Card Modal
  const handleAddCardCancel = () => {
    setAddCardIsModalVisible(false);
    setlink("");
    settitle("");
    setdesc("");
  };

  const handleEditCardCancel = () => {
    setEditCardIsModalVisible(false);
    setlink("");
    settitle("");
    setdesc("");
  };

  const handleNewCardTitle = (e) => {
    settitle(e.target.value);
  };

  const handleNewCardDesc = (e) => {
    setdesc(e.target.value);
  };

  const handleNewCardLink = (e) => {
    setlink(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await SampleData[id - 1].videos;
      setData(response);
    }

    fetchData();
  }, []);

  const handleDeleteCard = (id) => {
    const newData = data.filter((element) => element.id != id);
    setData(newData);
  };

  return (
    <div className="container">
      <div className="title">
        <h1>{BucketName}</h1>
        <FileAddOutlined
          onClick={showAddCardModal}
          style={{ fontSize: 30, cursor: "pointer" }}
        />
      </div>
      <Divider></Divider>
      <Row gutter={[20, 20]}>
        {data.map((element) => (
          <div key={element.id}>
            <Col xs={24} sm={12} md={6}>
              <Card
                key={element.id}
                title={element.title}
                extra={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button>
                      <EditOutlined
                        onClick={() => showEditCardModal(element)}
                      />
                    </Button>
                    <Button>
                      <DeleteOutlined
                        onClick={() => handleDeleteCard(element.id)}
                      />
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => showModal(element.link, element.title)}
                    >
                      Play
                    </Button>
                  </div>
                }
                style={{ width: 200 }}
              >
                <h2>{element.title}</h2>
                <p>{element.desc}</p>
              </Card>
            </Col>
          </div>
        ))}
      </Row>
      {/* Video Play Modal */}
      <Modal
        title={videoDetail.videotitle}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <iframe
          src={videoDetail.videoLocation}
          width="100%"
          height="100%"
          allow="autoplay"
          frameborder="0"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </Modal>

      {/* Add Modal Form */}
      <Modal
        title="Add New Card"
        visible={isAddCardModalVisible}
        onOk={handleAddCardOk}
        onCancel={handleAddCardCancel}
      >
        <div>
          <h3>Title</h3>
          <Input
            style={{ marginBottom: 10 }}
            name="title"
            value={title}
            onChange={(e) => handleNewCardTitle(e)}
            placeholder="Title"
          />
          <h3>Description</h3>
          <Input
            style={{ marginBottom: 10 }}
            name="desc"
            value={desc}
            onChange={(e) => handleNewCardDesc(e)}
            placeholder="Desc"
          />
          <h3>Link</h3>
          <Input
            name="link"
            style={{ marginBottom: 10 }}
            value={link}
            onChange={(e) => handleNewCardLink(e)}
            placeholder="Link"
          />
        </div>
      </Modal>

      {/* Edit Card Modal */}
      <Modal
        title="Edit Card"
        visible={isEditCardModalVisible}
        onOk={handleEditCardOk}
        onCancel={handleEditCardCancel}
      >
        <div>
          <h3>Title</h3>
          <Input
            style={{ marginBottom: 10 }}
            name="title"
            value={title}
            onChange={(e) => handleNewCardTitle(e)}
            placeholder="Title"
          />
          <h3>Description</h3>
          <Input
            style={{ marginBottom: 10 }}
            name="desc"
            value={desc}
            onChange={(e) => handleNewCardDesc(e)}
            placeholder="Desc"
          />
          <h3>Link</h3>
          <Input
            name="link"
            style={{ marginBottom: 10 }}
            value={link}
            onChange={(e) => handleNewCardLink(e)}
            placeholder="Link"
          />
        </div>
      </Modal>
    </div>
  );
}

export default Bucket;
