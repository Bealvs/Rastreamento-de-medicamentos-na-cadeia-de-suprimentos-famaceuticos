import "./Timeline.css";

const Timeline = () => {
  const steps = [
    { id: 1, icon: "📦", label: "Recebido" }, // Ícone e descrição
    { id: 2, icon: "📝", label: "Processando" },
    { id: 3, icon: "🚚", label: "Transporte" },
    { id: 4, icon: "📬", label: "Entregue" },
  ];

  return (
    <div className="timeline-container">
      {steps.map((step, index) => (
        <div key={step.id} className="timeline-step">
          <div className="timeline-icon">{step.icon}</div>
          {index < steps.length - 1 && <div className="timeline-line"></div>}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
