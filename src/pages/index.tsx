import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalForm from "@/components/ModalForm";
import ModalYesNo from "@/components/ModalYesNo";

import api from "../services/api";

export default function Home() {
  const toast = useToast();
  const [consultas, setConsultas] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const [edit, setEdit] = useState(Boolean);

  const getConsultas = async () => {
    try {
      const response = await api.get("/consultas");
      const data = response.data;
      setConsultas(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConsultas();
  }, [setData]);

  return (
    <Box id="container" h="90vh" padding={2} bg="#3d6ab4" display="block">
      {isOpen && !edit && (
        <ModalYesNo
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
      {isOpen && edit && (
        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
      <Grid templateColumns="repeat(1)">
        <GridItem w="100%" mt={4} mb={4} display="flex" justifyContent="center">
          <Link href="/marcarConsulta">
            <Button colorScheme="blue">Marcar Consulta</Button>
          </Link>
        </GridItem>
      </Grid>
      {consultas.length === 0 ? (
        <GridItem >
        <Text fontSize="xl" paddingBottom={5} textAlign="center">
          Nenhum consulta encontrada. Clique em "Marcar Consulta" acima.
        </Text>
      </GridItem>
      ): "" }
      <Grid templateColumns="repeat(4, 1fr)" w="100%">
        {consultas.length === 0 ? (
          ""
        ) : (
          consultas.map((consulta) => (
            <GridItem w="100%">
              <Box
                bg="#275aa2"
                w="300px"
                h="200px"
                p={4}
                m={2}
                color="white"
                borderRadius={4}
                key={consulta.id}
              >
                <GridItem w="100%">Nome: {consulta.nome} </GridItem>
                <GridItem w="100%">
                  Especialidade: {consulta.especialidade.descricao}
                </GridItem>
                <GridItem w="100%">
                  Unidade: {consulta.unidade.descricao}
                </GridItem>
                <GridItem w="100%">
                  Data:{" "}
                  {new Date(consulta.dataConsulta)
                    .getDate()
                    .toString()
                    .padStart(2, "0") +
                    "/" +
                    (new Date(consulta.dataConsulta).getMonth() + 1)
                      .toString()
                      .padStart(2, "0") +
                    "/" +
                    new Date(consulta.dataConsulta).getFullYear()}
                </GridItem>
                <GridItem w="100%">
                  Horário:{" "}
                  {new Date(consulta.dataConsulta)
                    .getHours()
                    .toString()
                    .padStart(2, "0") +
                    ":" +
                    new Date(consulta.dataConsulta)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                </GridItem>
                <GridItem w="100%" textAlign="center" padding="10px">
                  <Button
                    colorScheme="blue"
                    mr={2}
                    onClick={() => [
                      setDataEdit({ consulta }),
                      onOpen(),
                      setEdit(true),
                    ]}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => [
                      setDataEdit({ consulta }),
                      onOpen(),
                      setEdit(false),
                    ]}
                  >
                    Excluir
                  </Button>
                </GridItem>
              </Box>
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
}
