import { User } from "../interfaces/data.type";
import { hospitals } from "./hospitals";

export const users : User[] = [
    {
        username : 'user1',
        password : '123',
        hospital : hospitals[0]
    },
    {
        username : 'user2',
        password : '123',
        hospital : hospitals[1]
    },
    {
        username : 'user3',
        password : '123',
        hospital : hospitals[2]
    },
    {
        username : 'user4',
        password : '123',
        hospital : hospitals[3]
    }
]