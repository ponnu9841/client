import axiosClient from "@/axios/axios-client";
import React from "react";

export function getList(props) {
	const { pageNo, pageSize } = props;

	const [users, setUsers] = React.useState({
		loading: true,
		data: null,
		error: null,
	});

	React.useEffect(() => {
		let url = "/getUsers?pageSize=" + pageSize;
		if (pageNo && pageNo > 1) {
			url += "&page=" + pageNo;
		}
		axiosClient.get(url).then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					if (users?.data) {
						setUsers((prevState) => ({
							...prevState,
							data: {
								...prevState.data,
								data: [...prevState.data.data.concat(response.data.data.data)],
							},
						}));
					} else {
						setUsers((prevState) => ({
							...prevState,
							data: response.data.data,
						}));
					}
				}
			}
		});
	}, [pageNo]);

	return users;
}
