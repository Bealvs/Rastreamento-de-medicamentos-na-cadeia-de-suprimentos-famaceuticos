import "./Timeline.css";

const Timeline = ({
  steps = [
    { id: 1, icon: "📦", label: "Produto postado" },
    { id: 2, icon: "📝", label: "Produto em inspeção" },
    { id: 3, icon: "🚚", label: "Produto em transporte" },
    { id: 4, icon: "📬", label: "Produto entregue" },
  ],
  activeLabel = "",
}) => {
  return (
    <div className="timeline-container">
      {steps.map((step, index) => {
        console.log("Step Label:", step.label, "Active Label:", activeLabel); // Verifique os valores
        return (
          <div key={step.id} className="timeline-step">
            <div
              className={`timeline-icon ${
                step.label === activeLabel ? "active" : ""
              }`}
            >
              {step.icon}
            </div>
            {index < steps.length - 1 && <div className="timeline-line"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
