import React from "react";
import Button from "@/components/Button";

type DeleteFormProps = {
  handleConfirmDelete: () => void;
  handleCloseDeleteModal: () => void;
};

export default function DeleteForm({ handleConfirmDelete }: DeleteFormProps) {
  return (
    <div className="container px-4">
      <p className="text-sm mb-4">Are you sure you want to delete?</p>
      <div className="flex justify-end space-x-4 pt-4 pb-8">
        <Button
          onClick={handleConfirmDelete}
          title="Delete"
          bgColor="bg-warning-red"
        />
      </div>
    </div>
  );
}
