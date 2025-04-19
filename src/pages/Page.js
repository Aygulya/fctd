// // // import { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import {
// // //   collection,
// // //   addDoc,
// // //   onSnapshot,
// // //   query,
// // //   orderBy,
// // // } from "firebase/firestore";
// // // import { db } from "../firebase";
// // // import Block from "../components/Block";
// // // import { Button } from "antd";
// // // import { getAuth } from "firebase/auth";

// // // const Page = () => {
// // //   const { id } = useParams();
// // //   const [blocks, setBlocks] = useState([]);
// // //   const user = getAuth().currentUser;

// // //   useEffect(() => {
// // //     if (!user || !id) return;

// // //     const q = query(collection(db, "users", user.uid, "pages", id, "blocks"), orderBy("createdAt"));
// // //     const unsub = onSnapshot(q, snapshot => {
// // //       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // //       setBlocks(data);
// // //     });

// // //     return () => unsub();
// // //   }, [id, user]);

// // //   const addBlock = async (type) => {
// // //     if (!user) return;
// // //     await addDoc(collection(db, "users", user.uid, "pages", id, "blocks"), {
// // //       type,
// // //       content: "",
// // //       checked: false,
// // //       createdAt: new Date()
// // //     });
// // //   };

// // //   return (
// // //     <div>
// // //       <div style={{ marginBottom: 16 }}>
// // //         <Button onClick={() => addBlock("heading")} style={{ marginRight: 8 }}>Добавить заголовок</Button>
// // //         <Button onClick={() => addBlock("text")} style={{ marginRight: 8 }}>Добавить текст</Button>
// // //         <Button onClick={() => addBlock("checkbox")}>Добавить чекбокс</Button>
// // //       </div>
// // //       {blocks.map(block => (
// // //         <Block key={block.id} pageId={id} block={block} />
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default Page;
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import {
// //   collection,
// //   doc,
// //   addDoc,
// //   deleteDoc,
// //   onSnapshot,
// //   orderBy,
// //   query,
// //   updateDoc,
// //   serverTimestamp,
// // } from "firebase/firestore";
// // import { db } from "../firebase";
// // import Block from "../components/Block";
// // import { Button, Space } from "antd";
// // import {
// //   DndContext,
// //   closestCenter,
// //   useSensor,
// //   useSensors,
// //   PointerSensor,
// //   KeyboardSensor,
// // } from "@dnd-kit/core";
// // import {
// //   SortableContext,
// //   verticalListSortingStrategy,
// //   arrayMove,
// // } from "@dnd-kit/sortable";
// // import SortableItem from "../components/SortableItem";

// // const Page = () => {
// //   const { id } = useParams();
// //   const [blocks, setBlocks] = useState([]);

// //   useEffect(() => {
// //     const q = query(collection(db, "pages", id, "blocks"), orderBy("order"));
// //     const unsub = onSnapshot(q, (snapshot) => {
// //       const list = snapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setBlocks(list);
// //     });

// //     return () => unsub();
// //   }, [id]);

// //   const addBlock = async (type) => {
// //     await addDoc(collection(db, "pages", id, "blocks"), {
// //       type,
// //       title: "Новый блок",
// //       content: "",
// //       tasks: [],
// //       checked: false,
// //       color: "#ffffff",
// //       createdAt: serverTimestamp(),
// //       order: blocks.length,
// //     });
// //   };

// //   const deleteBlock = async (blockId) => {
// //     await deleteDoc(doc(db, "pages", id, "blocks", blockId));
// //   };

// //   const handleDragEnd = async (event) => {
// //     const { active, over } = event;
// //     if (!over || active.id === over.id) return;

// //     const oldIndex = blocks.findIndex((item) => item.id === active.id);
// //     const newIndex = blocks.findIndex((item) => item.id === over.id);

// //     const reordered = arrayMove(blocks, oldIndex, newIndex);
// //     setBlocks(reordered);

// //     await Promise.all(
// //       reordered.map((block, index) =>
// //         updateDoc(doc(db, "pages", id, "blocks", block.id), {
// //           order: index,
// //         })
// //       )
// //     );
// //   };
// //   const handleAddFinancialGoal = async () => {
// //     const newBlockRef = doc(collection(db, "pages", pageId, "blocks"));
// //     await setDoc(newBlockRef, {
// //       id: newBlockRef.id,
// //       title: "Новая цель",
// //       goalType: "finance",
// //       goalAmount: 6000,  // можно потом редактировать
// //       contributed: 0,
// //       color: "#fff7e6",
// //       tasks: [],
// //       deadline: null,
// //     });
// //   };
  
// //   return (
// //     <div style={{ padding: 24 }}>
// //       <Space style={{ marginBottom: 16 }}>
// //         <Button onClick={() => addBlock("text")}>+ Text</Button>
// //       </Space>
// //       <Space style={{ marginBottom: 16 }}>
// //       <Button onClick={handleAddFinancialGoal}>Добавить финансовую цель</Button>
// //       </Space>
// //       <DndContext
// //         sensors={useSensors(
// //           useSensor(PointerSensor),
// //           useSensor(KeyboardSensor)
// //         )}
// //         collisionDetection={closestCenter}
// //         onDragEnd={handleDragEnd}
// //       >
// //         <SortableContext
// //           items={blocks.map((b) => b.id)}
// //           strategy={verticalListSortingStrategy}
// //         >
// //           {blocks.map((block) => (
// //             <SortableItem key={block.id} id={block.id}>
// //               <Block
// //                 block={block}
// //                 pageId={id}
// //                 onDelete={() => deleteBlock(block.id)}
// //               />
// //             </SortableItem>
// //           ))}
// //         </SortableContext>
// //       </DndContext>
// //     </div>
// //   );
// // };

// // export default Page;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   collection,
//   doc,
//   addDoc,
//   deleteDoc,
//   onSnapshot,
//   orderBy,
//   query,
//   updateDoc,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import Block from "../components/Block";
// import { Button, Space } from "antd";
// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   PointerSensor,
//   KeyboardSensor,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import SortableItem from "../components/SortableItem";
// import '../button.css'

// const Page = () => {
//   const { id } = useParams();
//   const [blocks, setBlocks] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, "pages", id, "blocks"), orderBy("order"));
//     const unsub = onSnapshot(q, (snapshot) => {
//       const list = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setBlocks(list);
//     });

//     return () => unsub();
//   }, [id]);

//   const addBlock = async (type) => {
//     await addDoc(collection(db, "pages", id, "blocks"), {
//       type,
//       title: "Новый блок",
//       content: "",
//       tasks: [],
//       checked: false,
//       color: "#ffffff",
//       createdAt: serverTimestamp(),
//       order: blocks.length,
//     });
//   };

//   const deleteBlock = async (blockId) => {
//     await deleteDoc(doc(db, "pages", id, "blocks", blockId));
//   };

//   const handleDragEnd = async (event) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex = blocks.findIndex((item) => item.id === active.id);
//     const newIndex = blocks.findIndex((item) => item.id === over.id);

//     const reordered = arrayMove(blocks, oldIndex, newIndex);
//     setBlocks(reordered);

//     await Promise.all(
//       reordered.map((block, index) =>
//         updateDoc(doc(db, "pages", id, "blocks", block.id), {
//           order: index,
//         })
//       )
//     );
//   };

//   const handleAddFinancialGoal = async () => {
//     const newBlockRef = doc(collection(db, "pages", id, "blocks"));
//     await setDoc(newBlockRef, {
//       id: newBlockRef.id,
//       title: "Новая цель",
//       goalType: "finance",
//       goalAmount: 6000,
//       contributed: 0,
//       color: "#fff7e6",
//       tasks: [],
//       deadline: null,
//       order: blocks.length,
//       createdAt: serverTimestamp(),
//     });
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <Space style={{ marginBottom: 16 }}>
//         <Button onClick={() => addBlock("text")} className="custom-btn btn-6"><span>TEXT BLOCK </span></Button>
//         <Button onClick={handleAddFinancialGoal}className="custom-btn btn-6"><span>FINANCIAL GOAL</span></Button>
//       </Space>

//       <DndContext
//         sensors={useSensors(
//           useSensor(PointerSensor),
//           useSensor(KeyboardSensor)
//         )}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={blocks.map((b) => b.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {blocks.map((block) => (
//             <SortableItem key={block.id} id={block.id}>
//               <Block
//                 block={block}
//                 pageId={id}
//                 onDelete={() => deleteBlock(block.id)}
//               />
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>
//     </div>
//   );
// };

// export default Page;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Block from "../components/Block";
import { Button, Space } from "antd";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";
import '../button.css';

const Page = () => {
  const { id } = useParams();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "pages", id, "blocks"), orderBy("order"));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlocks(list);
    });

    return () => unsub();
  }, [id]);

  const addBlock = async (type) => {
    await addDoc(collection(db, "pages", id, "blocks"), {
      type,
      title: "Новый блок",
      content: "",
      tasks: [],
      checked: false,
      color: "#ffffff",
      createdAt: serverTimestamp(),
      order: blocks.length,
    });
  };

  const deleteBlock = async (blockId) => {
    await deleteDoc(doc(db, "pages", id, "blocks", blockId));
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((item) => item.id === active.id);
    const newIndex = blocks.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(blocks, oldIndex, newIndex);
    setBlocks(reordered);

    await Promise.all(
      reordered.map((block, index) =>
        updateDoc(doc(db, "pages", id, "blocks", block.id), {
          order: index,
        })
      )
    );
  };

  const handleAddFinancialGoal = async () => {
    const newBlockRef = doc(collection(db, "pages", id, "blocks"));
    await setDoc(newBlockRef, {
      id: newBlockRef.id,
      title: "Новая цель",
      goalType: "finance",
      goalAmount: 6000,
      contributed: 0,
      color: "#fff7e6",
      tasks: [],
      deadline: null,
      order: blocks.length,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div style={{ padding: 24 }}>
<button
  onClick={() => addBlock("text")}
  className="custom-btn btn-6"
  style={{
    position: "sticky",
    top: 24, // Отступ сверху
    zIndex: 10, // Чтобы кнопки были поверх других элементов
  }}
>
  <span>TEXT BLOCK</span>
</button>

<button
  onClick={handleAddFinancialGoal}
  className="custom-btn btn-6"
  style={{
    position: "sticky",
    top: 24, // Если хочешь, чтобы вторая кнопка немного ниже
    zIndex: 10, // Чтобы кнопки были поверх других элементов
  }}
>
  <span>FINANCIAL GOAL</span>
</button>

 {/* <button onClick={() => addBlock("text")} className="custom-btn btn-6">
          <span>TEXT BLOCK</span>
        </button>
        <button onClick={handleAddFinancialGoal} className="custom-btn btn-6">
          <span>FINANCIAL GOAL</span>
        </button> */}
      <DndContext
        sensors={useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <SortableItem key={block.id} id={block.id}>
              <Block
                block={block}
                pageId={id}
                onDelete={() => deleteBlock(block.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Page;
