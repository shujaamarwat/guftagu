import { auth } from "../../config/firebase";

export const Home = () => {
  console.log(auth.currentUser)
  return(
    <div>
      <h2 className="text-4xl font-bold mb-4">Welcome to Guftagu,</h2>
      <h2 className="text-4xl">{auth.currentUser.displayName}</h2>
    </div>
  );
}
