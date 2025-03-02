import { updateUser } from "@/services/userService";
import { getToken } from "@/services/authService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useAuth";

const EditProfile = () => {
  const { user, loading, error } = useUser();
  const token = getToken();
  const router = useRouter();

  // Prefilled state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
    });
  }, [user]);
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await updateUser(user.id, formData, token);
      alert("Profile updated successfully.");
      router.push("/profile"); // Redirect back to profile page
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-400">No user data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="text-white block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-white block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-white block mb-1">New Password (Optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-white block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
