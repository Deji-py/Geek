"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        toastStyle={{
          fontSize: 14,
        }}
        transition={Bounce}
      />
    </Provider>
  );
}
