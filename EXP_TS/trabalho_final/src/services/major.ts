import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major';

const prisma = new PrismaClient();

export const getAllMajors = async (): Promise<Major[]> => {
  console.log('Pegando todos os cursos...');
  return prisma.major.findMany();
};

export const createMajor = async (newMajor: UpdateMajorDto): Promise<Major> => {
  console.log('Criando novo curso...', newMajor.name);

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

///to do
//const majorAlreadyExists = async (name: string): Promise<boolean>
//const getMajor = async (id: string): Promise<Major>
//const updateMajor = async (id: string, major: MajorUpdateDto):
//Promise<[affectedCount: number]>
//const removeMajor = async (id: string): Promise<number>
