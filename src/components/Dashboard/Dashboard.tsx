import { MantineProvider } from "@mantine/core";
import { useAuthStore } from "../Login/Store"; // Adjust the import path as needed
import DashboardNavbar from "./DashboardNavbar/DashboardNavbar";
import DashboardContent from "./DashboardContent/DashboardContent";
import { useEffect } from "react";

function Dashboard() {
  const { credentials, isAuthenticated } = useAuthStore();

  // Find the authenticated user's name
  const CurrentUser = credentials.find((cred) => isAuthenticated && cred.email);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("username", currentUser.name); // Save username to localStorage
    }
  }, [CurrentUser]);

  // Retrieve the stored user from localStorage
const storedUser = localStorage.getItem("currentUser");

// Parse the JSON string to get the user object (if it exists)
const currentUser = storedUser ? JSON.parse(storedUser) : null;

// Access the user's name (if the object exists and has a `name` property)
const username = currentUser ? currentUser.name : "Guest";
 // Retrieve the username from localStorage

  return (
    <div>
      <MantineProvider>
        <DashboardNavbar />
        <DashboardContent 
          initialUsername={username || "Guest"} // Pass stored username or Guest if none
          lastLoginTime={""} // Adjust this as needed
        />
      </MantineProvider>
    </div>
  );
}

export default Dashboard;
