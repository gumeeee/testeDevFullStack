import { AlertTriangle } from "lucide-react";
import { Button } from "./button";
import { Modal } from "./modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoading ? "Excluindo..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
