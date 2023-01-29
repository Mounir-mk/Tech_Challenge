import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const toast = (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />
  );
  return (
    <div className="h-screen w-screen flex place-content-center relative">
      <div className="h-full w-full md:w-5/6  flex flex-col justify-between">
        <Header />
        <Main />
        <Footer />
      </div>
      {toast}
    </div>
  );
}

export default App;
