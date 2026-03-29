import { FaLeaf, FaFlask, FaHeart } from "react-icons/fa";
import "./WhyChooseUs.css";

const reasons = [
  {
    icon: <FaLeaf />,
    title: "100% Natural",
    text: "No chemicals, no fillers — just pure superfood powders sourced straight from nature.",
    tag: "Pure & Clean",
  },
  {
    icon: <FaFlask />,
    title: "Lab Tested",
    text: "Every batch is rigorously quality-checked for safety, purity, and nutritional value.",
    tag: "Quality Assured",
  },
  {
    icon: <FaHeart />,
    title: "Healthy Lifestyle",
    text: "Designed to boost immunity, energy, and daily nutrition for a healthier you.",
    tag: "Wellness First",
  },
];

function WhyChooseUs() {
  return (
    <section className="why">
      {/* Background decoration */}
      <div className="why-bg-circle why-bg-circle--left" />
      <div className="why-bg-circle why-bg-circle--right" />

      <div className="why-inner">
        {/* Header */}
        <div className="why-header">
          <span className="why-eyebrow">Our Promise</span>
          <h2 className="why-title">
            Why Choose <em>Amanttra</em>
          </h2>
          <p className="why-subtitle">
            We believe wellness starts with what you put in your body.
            That's why every Amanttra product is crafted with integrity.
          </p>
        </div>

        {/* Cards */}
        <div className="why-grid">
          {reasons.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-card-top">
                <div className="why-icon-wrap">{item.icon}</div>
                <span className="why-card-tag">{item.tag}</span>
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-text">{item.text}</p>
              <div className="why-card-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;