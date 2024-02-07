import React from "react";
import { getList } from "./getList";
import { FaUser } from "react-icons/fa";

export default function UserList() {
	const pageSize = 5;
	const [pageNo, setPageNo] = React.useState(1);

	const users = getList({ pageNo, pageSize });

	let hideButton = pageNo == users?.data?.last_page ? true : false;

	return (
		<div className="max-w-[500px] mx-auto">
			{users?.data?.data?.length > 0 ? (
				<div>
					<h2 className="text-2xl text-center mb-4">Users List</h2>
					<ul className="flex flex-col ">
						{users?.data?.data?.map((item, index) => {
							let image = item?.photo;

							return (
								<React.Fragment key={index}>
									<li className="flex space-x-4 items-center py-3">
										<div className="min-w-[55px]">
											{image ? (
												<div className="aspect-square max-w-[50px] max-h-[50px]">
													<img
														className="rounded-1/2 object-contain "
														src={"http://localhost:8000/images/" + image}
														alt=""
													/>
												</div>
											) : (
												<FaUser className="text-2xl mx-auto" />
											)}
										</div>

										<div className="min-w-[55px]">
											<h2 className="text-xl leading-none">{item?.name}</h2>
											<div className="text-sm">{item?.email}</div>
										</div>
									</li>
									{index !== users?.data?.data?.length - 1 ? (
										<div className="divider"></div>
									) : null}
								</React.Fragment>
							);
						})}
					</ul>
				</div>
			) : null}
			{!hideButton && users?.data?.data?.length > 0 && (
				<div className="text-center mt-4">
					<button
						className="btn btn-primary btn-sm max-w-[200px] my-auto"
						onClick={() => setPageNo(pageNo + 1)}
					>
						Load More
					</button>
				</div>
			)}
		</div>
	);
}
