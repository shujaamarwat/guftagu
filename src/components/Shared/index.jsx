import { signInWithGoogle } from "../../config/firebase";

export const TopTitle = ({ title }) => {
  return <h1 className="text-lg font-medium mb-3">{title}</h1>;
};

export const GoogleButton = () => {
  return (
    <button
      type="button"
      className="w-full py-2 mt-4 bg-red-500 hover:bg-red-700 text-white rounded-md flex items-center justify-center"
      onClick={signInWithGoogle}
    >
      <i className="fab fa-google text-white mr-2"></i>
      Sign In with Google
    </button>
  );
};

export const FormInput = (props) => {
  let inputClass =
    "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <div className="mb-4">
      <label
        htmlFor={props.label}
        className="block text-gray-500 font-medium text-sm mb-2"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.label}
        className={inputClass}
        value={props.value}
        onChange={(e) => props.setFunction(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export const Alert = ({message}) => {
  return (
    <div
      class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <svg
        aria-hidden="true"
        class="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">{message}</span>
      </div>
    </div>
  );
};
