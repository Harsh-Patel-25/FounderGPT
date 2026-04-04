import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resetPassword } from "@/services/api";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      if (!token) throw new Error("Reset token is missing");
      
      await resetPassword(token, { password, confirmPassword });
      setSuccess(true);
      toast({
        title: "Password reset successful!",
        description: "You can now log in with your new password.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(error.response?.data?.message || "Failed to reset password. The link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Password Reset!</h1>
              <p className="text-muted-foreground">
                Your password has been successfully updated.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Button 
                  onClick={() => navigate("/login")} 
                  className="w-full h-12 text-lg font-semibold"
                >
                  Go to Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mt-4 mb-2">Set New Password</h1>
            <p className="text-muted-foreground">
              Please enter your new password below
            </p>
          </div>

          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl">New Password</CardTitle>

              <CardDescription>
                Make sure your new password is secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 font-medium">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 mt-4 text-lg font-semibold"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>

              <div className="mt-8 text-center sm:hidden">
                 <Link to="/login" className="text-primary hover:underline flex items-center justify-center gap-1 font-medium">
                   Back to Login
                 </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="hidden sm:block mt-6 text-center">
            <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 text-sm font-medium">
              Wait, I remember my password! <span className="text-primary">Sign In</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
