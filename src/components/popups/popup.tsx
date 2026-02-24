interface PopupProps {
  imageSrc: string;
  alt?: string;
  onClose: () => void;
}

export default function Popup({ imageSrc, alt = "Popup image", onClose }: PopupProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content image-popup">
        <img src={imageSrc} alt={alt} className="popup-image" />

        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
