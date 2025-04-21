// import React, { useEffect, useState } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { Input, Button, Checkbox, DatePicker, Space, Progress, Select, List, Modal } from "antd";
// import { SketchPicker } from "react-color";
// import moment from "moment";

// const { Option } = Select;

// const Block = ({ block, pageId, onDelete }) => {
//   const { id, title, tasks, color, deadline, goalType, goalAmount, contributions = [] } = block;

//   const [blockTitle, setBlockTitle] = useState(title || "");
//   const [taskList, setTaskList] = useState(tasks || []);
//   const [newTask, setNewTask] = useState("");
//   const [selectedColor, setSelectedColor] = useState(color || "#ffffff");
//   const [selectedDate, setSelectedDate] = useState(deadline ? moment(deadline) : null);
//   const [goalSum, setGoalSum] = useState(goalAmount || 0);
//   const [newContributionAmount, setNewContributionAmount] = useState("");
//   const [newCurrency, setNewCurrency] = useState("₾");
//   const [history, setHistory] = useState(contributions);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editAmount, setEditAmount] = useState("");
//   const [editCurrency, setEditCurrency] = useState("");
//   const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
//   // Save all changes
//   useEffect(() => {
//     const update = async () => {
//       await updateDoc(doc(db, "pages", pageId, "blocks", id), {
//         title: blockTitle,
//         tasks: taskList,
//         color: selectedColor,
//         deadline: selectedDate ? selectedDate.toDate() : null,
//         goalAmount: goalSum,
//         contributions: history,
//       });
//     };
//     update();
//   }, [blockTitle, taskList, selectedColor, selectedDate, goalSum, history]);

//   // Tasks
//   const handleAddTask = () => {
//     if (!newTask.trim()) return;
//     setTaskList([...taskList, { text: newTask, completed: false }]);
//     setNewTask("");
//   };

//   const handleCheck = (idx) => {
//     const updated = [...taskList];
//     updated[idx].completed = !updated[idx].completed;
//     setTaskList(updated);
//   };

//   const handleDeleteTask = (idx) => {
//     const updated = [...taskList];
//     updated.splice(idx, 1);
//     setTaskList(updated);
//   };

//   const taskProgress =
//     taskList.length > 0
//       ? (taskList.filter((t) => t.completed).length / taskList.length) * 100
//       : 0;

//   // Finance
//   const totalInBaseCurrency = history
//     .filter((c) => c.currency === newCurrency)
//     .reduce((sum, c) => sum + Number(c.amount), 0);

//   const financeProgress = goalSum > 0 ? (totalInBaseCurrency / goalSum) * 100 : 0;

//   const handleAddContribution = () => {
//     const amount = parseFloat(newContributionAmount);
//     if (!amount || amount <= 0) return;
//     const newEntry = {
//       amount,
//       currency: newCurrency,
//       date: moment().format("YYYY-MM-DD"),
//     };
//     setHistory((prev) => [...prev, newEntry]);
//     setNewContributionAmount("");
//   };

//   const handleDeleteContribution = (index) => {
//     const updated = [...history];
//     updated.splice(index, 1);
//     setHistory(updated);
//   };

//   const openEditModal = (index) => {
//     setEditingIndex(index);
//     setEditAmount(history[index].amount);
//     setEditCurrency(history[index].currency);
//   };

//   const handleSaveEdit = () => {
//     const updated = [...history];
//     updated[editingIndex] = {
//       ...updated[editingIndex],
//       amount: parseFloat(editAmount),
//       currency: editCurrency,
//     };
//     setHistory(updated);
//     setEditingIndex(null);
//   };

//   return (
//     <div
//       style={{
//         background: selectedColor,
//         padding: 16,
//         marginBottom: 12,
//         borderRadius: 8,
//         position: "relative",
//       }}
//     >
//       <Space direction="vertical" style={{ width: "100%" }}>
//         <Input
//           value={blockTitle}
//           onChange={(e) => setBlockTitle(e.target.value)}
//           placeholder="Заголовок"
//         />
//         {goalType === "finance" ? (
//           <>
//             <Input
//               addonBefore="Цель (₾)"
//               type="number"
//               value={goalSum}
//               onChange={(e) => setGoalSum(Number(e.target.value))}
//             />

//             <Space>
//               <Input
//                 placeholder="Сумма"
//                 value={newContributionAmount}
//                 onChange={(e) => setNewContributionAmount(e.target.value)}
//                 type="number"
//               />
//               <Select value={newCurrency} onChange={(val) => setNewCurrency(val)} style={{ width: 80 }}>
//                 <Option value="₾">₾</Option>
//                 <Option value="$">$</Option>
//                 <Option value="€">€</Option>
//                 <Option value="₽">₽</Option>
//               </Select>
//               <Button onClick={handleAddContribution}>Внести</Button>
//             </Space>

//             <Progress percent={Math.min(100, Math.round(financeProgress))} />

//             <List
//               header={<strong>История взносов</strong>}
//               bordered
//               dataSource={history}
//               renderItem={(item, index) => (
//                 <List.Item
//                   actions={[
//                     <a onClick={() => openEditModal(index)}>Редактировать</a>,
//                     <a onClick={() => handleDeleteContribution(index)}>Удалить</a>,
//                   ]}
//                 >
//                   {item.amount} {item.currency} — {item.date}
//                 </List.Item>
//               )}
//             />

//             <Modal
//               title="Редактировать взнос"
//               open={editingIndex !== null}
//               onOk={handleSaveEdit}
//               onCancel={() => setEditingIndex(null)}
//             >
//               <Space direction="vertical" style={{ width: "100%" }}>
//                 <Input
//                   value={editAmount}
//                   onChange={(e) => setEditAmount(e.target.value)}
//                   type="number"
//                 />
//                 <Select value={editCurrency} onChange={(val) => setEditCurrency(val)} style={{ width: "100%" }}>
//                   <Option value="₾">₾</Option>
//                   <Option value="$">$</Option>
//                   <Option value="€">€</Option>
//                   <Option value="₽">₽</Option>
//                 </Select>
//               </Space>
//             </Modal>
//           </>
//         ) : (
//           <>
//             {taskList.map((task, index) => (
//               <Space key={index} style={{ display: "flex", width: "100%" }}>
//                 <Checkbox checked={task.completed} onChange={() => handleCheck(index)} />
//                 <Input
//                   value={task.text}
//                   onChange={(e) => {
//                     const updated = [...taskList];
//                     updated[index].text = e.target.value;
//                     setTaskList(updated);
//                   }}
//                 />
//                 <Button onClick={() => handleDeleteTask(index)}>Удалить</Button>
//               </Space>
//             ))}

//             <Space>
//               <Input
//                 value={newTask}
//                 onChange={(e) => setNewTask(e.target.value)}
//                 placeholder="Новая задача"
//               />
//               <Button onClick={handleAddTask}>Добавить</Button>
//             </Space>
//             {taskList.length > 0 && <Progress percent={Math.round(taskProgress)} />}
//           </>
//         )}
//                 <Button onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}>
//           {isColorPickerVisible ? "Скрыть палитру" : "Выбрать цвет"}
//         </Button>

//         {isColorPickerVisible && (
//           <div
//             style={{
//               position: "absolute",
//               zIndex: 1000,
//               top: 50,
//               left: 50,
//               background: "#fff",
//               boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//               borderRadius: 8,
//               padding: 8,
//             }}
//           >
//             <button
//               onClick={() => setIsColorPickerVisible(false)}
//               style={{
//                 position: "absolute",
//                 top: -19,
//                 right: -5,
//                 background: "transparent",
//                 border: "none",
//                 fontSize: 35,
//                 cursor: "pointer",
//                 color: "#333",
//               }}
//             >
//               ×
//             </button>
//             <SketchPicker
//               color={selectedColor}
//               onChangeComplete={(color) => setSelectedColor(color.hex)}
//             />
//           </div>
//         )}
//       </Space>

//     </div>
//   );
// };

// export default Block;
// // import React, { useEffect, useState } from "react";
// // import { doc, updateDoc } from "firebase/firestore";
// // import { db } from "../firebase";
// // import {
// //   Input,
// //   Button,
// //   Checkbox,
// //   DatePicker,
// //   Space,
// //   Progress,
// //   Select,
// //   List,
// //   Modal,
// // } from "antd";
// // import { SketchPicker } from "react-color";
// // import moment from "moment";

// // const { Option } = Select;

// // const Block = ({ block, pageId, onDelete }) => {
// //   const {
// //     id,
// //     title,
// //     tasks,
// //     color,
// //     deadline,
// //     goalType,
// //     goalAmount,
// //     contributions = [],
// //   } = block;

// //   const [blockTitle, setBlockTitle] = useState(title || "");
// //   const [taskList, setTaskList] = useState(tasks || []);
// //   const [newTask, setNewTask] = useState("");
// //   const [selectedColor, setSelectedColor] = useState(color || "#ffffff");
// //   const [selectedDate, setSelectedDate] = useState(
// //     deadline ? moment(deadline.toDate?.() || deadline) : null
// //   );
// //   const [goalSum, setGoalSum] = useState(goalAmount || 0);
// //   const [newContributionAmount, setNewContributionAmount] = useState("");
// //   const [newCurrency, setNewCurrency] = useState("₾");
// //   const [history, setHistory] = useState(contributions);
// //   const [editingIndex, setEditingIndex] = useState(null);
// //   const [editAmount, setEditAmount] = useState("");
// //   const [editCurrency, setEditCurrency] = useState("");

// //   useEffect(() => {
// //     const update = async () => {
// //       try {
// //         await updateDoc(doc(db, "pages", pageId, "blocks", id), {
// //           title: blockTitle,
// //           tasks: taskList,
// //           color: selectedColor,
// //           deadline: moment.isMoment(selectedDate)
// //             ? selectedDate.toDate()
// //             : null,
// //           goalAmount: goalSum,
// //           contributions: history,
// //         });
// //       } catch (error) {
// //         console.error("Ошибка при обновлении блока:", error);
// //       }
// //     };
// //     update();
// //   }, [
// //     blockTitle,
// //     taskList,
// //     selectedColor,
// //     selectedDate,
// //     goalSum,
// //     history,
// //     pageId,
// //     id,
// //   ]);

// //   // Tasks
// //   const handleAddTask = () => {
// //     if (!newTask.trim()) return;
// //     setTaskList([...taskList, { text: newTask, completed: false }]);
// //     setNewTask("");
// //   };

// //   const handleCheck = (idx) => {
// //     const updated = [...taskList];
// //     updated[idx].completed = !updated[idx].completed;
// //     setTaskList(updated);
// //   };

// //   const handleDeleteTask = (idx) => {
// //     const updated = [...taskList];
// //     updated.splice(idx, 1);
// //     setTaskList(updated);
// //   };

// //   const taskProgress =
// //     taskList.length > 0
// //       ? (taskList.filter((t) => t.completed).length / taskList.length) * 100
// //       : 0;

// //   // Finance
// //   const totalInBaseCurrency = history
// //     .filter((c) => c.currency === newCurrency)
// //     .reduce((sum, c) => sum + Number(c.amount), 0);

// //   const financeProgress = goalSum > 0 ? (totalInBaseCurrency / goalSum) * 100 : 0;

// //   const handleAddContribution = () => {
// //     const amount = parseFloat(newContributionAmount);
// //     if (!amount || amount <= 0) return;
// //     const newEntry = {
// //       amount,
// //       currency: newCurrency,
// //       date: moment().format("YYYY-MM-DD"),
// //     };
// //     setHistory((prev) => [...prev, newEntry]);
// //     setNewContributionAmount("");
// //   };

// //   const handleDeleteContribution = (index) => {
// //     const updated = [...history];
// //     updated.splice(index, 1);
// //     setHistory(updated);
// //   };

// //   const openEditModal = (index) => {
// //     setEditingIndex(index);
// //     setEditAmount(history[index].amount);
// //     setEditCurrency(history[index].currency);
// //   };

// //   const handleSaveEdit = () => {
// //     const updated = [...history];
// //     updated[editingIndex] = {
// //       ...updated[editingIndex],
// //       amount: parseFloat(editAmount),
// //       currency: editCurrency,
// //     };
// //     setHistory(updated);
// //     setEditingIndex(null);
// //   };

// //   return (
// //     <div
// //       style={{
// //         background: selectedColor,
// //         padding: 16,
// //         marginBottom: 12,
// //         borderRadius: 8,
// //         position: "relative",
// //       }}
// //     >
// //       <Space direction="vertical" style={{ width: "100%" }}>
// //         <Input
// //           value={blockTitle}
// //           onChange={(e) => setBlockTitle(e.target.value)}
// //           placeholder="Заголовок"
// //         />

// //         {goalType === "finance" ? (
// //           <>
// //             <Input
// //               type="number"
// //               value={goalSum}
// //               onChange={(e) => setGoalSum(Number(e.target.value))}
// //               placeholder="Сумма цели"
// //             />

// //             <Progress percent={Math.min(financeProgress, 100)} />

// //             <Space>
// //               <Input
// //                 value={newContributionAmount}
// //                 onChange={(e) => setNewContributionAmount(e.target.value)}
// //                 placeholder="Сумма взноса"
// //                 type="number"
// //               />
// //               <Select
// //                 value={newCurrency}
// //                 onChange={(val) => setNewCurrency(val)}
// //                 style={{ width: 80 }}
// //               >
// //                 <Option value="₾">₾</Option>
// //                 <Option value="$">$</Option>
// //                 <Option value="€">€</Option>
// //               </Select>
// //               <Button onClick={handleAddContribution}>Добавить взнос</Button>
// //             </Space>

// //             <List
// //               header="История взносов"
// //               dataSource={history}
// //               renderItem={(item, index) => (
// //                 <List.Item
// //                   actions={[
// //                     <a onClick={() => openEditModal(index)}>Редактировать</a>,
// //                     <a onClick={() => handleDeleteContribution(index)}>Удалить</a>,
// //                   ]}
// //                 >
// //                   {item.amount} {item.currency} — {item.date}
// //                 </List.Item>
// //               )}
// //             />

// //             <Modal
// //               open={editingIndex !== null}
// //               title="Редактировать взнос"
// //               onCancel={() => setEditingIndex(null)}
// //               onOk={handleSaveEdit}
// //             >
// //               <Input
// //                 type="number"
// //                 value={editAmount}
// //                 onChange={(e) => setEditAmount(e.target.value)}
// //               />
// //               <Select
// //                 value={editCurrency}
// //                 onChange={(val) => setEditCurrency(val)}
// //                 style={{ width: 100, marginTop: 8 }}
// //               >
// //                 <Option value="₾">₾</Option>
// //                 <Option value="$">$</Option>
// //                 <Option value="€">€</Option>
// //               </Select>
// //             </Modal>
// //           </>
// //         ) : (
// //           <>
// //             {taskProgress > 0 && (
// //               <>
// //                 <Progress percent={Math.round(taskProgress)} />
// //               </>
// //             )}

// //             {taskList.map((task, index) => (
// //               <Space key={index} style={{ display: "flex", width: "100%" }}>
// //                 <Checkbox
// //                   checked={task.completed}
// //                   onChange={() => handleCheck(index)}
// //                 />
// //                 <Input
// //                   value={task.text}
// //                   onChange={(e) => {
// //                     const updated = [...taskList];
// //                     updated[index].text = e.target.value;
// //                     setTaskList(updated);
// //                   }}
// //                 />
// //                 <Button onClick={() => handleDeleteTask(index)}>Удалить</Button>
// //               </Space>
// //             ))}

// //             <Space>
// //               <Input
// //                 value={newTask}
// //                 onChange={(e) => setNewTask(e.target.value)}
// //                 placeholder="Новая задача"
// //               />
// //               <Button onClick={handleAddTask}>Добавить</Button>
// //             </Space>
// //           </>
// //         )}

// //         <Space>
// //           <DatePicker
// //             value={selectedDate}
// //             onChange={(date) =>
// //               setSelectedDate(date ? moment(date.toDate?.() || date) : null)
// //             }
// //             placeholder="Срок"
// //           />
// //           <Button danger onClick={onDelete}>
// //             Удалить блок
// //           </Button>
// //         </Space>

// //         <SketchPicker
// //           color={selectedColor}
// //           onChangeComplete={(color) => setSelectedColor(color.hex)}
// //         />
// //       </Space>
// //     </div>
// //   );
// // };

// // export default Block;
// // import React, { useEffect, useState } from "react";
// // import { doc, updateDoc } from "firebase/firestore";
// // import { db } from "../firebase";
// // import {
// //   Input,
// //   Button,
// //   Checkbox,
// //   DatePicker,
// //   Space,
// //   Progress,
// //   Select,
// //   List,
// //   Modal,
// // } from "antd";
// // import { SketchPicker } from "react-color";
// // import moment from "moment";

// // const { Option } = Select;

// // const Block = ({ block, pageId, onDelete }) => {
// //   const {
// //     id,
// //     title,
// //     tasks,
// //     color,
// //     deadline,
// //     goalType,
// //     goalAmount,
// //     contributions = [],
// //   } = block;

// //   const [blockTitle, setBlockTitle] = useState(title || "");
// //   const [taskList, setTaskList] = useState(tasks || []);
// //   const [newTask, setNewTask] = useState("");
// //   const [selectedColor, setSelectedColor] = useState(color || "#ffffff");
// //   const [selectedDate, setSelectedDate] = useState(
// //     deadline ? moment(deadline.toDate?.() || deadline) : null
// //   );
// //   const [goalSum, setGoalSum] = useState(goalAmount || 0);
// //   const [newContributionAmount, setNewContributionAmount] = useState("");
// //   const [newCurrency, setNewCurrency] = useState("₾");
// //   const [history, setHistory] = useState(contributions);
// //   const [editingIndex, setEditingIndex] = useState(null);
// //   const [editAmount, setEditAmount] = useState("");
// //   const [editCurrency, setEditCurrency] = useState("");
// //   const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

// //   useEffect(() => {
// //     const update = async () => {
// //       try {
// //         await updateDoc(doc(db, "pages", pageId, "blocks", id), {
// //           title: blockTitle,
// //           tasks: taskList,
// //           color: selectedColor,
// //           deadline: moment.isMoment(selectedDate)
// //             ? selectedDate.toDate()
// //             : null,
// //           goalAmount: goalSum,
// //           contributions: history,
// //         });
// //       } catch (error) {
// //         console.error("Ошибка при обновлении блока:", error);
// //       }
// //     };
// //     update();
// //   }, [
// //     blockTitle,
// //     taskList,
// //     selectedColor,
// //     selectedDate,
// //     goalSum,
// //     history,
// //     pageId,
// //     id,
// //   ]);

// //   // Tasks
// //   const handleAddTask = () => {
// //     if (!newTask.trim()) return;
// //     setTaskList([...taskList, { text: newTask, completed: false }]);
// //     setNewTask("");
// //   };

// //   const handleCheck = (idx) => {
// //     const updated = [...taskList];
// //     updated[idx].completed = !updated[idx].completed;
// //     setTaskList(updated);
// //   };

// //   const handleDeleteTask = (idx) => {
// //     const updated = [...taskList];
// //     updated.splice(idx, 1);
// //     setTaskList(updated);
// //   };

// //   const taskProgress =
// //     taskList.length > 0
// //       ? (taskList.filter((t) => t.completed).length / taskList.length) * 100
// //       : 0;

// //   // Finance
// //   const totalInBaseCurrency = history
// //     .filter((c) => c.currency === newCurrency)
// //     .reduce((sum, c) => sum + Number(c.amount), 0);

// //   const financeProgress = goalSum > 0 ? (totalInBaseCurrency / goalSum) * 100 : 0;

// //   const handleAddContribution = () => {
// //     const amount = parseFloat(newContributionAmount);
// //     if (!amount || amount <= 0) return;
// //     const newEntry = {
// //       amount,
// //       currency: newCurrency,
// //       date: moment().format("YYYY-MM-DD"),
// //     };
// //     setHistory((prev) => [...prev, newEntry]);
// //     setNewContributionAmount("");
// //   };

// //   const handleDeleteContribution = (index) => {
// //     const updated = [...history];
// //     updated.splice(index, 1);
// //     setHistory(updated);
// //   };

// //   const openEditModal = (index) => {
// //     setEditingIndex(index);
// //     setEditAmount(history[index].amount);
// //     setEditCurrency(history[index].currency);
// //   };

// //   const handleSaveEdit = () => {
// //     const updated = [...history];
// //     updated[editingIndex] = {
// //       ...updated[editingIndex],
// //       amount: parseFloat(editAmount),
// //       currency: editCurrency,
// //     };
// //     setHistory(updated);
// //     setEditingIndex(null);
// //   };

// //   return (
// //     <div
// //       style={{
// //         background: selectedColor,
// //         padding: 16,
// //         marginBottom: 12,
// //         borderRadius: 8,
// //         position: "relative",
// //       }}
// //     >
// //       <Space direction="vertical" style={{ width: "100%" }}>
// //         <Input
// //           value={blockTitle}
// //           onChange={(e) => setBlockTitle(e.target.value)}
// //           placeholder="Заголовок"
// //         />

// //         {goalType === "finance" ? (
// //           <>
// //             <Input
// //               type="number"
// //               value={goalSum}
// //               onChange={(e) => setGoalSum(Number(e.target.value))}
// //               placeholder="Сумма цели"
// //             />

// //             <Progress percent={Math.min(financeProgress, 100)} />

// //             <Space>
// //               <Input
// //                 value={newContributionAmount}
// //                 onChange={(e) => setNewContributionAmount(e.target.value)}
// //                 placeholder="Сумма взноса"
// //                 type="number"
// //               />
// //               <Select
// //                 value={newCurrency}
// //                 onChange={(val) => setNewCurrency(val)}
// //                 style={{ width: 80 }}
// //               >
// //                 <Option value="₾">₾</Option>
// //                 <Option value="$">$</Option>
// //                 <Option value="€">€</Option>
// //               </Select>
// //               <Button onClick={handleAddContribution}>Добавить взнос</Button>
// //             </Space>

// //             <List
// //               header="История взносов"
// //               dataSource={history}
// //               renderItem={(item, index) => (
// //                 <List.Item
// //                   actions={[
// //                     <a onClick={() => openEditModal(index)}>Редактировать</a>,
// //                     <a onClick={() => handleDeleteContribution(index)}>Удалить</a>,
// //                   ]}
// //                 >
// //                   {item.amount} {item.currency} — {item.date}
// //                 </List.Item>
// //               )}
// //             />

// //             <Modal
// //               open={editingIndex !== null}
// //               title="Редактировать взнос"
// //               onCancel={() => setEditingIndex(null)}
// //               onOk={handleSaveEdit}
// //             >
// //               <Input
// //                 type="number"
// //                 value={editAmount}
// //                 onChange={(e) => setEditAmount(e.target.value)}
// //               />
// //               <Select
// //                 value={editCurrency}
// //                 onChange={(val) => setEditCurrency(val)}
// //                 style={{ width: 100, marginTop: 8 }}
// //               >
// //                 <Option value="₾">₾</Option>
// //                 <Option value="$">$</Option>
// //                 <Option value="€">€</Option>
// //               </Select>
// //             </Modal>
// //           </>
// //         ) : (
// //           <>
// //             {taskProgress > 0 && (
// //               <>
// //                 <Progress percent={Math.round(taskProgress)} />
// //               </>
// //             )}

// //             {taskList.map((task, index) => (
// //               <Space key={index} style={{ display: "flex", width: "100%" }}>
// //                 <Checkbox
// //                   checked={task.completed}
// //                   onChange={() => handleCheck(index)}
// //                 />
// //                 <Input
// //                   value={task.text}
// //                   onChange={(e) => {
// //                     const updated = [...taskList];
// //                     updated[index].text = e.target.value;
// //                     setTaskList(updated);
// //                   }}
// //                 />
// //                 <Button onClick={() => handleDeleteTask(index)}>Удалить</Button>
// //               </Space>
// //             ))}

// //             <Space>
// //               <Input
// //                 value={newTask}
// //                 onChange={(e) => setNewTask(e.target.value)}
// //                 placeholder="Новая задача"
// //               />
// //               <Button onClick={handleAddTask}>Добавить</Button>
// //             </Space>
// //           </>
// //         )}
// //                     <SketchPicker
// //               color={selectedColor}
// //               onChangeComplete={(color) => setSelectedColor(color.hex)}
// //             />
// //  {isColorPickerVisible && (
// //           <div style={{ position: "relative", zIndex: 10 }}>
// //             <button
// //               onClick={() => setIsColorPickerVisible(false)}
// //               style={{
// //                 position: "absolute",
// //                 top: 0,
// //                 right: 0,
// //                 background: "transparent",
// //                 border: "none",
// //                 fontSize: 20,
// //                 cursor: "pointer",
// //                 color: "#333",
// //               }}
// //             >
// //               ×
// //             </button>
// //             <SketchPicker
// //               color={selectedColor}
// //               onChangeComplete={(color) => setSelectedColor(color.hex)}
// //             />
// //           </div>
// //         )}
        
// //         <Space>
// //           <DatePicker
// //             value={selectedDate}
// //             onChange={(date) =>
// //               setSelectedDate(date ? moment(date.toDate?.() || date) : null)
// //             }
// //             placeholder="Срок"
// //           />
// //           <Button danger onClick={onDelete}>
// //             Удалить блок
// //           </Button>
// //         </Space>


// //       </Space>
// //     </div>
// //   );
// // };

// // export default Block;

import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Input, Button, Checkbox, DatePicker, Space, Progress, Select, List, Modal } from "antd";
import { SketchPicker } from "react-color";
import moment from "moment";

const { Option } = Select;

const Block = ({ block, pageId, onDelete }) => {
  const { id, type, title, tasks, color, deadline, goalType, goalAmount, contributions = [], dictionary = [] } = block;

  const [blockTitle, setBlockTitle] = useState(title || "");
  const [taskList, setTaskList] = useState(tasks || []);
  const [newTask, setNewTask] = useState("");
  const [selectedColor, setSelectedColor] = useState(color || "#ffffff");
  const [selectedDate, setSelectedDate] = useState(deadline ? moment(deadline) : null);
  const [goalSum, setGoalSum] = useState(goalAmount || 0);
  const [newContributionAmount, setNewContributionAmount] = useState("");
  const [newCurrency, setNewCurrency] = useState("₾");
  const [history, setHistory] = useState(contributions);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCurrency, setEditCurrency] = useState("");
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [dictionaryList, setDictionaryList] = useState(dictionary);

  useEffect(() => {
    const update = async () => {
      await updateDoc(doc(db, "pages", pageId, "blocks", id), {
        title: blockTitle,
        tasks: taskList,
        color: selectedColor,
        deadline: selectedDate ? selectedDate.toDate() : null,
        goalAmount: goalSum,
        contributions: history,
        dictionary: dictionaryList,
      });
    };
    update();
  }, [blockTitle, taskList, selectedColor, selectedDate, goalSum, history, dictionaryList]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTaskList([...taskList, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const handleCheck = (idx) => {
    const updated = [...taskList];
    updated[idx].completed = !updated[idx].completed;
    setTaskList(updated);
  };

  const handleDeleteTask = (idx) => {
    const updated = [...taskList];
    updated.splice(idx, 1);
    setTaskList(updated);
  };

  const taskProgress = taskList.length > 0 ? (taskList.filter((t) => t.completed).length / taskList.length) * 100 : 0;

  const totalInBaseCurrency = history.filter((c) => c.currency === newCurrency).reduce((sum, c) => sum + Number(c.amount), 0);

  const financeProgress = goalSum > 0 ? (totalInBaseCurrency / goalSum) * 100 : 0;

  const handleAddContribution = () => {
    const amount = parseFloat(newContributionAmount);
    if (!amount || amount <= 0) return;
    const newEntry = {
      amount,
      currency: newCurrency,
      date: moment().format("YYYY-MM-DD"),
    };
    setHistory((prev) => [...prev, newEntry]);
    setNewContributionAmount("");
  };

  const handleDeleteContribution = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditAmount(history[index].amount);
    setEditCurrency(history[index].currency);
  };

  const handleSaveEdit = () => {
    const updated = [...history];
    updated[editingIndex] = {
      ...updated[editingIndex],
      amount: parseFloat(editAmount),
      currency: editCurrency,
    };
    setHistory(updated);
    setEditingIndex(null);
  };

  const addDictionaryRow = () => {
    setDictionaryList([...dictionaryList, { word: "", translation: "" }]);
  };

  const updateDictionaryItem = (index, key, value) => {
    const updated = [...dictionaryList];
    updated[index][key] = value;
    setDictionaryList(updated);
  };

  const deleteDictionaryRow = (index) => {
    const updated = [...dictionaryList];
    updated.splice(index, 1);
    setDictionaryList(updated);
  };

  if (type === "dictionary") {
    return (
      <div style={{ background: selectedColor, padding: 16, marginBottom: 12, borderRadius: 8 }}>
        <Input value={blockTitle} onChange={(e) => setBlockTitle(e.target.value)} placeholder="Dictionary title" />
        <Button onClick={addDictionaryRow} style={{ marginTop: 10 }}>Add Word</Button>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            {dictionaryList.map((item, index) => (
              <Input
                key={`word-${index}`}
                value={item.word}
                onChange={(e) => updateDictionaryItem(index, "word", e.target.value)}
                placeholder={`Word ${index + 1}`}
                style={{ marginBottom: 8 }}
              />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            {dictionaryList.map((item, index) => (
              <div key={`translation-${index}`} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <Input
                  value={item.translation}
                  onChange={(e) => updateDictionaryItem(index, "translation", e.target.value)}
                  placeholder="Translation"
                />
                <Button danger onClick={() => deleteDictionaryRow(index)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: selectedColor, padding: 16, marginBottom: 12, borderRadius: 8, position: "relative" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          value={blockTitle}
          onChange={(e) => setBlockTitle(e.target.value)}
          placeholder="Block Title"
        />
        {/* Add other block types rendering here */}
      </Space>
    </div>
  );
};

export default Block;
