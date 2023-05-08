import { prisma } from "../../../prisma";
import { TagCreateData, TagDelete, TagFind, TagFindByName, TagsRepository, TagUpdate} from "../../interfaces/tags/tags-repository";

export class PrismaTagsRepository implements TagsRepository {
  
  async create({ name }: TagCreateData) {
    return await prisma.tag.create({
      data: {
        name,
      }
    });
  };

  async get() {
    const tags = await prisma.tag.findMany();
    return tags;
  };

  async find({ id }: TagFind ) {
    const tag = await prisma.tag.findUnique(
      {
        where: {
          id,
        }
      }
    );
    return tag;
  };

  async findByName({ name}: TagFindByName) {
    return await prisma.tag.findFirst(
      {
        where: {
          name,
        }
      }
    )
  }

  async delete({ id }: TagDelete){
    await prisma.tag.delete({
      where: {
        id,
      }
    });
  };

  async update({ id, name }: TagUpdate){
    await prisma.tag.update({
      where: {
        id,
      },
      data: {
        name,
      }
    })
  };

}