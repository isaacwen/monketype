import { Dispatch, SetStateAction, useState } from "react";
import { SHA256, enc } from "crypto-js";
import ButtonRow from "../components/ButtonRow";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { pageWrapper } from "../utils/helpers";

const SignInPage = ({
  setUser, navBack
}: {
  setUser: Dispatch<SetStateAction<string>>;
  navBack: () => void;
}) => {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const changeSigningIn = () => {
    setSigningIn(!signingIn);
    setShowErrorMessage(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;
    const password = hash((event.target as HTMLFormElement).password.value);
    let validSignIn = false;
    if (signingIn) {
      validSignIn = await api.verifyUser({username: username, password: password});
    } else {
      validSignIn = await api.addUser({username: username, password: password});
    }
    if (validSignIn) {
      setShowErrorMessage(false);
      setUser(username);
      navigate("/stats");
    } else {
      setShowErrorMessage(true);
    }
  }

  return (pageWrapper(
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <h2 className="text-primary-400 text-xl font-medium text-center">Sign in to save test results</h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <form className="space-y-4" onSubmit = {handleSubmit}>
            <input type="username" id="username" name="username" className="block w-full min-w-max bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = "Username"/>
            <input type="password" id="password" name="password" className="block w-full min-w-max bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = "Password"/>
            <h2 className="text-red-600 text-center">{showErrorMessage && (signingIn ? "Invalid username or password" : "Username already taken")}</h2>
            <button type="submit" className="block w-full min-w-max text-black bg-primary-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-500">{signingIn ? "Sign In" : "Create Account"}</button>
          </form>

          <p className="mt-10 text-center text-m text-gray-500">
            <button onClick={changeSigningIn} className="font-semibold leading-6 text-primary-400 hover:text-primary-500">{signingIn ? "Create a New Account" : "Sign into Existing Account"}</button>
          </p>
        </div>
        <ButtonRow
          buttonNames={["back"]}
          buttonHandles={[navBack]}
        />
      </div>
      
    </>
  ))
}

const hash = (s: string) => {
  return SHA256(s).toString(enc.Hex);
}

export default SignInPage;