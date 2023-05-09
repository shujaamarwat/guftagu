// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../config/firebase";
import { Navbar } from "../Navbar";

export const Home = () => {
  return(
    <div>
      <Navbar/>
      <h2 className="text-4xl font-bold mb-4">Guftagu</h2>
    </div>
  );
}
