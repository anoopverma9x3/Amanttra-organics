import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import "./Register.css";

function Register() {
  const { sendOtp, verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setError("");
    if (!phone) { setError("Please enter your mobile number"); return; }

    try {
      setLoading(true);
      const success = await sendOtp(phone);
      if (success) {
        setStep(2);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp) { setError("Please enter the OTP"); return; }

    try {
      setLoading(true);
      const success = await verifyOtp(phone, otp);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") action();
  };

  return (
    <div className="auth-page">

      {/* Left Panel — Brand */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <div className="auth-brand-logo">
            <FaLeaf />
          </div>
          <h2 className="auth-brand-name">Amanttra</h2>
          <p className="auth-brand-tagline">
            Pure. Natural. Organic.
          </p>
          <div className="auth-brand-divider" />
          <p className="auth-brand-desc">
            Join thousands who have made the switch to clean, chemical-free superfoods for a healthier life.
          </p>

          <div className="auth-brand-perks">
            <div className="auth-perk">🌿 100% Organic ingredients</div>
            <div className="auth-perk">🚚 Free shipping above ₹499</div>
            <div className="auth-perk">🔒 Safe & secure checkout</div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="auth-form-panel">
        <div className="auth-form-box">

          {/* Step indicator */}
          <div className="auth-steps">
            <div className={`auth-step ${step >= 1 ? "active" : ""}`}>
              <span className="auth-step-num">1</span>
              <span className="auth-step-label">Mobile</span>
            </div>
            <div className="auth-step-line" />
            <div className={`auth-step ${step >= 2 ? "active" : ""}`}>
              <span className="auth-step-num">2</span>
              <span className="auth-step-label">Verify</span>
            </div>
          </div>

          {/* Title */}
          <div className="auth-form-header">
            {step === 1 ? (
              <>
                <FaMobileAlt className="auth-form-icon" />
                <h1 className="auth-form-title">Login / Register</h1>
                <p className="auth-form-subtitle">Enter your mobile number to get started</p>
              </>
            ) : (
              <>
                <FaShieldAlt className="auth-form-icon" />
                <h1 className="auth-form-title">Verify OTP</h1>
                <p className="auth-form-subtitle">
                  OTP sent to <strong>+91 {phone}</strong>
                </p>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Step 1 — Phone */}
          {step === 1 && (
            <div className="auth-field-group">
              <div className="auth-input-wrap">
                <span className="auth-input-prefix">+91</span>
                <input
                  className="auth-input"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                  onKeyDown={(e) => handleKeyDown(e, handleSendOtp)}
                />
              </div>
              <button
                className="auth-btn"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? <span className="auth-spinner" /> : "Send OTP"}
              </button>
            </div>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <div className="auth-field-group">
              <input
                className="auth-input auth-input--otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                onKeyDown={(e) => handleKeyDown(e, handleVerifyOtp)}
              />
              <button
                className="auth-btn"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? <span className="auth-spinner" /> : "Verify & Continue"}
              </button>
              <button
                className="auth-resend"
                onClick={() => { setStep(1); setOtp(""); setError(""); }}
              >
                ← Change number
              </button>
            </div>
          )}

          <p className="auth-privacy">
            🔒 By continuing, you agree to our Terms & Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;