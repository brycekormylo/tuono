import { redirect } from "next/navigation";

export default function Records() {
	redirect("/admin/records/patients");
}
