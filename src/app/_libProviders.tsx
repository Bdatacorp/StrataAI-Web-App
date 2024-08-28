import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { ReactNode } from "react";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import theme from "./_theme";
import ReduxProvider from "@/lib/provider/reduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';

export default function LibProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <ToastContainer />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </ReduxProvider>
  );
}
