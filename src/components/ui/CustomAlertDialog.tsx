import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  alertDialogHeader: string;
  alertDialogBody: string;
  cancelText: string;
  confirmText: string;
  onConfirmHandler: () => void;
}
export default function CustomAlertDialog({
  isOpen,
  onClose,
  isLoading,
  alertDialogHeader,
  alertDialogBody,
  cancelText = "No",
  confirmText = "Yes",
  onConfirmHandler,
}: IProps) {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{alertDialogHeader}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{alertDialogBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={onConfirmHandler}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
