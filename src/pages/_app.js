import Footer from "@/components/templates/footer";
import Header from "@/components/templates/Header";
import { Provider } from "react-redux";
import store from "@/redux/store";
import RouteGuard from "@/services/RouteGuard";
import "@/styles/globals.css";
import { ToastProvider } from "@/services/ToastService";
import FloatingCart from "@/components/organisms/FloatingCart";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <ToastProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            <FloatingCart />
            <Footer />
          </div>
        </ToastProvider>
      </RouteGuard>
    </Provider>
  );
}
