import { auth } from "../../client/firebase";

export const Home = () => {
  return(
    <div>
      <h2 className="text-4xl font-bold mb-4">Welcome to Guftagu</h2>
      <h2 className="text-4xl">{auth.currentUser.displayName}</h2>
    </div>
  );
}
