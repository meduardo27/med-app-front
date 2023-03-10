import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import api from "@/services/api";

import * as yup from "yup";

export default function ModalForm({
  data,
  setData,
  dataEdit,
  setDataEdit,
  isOpen,
  onClose,
}: any) {
  const DEFAULT_MESSAGE = "Campo Obrigatório";

  const initValues = {
    nome: "",
    dataNasc: "",
    numeroCelular: "",
    genero: "",
    dataConsulta: "",
    horarioConsulta: "",
    especialidade: "",
    unidade: "",
    profissional: "",
  };

  const [initialValue, setInitialValue] = useState(initValues);
  const [comboEspecialidade, setFieldEspecialidade] = useState<any[]>([]);
  const [comboUnidade, setFieldUnidade] = useState<any[]>([]);
  const [comboProfissional, setFieldProfissional] = useState<any[]>([]);
  const [idEspecialidade, setIdEspecialidade] = useState<any>(
    dataEdit.consulta.especialidade.id
  );
  const [idUnidade, setIdUnidade] = useState<any>(dataEdit.consulta.unidade.id);
  const [idProfissional, setIdProfissional] = useState<any>(
    dataEdit.consulta.profissional.id
  );
  const toast = useToast();

  const schema = yup.object().shape({
    nome: yup.string().required(DEFAULT_MESSAGE),
    dataNasc: yup.string().required(DEFAULT_MESSAGE),
    numeroCelular: yup.string().required(DEFAULT_MESSAGE),
    dataConsulta: yup.string().required(DEFAULT_MESSAGE),
    especialidade: yup.string().required(DEFAULT_MESSAGE),
    unidade: yup.string().required(DEFAULT_MESSAGE),
    profissional: yup.string().required(DEFAULT_MESSAGE),
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const getEspecialidades = async () => {
    try {
      const response = await api.get("/especialidades");
      const data = response.data;
      setFieldEspecialidade(data);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
      });
    }
  };

  const getUnidades = async () => {
    try {
      const response = await api.get("/unidades");
      const data = response.data;
      setFieldUnidade(data);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
      });
    }
  };
  const getProfissionais = async () => {
    try {
      const response = await api.get("/profissional");
      const data = response.data;
      setFieldProfissional(data);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
      });
    }
  };

  useEffect(() => {
    getEspecialidades();
    getUnidades();
    getProfissionais();
  }, []);

  useEffect(() => {
    reset(dataEdit);
  }, []);
  const dateFormat =
    new Date(dataEdit.consulta.dataConsulta).getFullYear() +
    "-" +
    (new Date(dataEdit.consulta.dataConsulta).getMonth() + 1)
      .toString()
      .padStart(2, "0") +
    "-" +
    new Date(dataEdit.consulta.dataConsulta).getDate() +
    " " +
    new Date(dataEdit.consulta.dataConsulta)
      .getHours()
      .toString()
      .padStart(2, "0") +
    ":" +
    new Date(dataEdit.consulta.dataConsulta)
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    ":" +
    new Date(dataEdit.consulta.dataConsulta)
      .getSeconds()
      .toString()
      .padStart(2, "0");

  const handleUpdate = async (data: any) => {
    try {
      await api.put(
        `/consultas/${dataEdit.consulta.id}/${idEspecialidade}/${idUnidade}/${idProfissional}`,
        data
      );
      onClose();
      toast({
        title: "Salvo.",
        description: "Sua consulta foi alterado com sucesso!",
        status: "success",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      Router.reload();
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="550px">
          <ModalHeader>Editar Consulta Marcada</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <Box w="100%">
                <FormControl mb={2}>
                  <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                  <Input
                    id="nome"
                    {...register("nome", { value: dataEdit.consulta.nome })}
                  />
                  {errors && errors.nome && (
                    <FormHelperText color="red">
                      {errors.nome.message && errors.nome.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <HStack spacing="4" mb={2}>
                <Box w="100%">
                  <FormControl mb={2}>
                    <FormLabel htmlFor="dataNasc">Data de Nascimento</FormLabel>
                    <Input
                      id="dataNasc"
                      type="date"
                      {...register("dataNasc", {
                        value: dataEdit.consulta.dataNasc,
                      })}
                    />
                    {errors && errors.dataNasc && (
                      <FormHelperText color="red">
                        {errors.dataNasc.message && errors.dataNasc.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box w="100%">
                  <FormControl mb={2}>
                    <FormLabel htmlFor="numeroCelular">Celular</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+55" />
                      <Input
                        type="tel"
                        id="numeroCelular"
                        {...register("numeroCelular", {
                          value: dataEdit.consulta.numeroCelular,
                        })}
                      />
                    </InputGroup>
                    {errors && errors.numeroCelular && (
                      <FormHelperText color="red">
                        {errors.numeroCelular.message &&
                          errors.numeroCelular.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <Box w="100%" mb={2}>
                <FormControl>
                  <FormLabel>Gênero</FormLabel>
                  <RadioGroup
                    defaultValue="Masculino"
                    value={dataEdit.consulta.genero}
                  >
                    <HStack spacing="24px">
                      <Radio
                        id="genero"
                        value="Masculino"
                        {...register("genero", {
                          value: dataEdit.consulta.genero,
                        })}
                      >
                        Masculino
                      </Radio>
                      <Radio
                        id="genero"
                        value="Feminino"
                        {...register("genero", {
                          value: dataEdit.consulta.genero,
                        })}
                      >
                        Feminino
                      </Radio>
                      <Radio
                        id="genero"
                        value="Outro"
                        {...register("genero", {
                          value: dataEdit.consulta.genero,
                        })}
                      >
                        Outro
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>
              <HStack spacing="4" mb={2}>
                <Box w="100%">
                  <FormControl>
                    <FormLabel htmlFor="dataConsulta">
                      Data da Consulta
                    </FormLabel>
                    <Input
                      id="dataConsulta"
                      type="datetime-local"
                      {...register("dataConsulta", {
                        value: dateFormat,
                      })}
                    />
                    {errors && errors.dataConsulta && (
                      <FormHelperText color="red">
                        {errors.dataConsulta.message &&
                          errors.dataConsulta.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <HStack spacing="4" mb={2}>
                <FormControl>
                  <FormLabel htmlFor="especialidade">Especialidade</FormLabel>
                  <Select
                    placeholder="Selecione a especialidade"
                    {...register("especialidade", {
                      value: dataEdit.consulta.profissional.id,
                    })}
                    value={idEspecialidade}
                    onChange={(e) => {
                      setIdEspecialidade(e.target.value);
                    }}
                  >
                    {comboEspecialidade.map((esp) => (
                      <option key={esp.id} value={esp.id}>
                        {esp.descricao}
                      </option>
                    ))}
                  </Select>
                  {errors && errors.especialidade && (
                    <FormHelperText color="red">
                      {errors.especialidade.message &&
                        errors.especialidade.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </HStack>
              <HStack spacing="4" mb={2}>
                <Box w="100%">
                  <FormControl>
                    <FormLabel htmlFor="profissional">Profissional</FormLabel>
                    <Select
                      placeholder="Selecione o profissional"
                      {...register("profissional", {
                        value: dataEdit.consulta.profissional.id,
                      })}
                      value={idProfissional}
                      onChange={(e) => setIdProfissional(e.target.value)}
                    >
                      {comboProfissional.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.nome}
                        </option>
                      ))}
                    </Select>
                    {errors && errors.profissional && (
                      <FormHelperText color="red">
                        {errors.profissional.message &&
                          errors.profissional.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box w="100%">
                  <FormControl>
                    <FormLabel htmlFor="unidade">Unidade</FormLabel>
                    <Select
                      placeholder="Selecione a unidade"
                      {...register("unidade", {
                        value: dataEdit.consulta.unidade.id,
                      })}
                      value={idUnidade}
                      onChange={(e) => setIdUnidade(e.target.value)}
                    >
                      {comboUnidade.map((unid) => (
                        <option key={unid.id} value={unid.id}>
                          {unid.descricao}
                        </option>
                      ))}
                    </Select>
                    {errors && errors.unidade && (
                      <FormHelperText color="red">
                        {errors.unidade.message && errors.unidade.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <HStack justify="center" mt={4}>
                <Button
                  leftIcon={<CheckCircleIcon />}
                  w={240}
                  p="6"
                  type="submit"
                  colorScheme="blue"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                >
                  Atualizar Consulta
                </Button>
              </HStack>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
