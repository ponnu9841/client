import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "@/redux/action/action";
import axiosClient from "@/axios/axios-client";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
	const profileData = useSelector((state) => state.getProfileData);

	const dispatch = useDispatch();
	const router = useRouter();

	function logout(e) {
		e.preventDefault();
		axiosClient.delete("/logout").then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					localStorage.removeItem("token");
					dispatch(logOut());
					router.push("/");
				}
			}
		});
	}

	return (
		<div className="navbar bg-base-100 py-3">
			<div className="flex-1">
				<Link href="/" className="btn btn-ghost text-xl">
					NavBar
				</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="form-control">
					<input
						type="text"
						placeholder="Search"
						className="input input-bordered w-24 md:w-auto input-sm"
					/>
				</div>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						{profileData?.photo ? (
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src={process.env.base_url + "images/" + profileData?.photo}
								/>
							</div>
						) : (
							<FaUser className="text-2xl" />
						)}
					</div>
					<ul
						tabIndex={0}
						className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-sm w-52"
					>
						{profileData ? (
							<>
								<li className="py-3 text-wrap">
									<div className="text-lg leading-none">
										{profileData?.name}
									</div>
									<div className="text-xs leading-none">
										{profileData?.email}
									</div>
								</li>
								<hr />
								<li className="py-3">
									<Link href={"/dashboard"}>Profile</Link>
								</li>
								<hr />
								<li className="py-3">
									<button className="text-red-500" onClick={logout}>
										<LuLogOut />
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link href="/login" className="justify-between">
										Login
										{/* <span className="badge">New</span> */}
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
