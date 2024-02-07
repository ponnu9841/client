import React from "react";
import Navbar from "./header";
import Footer from "./footer";
import axiosClient from "@/axios/axios-client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { profieDetails } from "@/redux/action/action";

export default function Layout({ children }) {
	const profileData = useSelector((state) => state.getProfileData);
	const dispatch = useDispatch();
	const router = useRouter();

	React.useEffect(() => {
		if (!profileData) {
			axiosClient
				.get("/user")
				.then((response) => {
					if (response.status == 401) {
						//unauthorized
						router.push("/");
					}
					if (response.status == 200) {
						if (response.data.status) {
							const profileData = {
								email: response.data.email,
								name: response.data.name,
								photo: response.data.photo,
								role: response.data.role,
							};
							dispatch(profieDetails({ profileData }));
						}
					} else {
						router.push("/");
					}
				})
				.catch((error) => {
					// router.push("/");
				});
		}
	}, []);

	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
