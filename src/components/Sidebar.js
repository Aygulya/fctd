// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { Button, Input, List } from "antd";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";

// const Sidebar = () => {
//   const [pages, setPages] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const navigate = useNavigate();
//   const user = getAuth().currentUser;

//   const fetchPages = async () => {
//     if (!user) return;
//     const pagesCol = collection(db, "users", user.uid, "pages");
//     const snapshot = await getDocs(pagesCol);
//     const pagesData = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setPages(pagesData);
//   };

//   const createPage = async () => {
//     if (!newTitle.trim() || !user) return;
//     const docRef = await addDoc(collection(db, "users", user.uid, "pages"), {
//       title: newTitle
//     });
//     setNewTitle("");
//     fetchPages();
//     navigate(`/page/${docRef.id}`);
//   };

//   useEffect(() => {
//     fetchPages();
//   }, [user]);

//   return (
//     <div className="sidebar" style={{ width: 250, padding: 16, borderRight: "1px solid #eee", height: "100vh" }}>
//       <h3>🗂 Мои страницы</h3>
//       <List
//         dataSource={pages}
//         renderItem={item => (
//           <List.Item onClick={() => navigate(`/page/${item.id}`)} style={{ cursor: "pointer" }}>
//             {item.title}
//           </List.Item>
//         )}
//       />
//       <Input
//         placeholder="Новая страница"
//         value={newTitle}
//         onChange={e => setNewTitle(e.target.value)}
//         onPressEnter={createPage}
//         style={{ marginTop: 16 }}
//       />
//       <Button onClick={createPage} type="primary" style={{ marginTop: 8 }} block>
//         ➕ Создать
//       </Button>
//     </div>
//   );
// };

// export default Sidebar;
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button, Input, List, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Sidebar = () => {
  const [pages, setPages] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingPageId, setEditingPageId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  const fetchPages = async () => {
    if (!user) return;
    const pagesCol = collection(db, "users", user.uid, "pages");
    const snapshot = await getDocs(pagesCol);
    const pagesData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPages(pagesData);
  };

  const createPage = async () => {
    if (!newTitle.trim() || !user) return;
    const docRef = await addDoc(collection(db, "users", user.uid, "pages"), {
      title: newTitle,
    });
    setNewTitle("");
    fetchPages();
    navigate(`/page/${docRef.id}`);
  };

  const handleEditPage = (pageId, currentTitle) => {
    setEditingPageId(pageId);
    setEditingTitle(currentTitle);
    setShowEditModal(true);
  };

  const handleDeletePage = async (pageId) => {
    await deleteDoc(doc(db, "users", user.uid, "pages", pageId));
    fetchPages();
  };

  const handleSaveEdit = async () => {
    if (editingTitle.trim()) {
      await updateDoc(doc(db, "users", user.uid, "pages", editingPageId), {
        title: editingTitle,
      });
      setShowEditModal(false);
      fetchPages();
    }
  };

  useEffect(() => {
    fetchPages();
  }, [user]);

  return (
    <div
      className="sidebar"
      style={{ width: 250, padding: 16, borderRight: "1px solid #eee", height: "100vh" }}
    >
      <h3>🗂 Мои страницы</h3>
      <List
        dataSource={pages}
        renderItem={(item) => (
          <List.Item style={{ display: "flex", justifyContent: "space-between" }}>
            <span onClick={() => navigate(`/page/${item.id}`)}>{item.title}</span>
            <Space>
              <Button
                type="link"
                onClick={() => handleEditPage(item.id, item.title)}
              >
                ✏️
              </Button>
              <Button
                danger
                type="link"
                onClick={() => handleDeletePage(item.id)}
              >
                🗑️
              </Button>
            </Space>
          </List.Item>
        )}
      />
      <Input
        placeholder="Новая страница"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onPressEnter={createPage}
        style={{ marginTop: 16 }}
      />
      <Button onClick={createPage} type="primary" style={{ marginTop: 8 }} block>
        ➕ Создать
      </Button>

      {/* Modal для редактирования названия страницы */}
      <Modal
        title="Редактировать название страницы"
        visible={showEditModal}
        onOk={handleSaveEdit}
        onCancel={() => setShowEditModal(false)}
      >
        <Input
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Sidebar;
