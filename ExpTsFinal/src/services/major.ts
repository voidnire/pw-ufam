import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major';

const prisma = new PrismaClient();

export const getAllMajors = async (): Promise<Major[]> => {
  console.log('Pegando todos os cursos...');
  return prisma.major.findMany();
};

export const getMajor = async (id: string): Promise<Major | null> => {
  console.log('Buscando curso por ID...', id);
  return await prisma.major.findUnique({
    where: { id },
  });
};

export const createMajor = async (newMajor: UpdateMajorDto): Promise<Major> => {
  console.log('Criando novo curso...', newMajor.name);

  // Verificar se o curso já existe
  const existingMajor = await majorAlreadyExists(newMajor.name);
  if (existingMajor) {
    throw new Error('Curso com este nome já existe');
  }

  return await prisma.major.create({ data: newMajor });
};

export const removeMajor = async (majorId: string): Promise<Major> => {
  const majorToDelete = await prisma.major.findUnique({
    where: { id: majorId },
  });

  if (!majorToDelete) {
    throw new Error('Curso não encontrado');
  }

  const deletedMajor = await prisma.major.delete({
    where: { id: majorId },
  });

  console.log('Removendo curso...', deletedMajor.name);
  return deletedMajor;
};

export const majorAlreadyExists = async (
  name: string,
): Promise<Major | null> => {
  console.log('Verificando se curso já existe...', name);
  return await prisma.major.findFirst({
    where: { name },
  });
};

export const updateMajor = async (
  id: string,
  majorData: UpdateMajorDto,
): Promise<Major> => {
  console.log('Atualizando curso...', id);

  // Verificar se o novo nome já existe (se estiver atualizando o nome)
  if (majorData.name) {
    const existingMajor = await majorAlreadyExists(majorData.name);
    if (existingMajor && existingMajor.id !== id) {
      throw new Error('Já existe outro curso com este nome');
    }
  }

  return await prisma.major.update({
    where: { id },
    data: majorData,
  });
};

//const updateMajor = async (id: string, major: MajorUpdateDto):
//Promise<[affectedCount: number]>
