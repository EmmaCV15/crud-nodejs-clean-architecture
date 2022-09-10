import { UserMongooseRepository } from "./user.mongoose.repository";
import { UserRepository } from "../../domain/repositories/User.repository";

const UsersRepository: UserRepository = new UserMongooseRepository();

export default UsersRepository;
