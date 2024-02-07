import "@/styles/globals.css";
import { Inter } from "next/font/google";

//redux
import { Provider } from "react-redux";
import store from "@/redux/store";
import GlobalState from "@/globalState/globalState";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<Provider store={store}>
			<GlobalState />
			<main className={`${inter.className}`}>
				{getLayout(<Component {...pageProps} />)}
			</main>
		</Provider>
	);
}
