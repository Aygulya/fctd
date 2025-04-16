// // // src/components/Welcome.js
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const Welcome = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div style={styles.container}>
// //       <h1>Добро пожаловать в Планер</h1>
// //       <p>Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить</p>
// //       <div style={styles.buttonGroup}>
// //         <button onClick={() => navigate('/register')} style={styles.button}>Регистрация</button>
// //         <button onClick={() => navigate('/login')} style={styles.button}>Вход</button>
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     textAlign: 'center',
// //     marginTop: '100px',
// //   },
// //   buttonGroup: {
// //     marginTop: '20px',
// //   },
// //   button: {
// //     margin: '10px',
// //     padding: '10px 20px',
// //     fontSize: '16px',
// //   }
// // };

// // export default Welcome;
// // src/components/Welcome.js
// import React, { useState } from 'react';
// import { Modal, Input, Button } from 'antd';
// import Register from './Register';
// import Login from './Login';

// const Welcome = () => {
//   const [isLoginVisible, setLoginVisible] = useState(false);
//   const [isRegisterVisible, setRegisterVisible] = useState(false);

//   return (
//     <div style={styles.container}>
//       <h1>Добро пожаловать в Планер</h1>
//       <p>Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить</p>
//       <div style={styles.buttonGroup}>
//         <button onClick={() => setRegisterVisible(true)} style={styles.button}>Регистрация</button>
//         <button onClick={() => setLoginVisible(true)} style={styles.button}>Вход</button>
//       </div>

//       {/* Модалка регистрации */}
//       <Modal
//         title="Регистрация"
//         open={isRegisterVisible}
//         onCancel={() => setRegisterVisible(false)}
//         footer={null}
//       >
//         <Input placeholder="Email" style={{ marginBottom: 10 }} />
//         <Input.Password placeholder="Пароль" style={{ marginBottom: 10 }} />
//         <Button type="primary" block>Зарегистрироваться</Button>
//       </Modal>

//       {/* Модалка входа */}
//       <Modal
//         title="Вход"
//         open={isLoginVisible}
//         onCancel={() => setLoginVisible(false)}
//         footer={null}
//       >
//         <Input placeholder="Email" style={{ marginBottom: 10 }} />
//         <Input.Password placeholder="Пароль" style={{ marginBottom: 10 }} />
//         <Button type="primary" block>Войти</Button>
//       </Modal>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '100px',
//   },
//   buttonGroup: {
//     marginTop: '20px',
//   },
//   button: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer'
//   }
// };

// export default Welcome;
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Register from './Register';
import Login from './Login';

const Welcome = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);

  return (
    <div style={styles.container}>
      <h1>Добро пожаловать в Планер</h1>
      <p>Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить</p>
      <div style={styles.buttonGroup}>
        <button onClick={() => setRegisterVisible(true)} style={styles.button}>
          Регистрация
        </button>
        <button onClick={() => setLoginVisible(true)} style={styles.button}>
          Вход
        </button>
      </div>

      {/* Модальное окно с формой регистрации */}
      <Modal
        title="Регистрация"
        open={isRegisterVisible}
        onCancel={() => setRegisterVisible(false)}
        footer={null}
      >
        <Register />
      </Modal>

      {/* Модальное окно с формой входа */}
      <Modal
        title="Вход"
        open={isLoginVisible}
        onCancel={() => setLoginVisible(false)}
        footer={null}
      >
        <Login />
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Welcome;
