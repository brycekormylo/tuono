// "use client";
//
// import React, { createContext, useState, useContext, ReactNode } from "react";
//
// // import "react-native-url-polyfill/auto";
// import { createClient } from "@supabase/supabase-js";
//
// interface DatabaseContextProps {
//   database: string;
//   setDatabase: (newUser: string) => void;
// }
//
// const DatabaseContext = createContext<DatabaseContextProps | undefined>(
//   undefined,
// );
//
// interface DatabaseProviderProps {
//   children: ReactNode;
// }
//
// const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
//   const SUPABASE_URL = "https://ieiftifozorgibffahey.supabase.co";
//   const SUPABASE_ANON_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaWZ0aWZvem9yZ2liZmZhaGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MDAxNTMsImV4cCI6MjAzMzk3NjE1M30.VP9ter7xHIwn5s5dlrb74x4KXBj3kuz6NjOV_TJ7gZY";
//
//   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
//
//   const [database, setDatabase] = useState<string>("default");
//   return (
//     <DatabaseContext.Provider value={{ database, setDatabase }}>
//       {children}
//     </DatabaseContext.Provider>
//   );
// };
//
// const useDatabaseContext = () => {
//   const context = useContext(DatabaseContext);
//   if (!context) {
//     throw new Error(
//       "useDatabaseContext must be used within a DatabaseProvider",
//     );
//   }
// };
//
// export { DatabaseProvider, useDatabaseContext, DatabaseContext };
