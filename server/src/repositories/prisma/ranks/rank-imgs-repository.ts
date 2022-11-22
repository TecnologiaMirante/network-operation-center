import { prisma } from "../../../prisma";
import { RankImgCreateData, RankImgsRepository,RankImgDelete, RankImgUpdate } from "../../interfaces/ranks/rank-imgs-repository";

export class PrismaRanksRepository implements RankImgsRepository {

  async create( { first, second, third }: RankImgCreateData ) {
    return await prisma.rank_img.create({
      data: {
        first,
        second,
        third
      }
    })
  };

  async get() {
    const rank_img = await prisma.rank_img.findMany();
    return rank_img;
  }

  async delete({ id }: RankImgDelete) {
    await prisma.rank_img.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, first, second, third }: RankImgUpdate) {
    await prisma.rank_img.update({
      where: {
        id
      },
      data: {
        first,
        second,
        third
      }
    })
  };
}