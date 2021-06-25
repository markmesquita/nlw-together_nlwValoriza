import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentsRequest {
  tag_id: string;
  user_sender: string;
  user_receiver:string;
  message: string;
}

class CreateComplimentService {
  async execute ({ tag_id, user_sender, user_receiver, message }: IComplimentsRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    if (!user_receiver) {
      throw new Error("Incorrect user receiver");
    }

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver");
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if(!userReceiverExists) {
      throw new Error("User receiver does not exists");
    }

    const compliments = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsRepositories.save(compliments);

    return compliments;

  }
}

export { CreateComplimentService }