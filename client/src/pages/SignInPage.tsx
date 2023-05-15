import { useState } from "react";
import ButtonRow from "../components/ButtonRow";
// import User from "../models/User";
import * as User from "../models/User";

// const User = require("../models/User").User;

interface FormElements extends HTMLFormControlsCollection {
  yourInputName: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
 readonly elements: FormElements
}

const SignInPage = ({
  user, navBack
}: {
  user: string | null;
  navBack: () => void;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signingIn, setSigningIn] = useState(true);

  const changeVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const changeSigningIn = () => {
    setSigningIn(!signingIn);
  }

  const handleError = (err: any) => {
    console.log(err);
  }

  async function handleSubmit(event: React.FormEvent) {
    await User.create({username: "joe", password: "joe"});
    // if (signingIn) {
    //   console.log(await User.findById({username: (event.target as HTMLFormElement).username.value}));
    // } else {

    //   // const newUser = new User({username: (event.target as HTMLFormElement).username.value, password: (event.target as HTMLFormElement).password.value});
    //   // newUser.save(function(err) {
    //   //   if (err) return handleError(err);
    //   // })
    //   await User.create({username: (event.target as HTMLFormElement).username.value, password: (event.target as HTMLFormElement).password.value})
    // }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <h2 className="text-primary-400 text-xl font-medium text-center">{signingIn ? "Sign in to save test results" : "Create an account to save test results"}</h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          

          <form className="space-y-6" onSubmit = {handleSubmit}>
            <input type="username" id="username" name="username" className="block w-full min-w-max bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = "Username"/>
            <input type="password" id="password" name="password" className="block w-full min-w-max bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = "Password"/>
            <button type="submit" className="block w-full min-w-max text-black bg-primary-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-500">{signingIn ? "Sign In" : "Create Account"}</button>
          </form>

          <p className="mt-10 text-center text-m text-gray-500">
            <a onClick={changeSigningIn} className="font-semibold leading-6 text-primary-400 hover:text-primary-500">{signingIn ? "Create a New Account" : "Sign into Existing Account"}</a>
          </p>
        </div>
        <ButtonRow
          buttonNames={["back"]}
          buttonHandles={[navBack]}
        />
      </div>
      
    </>
  )
}

export default SignInPage;