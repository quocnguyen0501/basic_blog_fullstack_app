import DataLoader from "dataloader";
import { In } from "typeorm";
import { User } from "../../models/User.model";

/**
 *
 * @param userIds: [1, 1, 2, ...]
 * @returns [{id: 1}, {id: 1}, {id: 2}, ...]
 */
const batchGetUsers = async (userIds: number[]) => {
    const users = await User.find({
        where: {
            id: In(userIds),
        },
    });

    return userIds.map((userId) => users.find((user) => user.id === userId));
};

export const buildDataLoaders = () => ({
	userLoader: new DataLoader<number, User | undefined>(userIds =>
		batchGetUsers(userIds as number[])
	),
})