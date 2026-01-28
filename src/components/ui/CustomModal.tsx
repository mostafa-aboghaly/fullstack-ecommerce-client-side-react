import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { memo, type ReactNode } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalHeader: string;
  children: ReactNode;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
  isLoading: boolean;
}
const CustomModal = ({
  isOpen,
  onClose,
  modalHeader,
  cancelText,
  confirmText,
  children,
  onConfirm,
  isLoading,
}: IProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg={"blackAlpha.500"}
        backdropFilter={"blur(5px) hue-rotate(90deg)"}
      />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            colorScheme="purple"
            onClick={onConfirm}
            type="submit"
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default memo(CustomModal);
