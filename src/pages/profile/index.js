import { useUser } from "@/hooks/useAuth";
import { deleteUser } from "@/services/userService";
import { getToken } from "@/services/authService";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { user, loading, error } = useUser();
  const token = getToken();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      await deleteUser(user.id, token);
      alert("Account deleted successfully.");
      router.push("/"); // Redirect to home after deletion
    } catch (err) {
      alert("Failed to delete account.");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-400">No user data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">User Profile</h2>

      <div className="p-4 bg-gray-800 rounded-md">
        <p className="text-white">
          <strong>ID:</strong> {user.id}
        </p>
        <p className="text-white">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-white">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-white">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-gray-400 text-sm">
          <strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => router.push("/profile/edit")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>

        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
