import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { SampleData } from "../../SAMPLE_DATA";

import { Card, Row, Col, Divider, Button, Modal, Input } from "antd";

import { EditOutlined } from "@ant-design/icons";

function BucketList() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newBucketName, setnewBucketName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Modal Controls
  const showModal = (id) => {
    setEditId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const newData = data.map((element) => {
      if (element.id === editId) {
        return { ...element, title: newBucketName };
      } else {
        return element;
      }
    });

    setEditId(null);
    setnewBucketName("");
    setData(newData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setnewBucketName(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await SampleData;
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="title">
        <h1>Bucket List</h1>
      </div>

      <Divider></Divider>

      <Row gutter={[16, 16]}>
        {data.map((element) => (
          <div key={element.id}>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={element.title}
                extra={
                  <>
                    <a href={"/bucket/" + element.id + "/" + element.title}>
                      More
                    </a>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                    >
                      <EditOutlined onClick={() => showModal(element.id)} />
                    </div>
                  </>
                }
                style={{ width: 200 }}
              >
                <p>{element.name}</p>
              </Card>
            </Col>
          </div>
        ))}
      </Row>

      {/* Modal */}
      <Modal
        title="Edit Bucket"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Enter Name :</h3>
        <Input
          value={newBucketName}
          onChange={handleChange}
          placeholder="Enter Bucket Name"
        />
      </Modal>
    </>
  );
}

export default BucketList;
