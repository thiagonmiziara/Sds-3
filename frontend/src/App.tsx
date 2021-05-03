import {Navbar} from "./components/Navbar";
import {DataTable} from "./components/DataTable";
import {Footer} from "./components/Footer";


function App() {
  return (
   <>
    <Navbar/>
    <div className="container">
      <DataTable/>
    </div>
    <Footer/>
   </>
  );
}

export default App;