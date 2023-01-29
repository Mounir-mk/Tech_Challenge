import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="h-screen w-screen flex place-content-center relative">
      <div className="h-full w-full md:w-5/6  flex flex-col justify-between">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
