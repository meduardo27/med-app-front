import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  RadioGroup,
  Radio,
  Button,
  Select,
  FormHelperText,
  useToast,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DEFAULT_MESSAGE, TEXT_BUTTON_MARCAR_CONSULTA } from "@/utils/strings";
import HeadPage from "@/components/HeadPage";
import Router from "next/router";
import api from "@/services/api";
import * as yup from "yup";

export default function MarcarConsulta() {
  const initValues = {
    nome: "",
    dataNasc: "",
    numeroCelular: "",
    genero: "",
    dataConsulta: "",
    especialidade: "",
    unidade: "",
    profissional: "",
  };

  const [initialValue, setInitialValue] = useState(initValues);
  const [comboEspecialidade, setFieldEspecialidade] = useState<any[]>([]);
  const [comboUnidade, setFieldUnidade] = useState<any[]>([]);
  const [comboProfissional, setFieldProfissional] = useState<any[]>([]);
  const [idEspecialidade, setIdEspecialidade] = useState<any>([]);
  const [idUnidade, setIdUnidade] = useState<any>([]);
  const [idProfissional, setIdProfissional] = useState<any>([]);

  const schema = yup.object().shape({
    nome: yup.string().required(DEFAULT_MESSAGE),
    dataNasc: yup.string().required(DEFAULT_MESSAGE),
    numeroCelular: yup.string().required(DEFAULT_MESSAGE),
    dataConsulta: yup.string().required(DEFAULT_MESSAGE),
    especialidade: yup.string().required(DEFAULT_MESSAGE),
    unidade: yup.string().required(DEFAULT_MESSAGE),
    profissional: yup.string().required(DEFAULT_MESSAGE),
  });

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      console.log(error);
    }
  };

  const getUnidades = async () => {
    try {
      const response = await api.get("/unidades");
      const data = response.data;
      setFieldUnidade(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProfissionais = async () => {
    try {
      const response = await api.get("/profissional");
      const data = response.data;
      setFieldProfissional(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEspecialidades();
    getUnidades();
    getProfissionais();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await api.post(
        "/consultas/" +
          idEspecialidade +
          "/" +
          idUnidade +
          "/" +
          idProfissional,
        data
      );
      Router.push("/");
      toast({
        title: "Salvo.",
        description: "Sua consulta foi marcada com sucesso!",
        status: "success",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <>
      <HeadPage title="Marcar Consulta - Clínica Médica Paraná" />
      <Box h="100vh">
        <Flex align="center" bg="#6a8bd9" justify="center" h="100%">
          <Center
            w="100%"
            maxW={840}
            bg="white"
            top={100}
            position="absolute"
            borderRadius={5}
            p="6"
            mt={10}
            boxShadow="0 1px 2px #ccc"
          >
            <form onSubmit={handleSubmit(handleCreate)}>
              <Box w="100%">
                <FormControl mb={2}>
                  <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                  <Input id="nome" {...register("nome")} />
                  {errors && errors.nome && (
                    <FormHelperText color="red">
                      {errors.nome.message && errors.nome.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box w="100%">
                <FormControl mb={2}>
                  <FormLabel htmlFor="dataNasc">Data de Nascimento</FormLabel>
                  <Input id="dataNasc" type="date" {...register("dataNasc")} />
                  {errors && errors.dataNasc && (
                    <FormHelperText color="red">
                      {errors.dataNasc.message && errors.dataNasc.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <HStack spacing="4">
                <Box w="100%">
                  <FormControl mb={2}>
                    <FormLabel htmlFor="numeroCelular">Celular</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+55" />
                      <Input
                        id="numeroCelular"
                        {...register("numeroCelular")}
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
                <Box w="100%">
                  <FormControl>
                    <FormLabel>Gênero</FormLabel>
                    <RadioGroup defaultValue="Masculino">
                      <HStack spacing="24px">
                        <Radio
                          id="genero"
                          value="Masculino"
                          {...register("genero")}
                        >
                          Masculino
                        </Radio>
                        <Radio
                          id="genero"
                          value="Feminino"
                          {...register("genero")}
                        >
                          Feminino
                        </Radio>
                        <Radio
                          id="genero"
                          value="Outro"
                          {...register("genero")}
                        >
                          Outro
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                </Box>
              </HStack>
              <HStack spacing="4" mb={2}>
                <Box w="100%">
                  <FormControl>
                    <FormLabel htmlFor="dataConsulta">
                      Data da Consulta
                    </FormLabel>
                    <Input
                      id="dataConsulta"
                      type="datetime-local"
                      {...register("dataConsulta")}
                    />
                    {errors && errors.dataConsulta && (
                      <FormHelperText color="red">
                        {errors.dataConsulta.message &&
                          errors.dataConsulta.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box w="100%">
                  <FormControl>
                    <FormLabel htmlFor="Tefone">Especialidade</FormLabel>
                    <Select
                      placeholder="Selecione a especialidade"
                      {...register("especialidade")}
                      onChange={(e) => setIdEspecialidade(e.target.value)}
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
                </Box>
              </HStack>
              <HStack spacing="4" mb={2}>
                <Box w="100%">
                  <FormControl>
                    <FormLabel htmlFor="endereco">Profissional</FormLabel>
                    <Select
                      placeholder="Selecione o profissional"
                      {...register("profissional")}
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
                    <FormLabel htmlFor="cidade">Unidade</FormLabel>
                    <Select
                      placeholder="Selecione a unidade"
                      {...register("unidade")}
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
                  {TEXT_BUTTON_MARCAR_CONSULTA}
                </Button>
              </HStack>
            </form>
          </Center>
        </Flex>
      </Box>
    </>
  );
}
