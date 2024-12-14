// "use client";
//
// import { createContext, useEffect, useState, useContext } from "react";
// import type { InstaQLEntity, InstaQLParams } from "@instantdb/react";
// import { type AppSchema, useDatabase } from "./database";
// import { useAuth } from "./auth";
//
// export type AdminAccount = InstaQLEntity<AppSchema, "admins">;
//
// interface AccountContextProps {
// 	admin: AdminAccount;
// 	updateName: (updatedName: string) => void;
// 	updateHandle: (updatedHandle: string) => void;
// }
//
// const AccountContext = createContext<AccountContextProps | undefined>(
// 	undefined,
// );
//
// const AccountProvider = ({ children }: { children: React.ReactNode }) => {
// 	const { db } = useDatabase();
// 	const { user } = useAuth();
//
// 	const [admin, setAdmin] = useState<AdminAccount>({
// 		id: "",
// 		email: "",
// 		fullName: "",
// 		handle: "",
// 		created: "",
// 	});
//
// 	const query = {
// 		admins: {
// 			$: {
// 				where: {
// 					user: user,
// 				},
// 			},
// 		},
// 	} satisfies InstaQLParams<AppSchema>;
//
// 	const { data: adminInfo } = db.useQuery(query);
//
// 	// useEffect(() => {
// 	// 	user?.id && fetchAccount();
// 	// }, [user]);
//
// 	useEffect(() => {
// 		console.log(adminInfo);
// 		console.log(`${user} `);
// 		adminInfo?.admins[0] && setAdmin(adminInfo.admins[0]);
// 	}, [adminInfo]);
//
// 	const updateHandle = (newHandle: string) => {
// 		user && db.transact([db.tx.admins[user].update({ handle: newHandle })]);
// 	};
//
// 	const updateName = (updatedName: string) => {
// 		user && db.transact([db.tx.admins[user].update({ fullName: updatedName })]);
// 	};
//
// 	return (
// 		<AccountContext.Provider
// 			value={{
// 				admin,
// 				updateName,
// 				updateHandle,
// 			}}
// 		>
// 			{children}
// 		</AccountContext.Provider>
// 	);
// };
//
// const useAccount = () => {
// 	const context = useContext(AccountContext);
//
// 	if (!context) {
// 		throw new Error("useAccount must be used within a AccountProvider");
// 	}
// 	return context;
// };
//
// export { AccountProvider, useAccount };
