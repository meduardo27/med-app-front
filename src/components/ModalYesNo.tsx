import api from "@/services/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Toast,
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";

export default function ModalYesNo({
  data,
  setData,
  dataEdit,
  setDataEdit,
  isOpen,
  onClose,
}: any) {
  const [consultaId, setConsultaId] = useState(dataEdit.consulta.id);
  const [dateFormat, setDateFormat] = useState("");
  const dtConsulta = new Date(dataEdit.consulta.dataConsulta);

  const handleDelete = async () => {
    try {
      await api.delete(`/consultas/${consultaId}`);
      Toast({
        title: "Salvo.",
        description: "Registro deletado com sucesso!",
        status: "success",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      Router.reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Consulta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Deseja excluir consulta marcada do dia{" "}
            {dtConsulta.getDate().toString().padStart(2, "0") +
              "/" +
              (dtConsulta.getMonth() + 1).toString().padStart(2, "0") +
              "/" +
              dtConsulta.getFullYear()}{" "}
            às{" "}
            {dtConsulta.getHours().toString().padStart(2, "0") +
              ":" +
              dtConsulta.getMinutes().toString().padStart(2, "0")}
            ?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleDelete}>
              Sim
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
