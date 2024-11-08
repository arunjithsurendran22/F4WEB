import Profile from "@/page-components/profile/Profile";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
};

export default ProfilePage;
