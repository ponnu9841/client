import Image from "next/image";
import Banner from "@/components/banner/banner";
import Layout from "@/components/layout/layout";
import UserList from "@/components/UserList/userList";

export default function Home() {
	return (
		<>
			<Banner />
			<div className="container mx-auto mt-24">
				<UserList />
			</div>
		</>
	);
}

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
