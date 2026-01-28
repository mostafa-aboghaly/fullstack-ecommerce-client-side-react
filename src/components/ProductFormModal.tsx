import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import CustomModal from "./ui/CustomModal";
import type { IFormInput, IProduct } from "../interfaces";
import { useCallback, useEffect, useMemo } from "react";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: IFormInput, thumbnailFile: File | null) => void;
  isLoading: boolean;
  isEditMode: boolean;
  initialProduct: IProduct | null;
  categoriesList: Array<{ id: number; title: string; documentId: string }>;
  thumbnailFile: File | null;
  onThumbnailChange: (file: File | null) => void;
}

const ProductFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isEditMode,
  initialProduct,
  categoriesList = [],
  thumbnailFile,
  onThumbnailChange,
}: ProductFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<IFormInput>();

  // Resetting form when modal opens/closes
  useEffect(() => {
    if (isOpen && initialProduct) {
      setValue("title", initialProduct.title);
      setValue("description", initialProduct.description);
      setValue("price", initialProduct.price);
      setValue("stock", initialProduct.stock);
      setValue("category", initialProduct.category?.documentId || "");
    } else if (isOpen && !initialProduct) {
      // Restting form for creating product
      reset({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        thumbnail: undefined,
      });
    } else if (!isOpen) {
      // Resetting form when closing
      reset();
    }
  }, [isOpen, initialProduct, setValue, reset]);

  const onClose_Internal = useCallback(() => {
    onClose();
    reset();
    window.history.replaceState({}, "");
  }, [onClose, reset]);

  const onSubmitHandler: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      onSubmit(data, thumbnailFile);
    },
    [onSubmit, thumbnailFile],
  );

  const handleThumbnailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onThumbnailChange(file);
      }
    },
    [onThumbnailChange],
  );

  const categoryOptions = useMemo(
    () =>
      categoriesList?.map(
        (cat: { id: number; title: string; documentId: string }) => (
          <option key={cat.id} value={cat.documentId}>
            {cat.title}
          </option>
        ),
      ) || [],
    [categoriesList],
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose_Internal}
      modalHeader={isEditMode ? "Update product" : "Create product"}
      cancelText={"Cancel"}
      confirmText={isEditMode ? "Update" : "Create"}
      onConfirm={handleSubmit(onSubmitHandler)}
      isLoading={isLoading}
    >
      <FormControl mb={1} isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Product Title"
        />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={1} isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
          placeholder="Product Description"
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={1} isInvalid={!!errors.price}>
        <FormLabel htmlFor="price">Price</FormLabel>
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <NumberInput id="price" {...field} min={0} step={5}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
        <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={1} isInvalid={!!errors.stock}>
        <FormLabel htmlFor="stock">Stock</FormLabel>
        <Controller
          name="stock"
          control={control}
          rules={{ required: "Stock is required" }}
          render={({ field }) => (
            <NumberInput id="stock" {...field} min={0} step={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
        <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={1} isInvalid={!!errors.category}>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select
          id="category"
          {...register("category", { required: "Category is required" })}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categoryOptions}
        </Select>
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={1} isInvalid={!!errors.thumbnail}>
        <FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>
        <Input
          {...register("thumbnail", { required: false })}
          id="thumbnail"
          type="file"
          h={"full"}
          p={2}
          accept="image/png, image/gif, image/jpeg"
          onChange={handleThumbnailChange}
        />
        <FormErrorMessage>{errors.thumbnail?.message}</FormErrorMessage>
      </FormControl>
    </CustomModal>
  );
};

export default ProductFormModal;
