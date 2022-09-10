import { UserService } from "../../domain/services/user.service";
import { AxiosService } from "./axios.service";

const userService: UserService<any> = new AxiosService();

export default userService;
