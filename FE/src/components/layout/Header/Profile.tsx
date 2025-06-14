import React, { useEffect, useRef, useState } from "react";
import userApi from "@/services/userApi";
import type { UserUpdateRequest, UserResponse } from "@/model/User";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<UserUpdateRequest>({
        username: "",
        firstName: "",
        lastName: "",
        dob: "",
    });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // <-- thêm ref
    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await userApi.getMyInfo();
                setUser(currentUser);
                setFormData({
                    username: currentUser.username ?? "",
                    firstName: currentUser.firstName ?? "",
                    lastName: currentUser.lastName ?? "",
                    dob: currentUser.dob ?? "",
                });
            } catch (error) {
                console.error("Failed to load user info", error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpdate = async () => {
        if (!user) return;
        setLoading(true);
        try {
            let updatedUser = user;

            if (file) {
                updatedUser = await userApi.uploadAvatar(file);
                setPreviewUrl(null);
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // reset file input
                }
            }

            const updated = await userApi.updateUser(formData);
            setUser({ ...updatedUser, ...updated });
            queryClient.invalidateQueries({ queryKey: ["me"] });
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

            {/* {(previewUrl || user?.avatarUrl) && (
                <div className="flex justify-center mb-4">
                    <img
                        src={previewUrl || `http://localhost:8080/api${user?.avatarUrl}`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Change Avatar</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef} // <- gán ref để reset
                />
            </div> */}
            <div className="flex justify-center mb-4">
                <div className="relative group">
                    <img
                        src={previewUrl || `http://localhost:8080/api${user?.avatarUrl}`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <label
                        htmlFor="avatar-upload"
                        className="absolute inset-0 bg-black bg-opacity-50 text-white text-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        Chọn ảnh
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your user name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your first name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your last name"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
            >
                {loading ? "Updating..." : "Update Profile"}
            </button>
        </div>
    );
};

export default Profile;
