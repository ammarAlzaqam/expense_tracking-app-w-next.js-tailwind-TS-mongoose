"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ConfirmDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: any;
  loadingText?: string;
}
export default function ConfirmDialog({
  children,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  loadingText = "Processing...",
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="z-[100] w-11/12 border-none shadow-accent-foreground bg-dark-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-light-1">{title}</AlertDialogTitle>
          <AlertDialogDescription className="max-xs:text-small text-light-2">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="form-btn bg-gray-1" disabled={loading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="form-btn bg-error text-white hover:bg-red-700"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? loadingText : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
