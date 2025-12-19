import React, { useState } from "react";
import { SignUpUser } from "../../api/login";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Input } from "@/components/ui/input";   // shadcn/ui input
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await SignUpUser(email, password,organizationName);
      setUser(data.user);
      alert(data.message);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.email}!</h2>
        <p className="text-gray-600">You have successfully logged in.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Login to Your Account
      </h2>

      {/* Email */}
      <div className="mb-6 relative">
        <Label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-6 relative">
        <Label
          htmlFor="password"
          className="block mb-2 font-medium text-gray-700"
        >
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* Organization Name */}
      <div className="mb-6 relative">
        <Label
          htmlFor="organizationName"
          className="block mb-2 font-medium text-gray-700"
        >
          Organization Name
        </Label>
        <div className="relative">
          <Input
            id="organizationName"
            type="text"
            placeholder="Your organization name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="mb-4 text-sm text-red-600 font-semibold">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[#7A1120] to-black text-white font-semibold hover:from-[#8b1a29] hover:to-gray-900 transition-colors"
      >
        SignUp
      </Button>
    </form>
  );
}

export default SignUp;
