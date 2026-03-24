import { Modal, Table, Tag } from "antd";

const getFileName = (url) => {
  if (!url) return "";
  return url.split("/").pop();
};

const ExportHistoryModal = ({ open, onClose, history, formatDate, role }) => {
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên file",
      dataIndex: "url",
      key: "file",
      render: (url) => getFileName(url),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
  ];

  // 👉 CHỈ THÊM CỘT TEACHER CHO ROLE EXAMINATION
  if (role === "EXAMINATION") {
    columns.push({
      title: "Giảng viên",
      dataIndex: "teacherCode",
      key: "teacherCode",
      render: (teacher) => teacher || "—",
    });
  }

  // Các cột cố định phía sau
  columns.push(
    {
      title: "Trạng thái",
      key: "status",
      render: () => <Tag color="blue">Export</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          Tải xuống
        </a>
      ),
    }
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Lịch sử Export"
      centered
      width="70vw"
      bodyStyle={{
        height: "65vh",
        overflowY: "auto",
        paddingRight: 12,
      }}
    >
      <Table
        columns={columns}
        dataSource={history}
        rowKey="id"
        pagination={false}
      />
    </Modal>
  );
};

export default ExportHistoryModal;
