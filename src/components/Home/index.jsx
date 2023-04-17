import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logoutAction = (e) => {
    e.preventDefault()
    console.log("Here")
    // logout(e)
    signOut(auth).then(function() {
      navigate("/login")
      console.log("Sign Out Successful")
    }).catch(function(error) {
      console.log("Sign Out NOT Successful: ", error)
    });
  };

  return(
    <button type="button" className="bg-red-500 text-white p-2 rounded-full text-2xl p-[0.5em]" onClick = {(e) => logoutAction(e)}>
      Logout
    </button>
  );
}

export const Home = () => {
  return(
    <div>
      <LogoutButton/>
      <h2 className="text-4xl font-bold mb-4">Guftagu</h2>
    </div>
  );
}
