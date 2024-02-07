import DashboardForm from "@/components/dashboardForm/dashboardForm";
import DashboardLayout from "@/components/dashboardLayout/layout";
import Layout from "@/components/layout/layout";
import React from "react";

export default function Dashboard() {
	return (
		<DashboardLayout>
			<DashboardForm />
		</DashboardLayout>
	);
}

Dashboard.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
