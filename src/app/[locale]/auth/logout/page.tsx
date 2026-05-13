"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Logout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoadingSpinner />
      <p className="text-lg text-blue-600">Signing out</p>
    </div>
  );
}
