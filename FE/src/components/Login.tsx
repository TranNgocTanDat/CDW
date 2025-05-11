import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type AuthenticationReuquest from "@/model/Authentication";
import authApi from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log("Đăng nhập thành công", data);
      
      dispatch(loginSuccess({ token: data.token }));
      localStorage.setItem("token", data.token)
      navigate({ to: "/" });
    },
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Đăng nhập với", { username, password });
    event.preventDefault(); // Ngăn reload trang
    const authRequest: AuthenticationReuquest = { username, password };
    login.mutate(authRequest);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto mb-6 flex flex-col items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in to your account
        </p>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                // id="email"
                // type="email"
                // placeholder="name@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* /auth/forgot-password */}
                <Link to="/" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account? {/* auth/register */}
            <Link to="/" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default LoginPage;
function setAuth(arg0: { token: string; }): any {
  throw new Error("Function not implemented.");
}

