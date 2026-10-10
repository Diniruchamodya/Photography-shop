import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main className="auth-page">

        <div className="auth-card">

          <div className="auth-heading">
            <p>JOIN LENSCRAFT</p>

            <h1>Create Account</h1>

            <span>
              Create an account to book your photography sessions.
            </span>
          </div>

          <form>

            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="primary-button auth-button"
            >
              Create Account
            </button>

          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <a href="/login">
              Login
            </a>
          </p>

        </div>

      </main>
    </>
  );
}