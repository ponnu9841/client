import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import Router from "next/router";

export default function DashboardLayout({ children }) {
	const profileData = useSelector((state) => state.getProfileData);

	setTimeout(() => {
		if (!profileData) {
			Router.push("/");
		}
	}, 2000);

	if (profileData) {
		return (
			<div className="max-w-[1000px] mx-auto mt-8">
				<div className="flex space-x-8">
					<Sidebar />
					<div className="flex-1">{children}</div>
				</div>
			</div>
		);
	}
}
