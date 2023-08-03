// LoginFormUtils.ts

export function LoginFormVar(): {
  signUpLink: string;
  anotherLoginLink: string;
  anotherLogintxt: string;
  loginTitle: string;
  isLoginAdmin: boolean;
} {
  const signUpLink = location.pathname.includes("login-gallery")
    ? "/signup-gallery"
    : "/signup";
  const anotherLoginLink = location.pathname.includes("login-gallery")
    ? "/login"
    : "/login-gallery";
  const anotherLogintxt = location.pathname.includes("login-gallery")
    ? "Go to User Login"
    : "Go to Gallery Login";
  const loginTitle = location.pathname.includes("login-admin")
    ? "Admin Login"
    : location.pathname.includes("login-gallery")
    ? "Gallery Login"
    : "User Login";

  const isLoginAdmin = location.pathname.includes("login-admin");

  return {
    signUpLink,
    anotherLoginLink,
    anotherLogintxt,
    loginTitle,
    isLoginAdmin,
  };
}
