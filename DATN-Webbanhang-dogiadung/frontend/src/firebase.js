import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Bạn PHẢI thêm dòng này

const firebaseConfig = {
    apiKey: "AIzaSyDDDVPxJFwOy1FQTdKDMXEpSU_b5Tx_xVs",
    authDomain: "homevibe-ba144.firebaseapp.com",
    projectId: "homevibe-ba144",
    storageBucket: "homevibe-ba144.firebasestorage.app",
    messagingSenderId: "596269501708",
    appId: "1:596269501708:web:4e2766c306a7b8d59f0d29",
    measurementId: "G-MKFX2XMMJC"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Khởi tạo và xuất auth để dùng cho trang Register/Login
export const auth = getAuth(app);
export default app;