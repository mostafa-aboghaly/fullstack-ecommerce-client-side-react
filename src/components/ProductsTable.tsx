import {
  Box,
  Button,
  Flex,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import ProductRow from "./ProductRow";
import ProductFormModal from "./ProductFormModal";
import {
  useCreateDashboardProductMutation,
  useDeleteDashboardProductMutation,
  useGetCategoriesQuery,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
} from "../app/services/apiSlice";
import type { IFormInput, IProduct } from "../interfaces";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import CustomAlertDialog from "./ui/CustomAlertDialog";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { networkSelector } from "../app/features/networkSlice";
import CookieService from "../services/CookieService";

const ProductsTable = () => {
  const toast = useToast();
  /*-----STATES-----*/
  const { isOnline } = useSelector(networkSelector);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const { colorMode } = useColorMode();
  const [productToDelete, setProductToDelete] = useState<
    string | null | undefined
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const location = useLocation();
  const { isLoading, data } = useGetDashboardProductsQuery({ page });
  const { data: categoriesList } = useGetCategoriesQuery(undefined);

  const [deleteProduct, { isLoading: isLoadingDeleting, isSuccess }] =
    useDeleteDashboardProductMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductMutation();
  const [
    createProduct,
    { isLoading: isCreating, isSuccess: isCreatingSuccess },
  ] = useCreateDashboardProductMutation();

  /*-----HANDLERS-----*/
  const onChangeThumbnailHandler = useCallback((file: File | null): void => {
    setThumbnailFile(file);
  }, []);

  const handleCreateProduct = useCallback(() => {
    setSelectedProduct(null);
    setIsEditMode(false);
    setThumbnailFile(null);
    onModalOpen();
  }, [onModalOpen]);

  const handleEditProduct = useCallback(
    (prod: IProduct) => {
      setSelectedProduct(prod);
      setIsEditMode(true);
      setThumbnailFile(null);
      onModalOpen();
    },
    [onModalOpen],
  );

  const handleDeleteProduct = useCallback(
    (documentId: string | null | undefined) => {
      setProductToDelete(documentId);
      onOpen();
    },
    [onOpen],
  );

  const onSubmitHandler = useCallback(
    async (formData: IFormInput, file: File | null) => {
      try {
        const uploadedFileId = await uploadThumbnail_Internal(file);

        const productData = {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          category: formData.category || undefined,
          thumbnail: uploadedFileId ? { id: uploadedFileId } : undefined,
        };

        if (isEditMode && selectedProduct) {
          await updateProduct({
            id: selectedProduct.documentId,
            body: { data: productData },
          }).unwrap();

          toast({
            title: "Product updated successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else {
          await createProduct({
            body: { data: productData },
          }).unwrap();

          toast({
            title: "Product created successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });

        console.error(error);
      }
    },
    [isEditMode, selectedProduct, updateProduct, createProduct, toast],
  );

  const uploadThumbnail_Internal = async (
    file: File | null,
  ): Promise<number | null> => {
    if (!file) return null;

    const form = new FormData();
    form.append("files", file);
    form.append("ref", "api::product.product");
    form.append("field", "thumbnail");

    try {
      setIsThumbnailUploading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
          body: form,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const uploadData = await response.json();
      return uploadData[0]?.id || uploadData.id;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } finally {
      setIsThumbnailUploading(false);
    }
  };

  const products = data?.data || [];
  const pageCount = data?.meta?.pagination?.pageCount || 1;
  useEffect(() => {
    if (isSuccess) {
      setProductToDelete(null);
      onClose();
    }
    if (isUpdatingSuccess || isCreatingSuccess) {
      setSelectedProduct(null);
      setIsEditMode(false);
      setThumbnailFile(null);
      onModalClose();
    }
  }, [isSuccess, isUpdatingSuccess, isCreatingSuccess, onClose, onModalClose]);

  // Auto open modal if navigating from AdminDashboard based on `openCreateModal`
  useEffect(() => {
    if ((location.state as { openCreateModal: boolean })?.openCreateModal) {
      setSelectedProduct(null);
      setIsEditMode(false);
      setThumbnailFile(null);
      setTimeout(() => {
        onModalOpen();
      }, 200);
    }
  }, [location.state, onModalOpen]);
  if (isLoading || !isOnline) return <ProductsTableSkeleton />;

  return (
    <>
      <Flex direction={"column"} maxW={"85%"} mx={"auto"} my={6}>
        <Button
          colorScheme="purple"
          onClick={handleCreateProduct}
          ml={"auto"}
          w={"fit-content"}
        >
          Create Product
        </Button>
        {products.length === 0 ? (
          <Box textAlign={"center"} fontSize={"xl"}>
            No Products Found!
          </Box>
        ) : (
          <>
            <TableContainer maxW="85%" mx="auto" mt={10}>
              <Table variant="simple" size="md">
                <TableCaption color="gray.500">Products List</TableCaption>

                <Thead bg="gray.50">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Thumbnail</Th>
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>Stock</Th>
                    <Th textAlign="center">Actions</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {products.map((product: IProduct) => (
                    <ProductRow
                      key={product.documentId || product.id}
                      product={product}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                      colorMode={colorMode}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Stack
              direction="row"
              spacing={4}
              w={"fit-content"}
              mx={"auto"}
              my={4}
            >
              <Button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                leftIcon={<FaArrowLeftLong />}
                colorScheme="purple"
                variant="outline"
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                rightIcon={<FaArrowRightLong />}
                colorScheme="purple"
                variant="outline"
                disabled={page === pageCount}
              >
                Next
              </Button>
            </Stack>
          </>
        )}
        <CustomAlertDialog
          isOpen={isOpen}
          onClose={onClose}
          alertDialogHeader={"Are you sure?"}
          alertDialogBody={"Do you really want to delete this product?"}
          cancelText={"Cancel"}
          confirmText={"Yes, Delete"}
          onConfirmHandler={() => deleteProduct(productToDelete)}
          isLoading={isLoadingDeleting}
        />
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          onSubmit={onSubmitHandler}
          isLoading={isUpdating || isCreating || isThumbnailUploading}
          isEditMode={isEditMode}
          initialProduct={selectedProduct}
          categoriesList={categoriesList?.data || []}
          thumbnailFile={thumbnailFile}
          onThumbnailChange={onChangeThumbnailHandler}
        />
      </Flex>
    </>
  );
};
export default ProductsTable;
