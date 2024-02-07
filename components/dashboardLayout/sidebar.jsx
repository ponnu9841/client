import React from "react";
import { FaUser } from "react-icons/fa";

export default function Sidebar() {
	return (
		<div className="flex-1 max-w-[250px] text-white">
			<div className="bg-neutral py-6 px-3 flex items-center space-x-3">
				<FaUser /> <span>My Account</span>
			</div>
			<div className="divider my-0"></div>
			<ul className="min-h-[80vh]">
				<li className="bg-slate-400 py-4 px-3">Dashboard</li>
			</ul>
		</div>
	);
}
