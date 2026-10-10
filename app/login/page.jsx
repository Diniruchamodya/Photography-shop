import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="auth-page">

        <div className="auth-card">

          <div className="auth-heading">
            <p>WELCOME BACK</p>

            <h1>Login</h1>

            <span>
              Login to manage your photography bookings.
            </span>
          </div>

          <form>

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
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="primary-button auth-button"
            >
              Login
            </button>

          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <a href="/register">
              Create an account
            </a>
          </p>

        </div>

      </main>
    </>
  );
}