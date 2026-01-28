import { memo } from "react";
import { Flex, IconButton, Image, Td, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import type { IProduct } from "../interfaces";

interface ProductRowProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (documentId: string | null | undefined) => void;
  colorMode: string;
}

const ProductRow = memo(
  ({ product, onEdit, onDelete, colorMode }: ProductRowProps) => {
    const navigate = useNavigate();

    return (
      <Tr
        _hover={{
          bg: colorMode === "light" ? "gray.300" : "gray.700",
        }}
        transition="background 0.2s"
      >
        <Td fontSize="sm" color="gray.500">
          {product.id}
        </Td>

        <Td fontWeight="medium">{product.title}</Td>

        <Td color="gray.600">{product.category?.title ?? "-"}</Td>

        <Td>
          <Image
            src={`${product.thumbnail?.formats?.thumbnail?.url ?? product.thumbnail?.formats?.thumbnail?.url ?? "/placeholder.png"}`}
            alt={product.title}
            boxSize="40px"
            objectFit="cover"
            borderRadius="md"
          />
        </Td>

        <Td isNumeric={true}>${product.price}</Td>

        <Td isNumeric={true}>{product.stock}</Td>

        <Td>
          <Flex justify="center" gap={2}>
            <IconButton
              aria-label="View product"
              icon={<AiOutlineEye />}
              size="sm"
              variant="ghost"
              colorScheme="purple"
              onClick={() => navigate(`/product/${product.documentId}`)}
            />

            <IconButton
              aria-label="Edit product"
              icon={<FiEdit2 />}
              size="sm"
              variant="ghost"
              colorScheme="purple"
              onClick={() => onEdit(product)}
            />

            <IconButton
              aria-label="Delete product"
              icon={<BsTrash />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete(product.documentId)}
            />
          </Flex>
        </Td>
      </Tr>
    );
  },
);

ProductRow.displayName = "ProductRow";

export default ProductRow;
