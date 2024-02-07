import axiosClient from "@/axios/axios-client";
import { profieDetails } from "@/redux/action/action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardForm() {
	const profileData = useSelector((state) => state.getProfileData);

	const nameRef = React.useRef(null);
	const imageRef = React.useRef(null);

	const dispatch = useDispatch();

	function handleFormSubmit(e) {
		e.preventDefault();

		const name = nameRef.current.value;

		const image = imageRef.current.files[0];

		const formData = new FormData();
		if (name) formData.append("name", name);
		if (image) formData.append("image", image);

		axiosClient.post("/updateProfile", formData).then((response) => {
			if (response?.status == 200) {
				if (response.data.status) {
					const profileData = {
						email: response.data.email,
						name: response.data.name,
						photo: response.data.photo,
						role: response.data.role,
					};
					alert("Update Success");
					dispatch(profieDetails({ profileData }));
				}
			}
		});
	}
	return (
		<>
			<h2 className="text-2xl">Profile Management</h2>
			<div className="mt-4">
				<form onSubmit={handleFormSubmit}>
					<div className="flex space-x-4">
						<div className="flex-1">
							<input
								type="Name"
								placeholder="Name"
								className="input w-full max-w-md bg-slate-100 input-primary mb-4"
								ref={nameRef}
								defaultValue={profileData?.name}
							/>
							<input
								type="Name"
								placeholder="Email"
								className="input w-full max-w-md bg-slate-100 input-primary mb-4"
								disabled
								defaultValue={profileData?.email}
							/>

							<input
								type="file"
								className="file-input w-full max-w-md mb-4"
								ref={imageRef}
							/>

							<div>
								<button className="btn btn-primary" type="submit">
									Update Profile
								</button>
							</div>
						</div>

						<div className="flex-1 max-w-[200px]">
							{profileData?.photo && (
								<img
									src={process.env.base_url + "images/" + profileData?.photo}
									alt=""
									className="max-w-[100px] rounded-full"
								/>
							)}
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
