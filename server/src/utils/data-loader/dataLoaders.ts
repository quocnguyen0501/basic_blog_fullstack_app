import DataLoader from "dataloader";
import { Vote } from "../../models/postgres/Vote.model";
import { In } from "typeorm";
import { User } from "../../models/postgres/User.model";

interface UserLogedInVotedCondition {
    postId: number;
    userId: number;
}

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

// SELECT * FROM Upvote WHERE [postId, userId] IN ([[19, 1], [18, 1], [17, 1]])
const batchGetVoteTypes = async (
    userLogedInVotedConditions: UserLogedInVotedCondition[]
) => {
    const userLogedInVoteds = await Vote.findByIds(userLogedInVotedConditions)
    return userLogedInVotedConditions.map((userLogedInVotedCondition) =>
        userLogedInVoteds.find(
            (userLogedInVoted) =>
                userLogedInVoted.postId === userLogedInVotedCondition.postId &&
                userLogedInVoted.userId === userLogedInVotedCondition.userId
        )
    );
};

export const buildDataLoaders = () => ({
    userLoader: new DataLoader<number, User | undefined>((userIds) =>
        batchGetUsers(userIds as number[])
    ),

    userLogedInVotedLoader: new DataLoader<
        UserLogedInVotedCondition,
        Vote | undefined
    >((userLogedInVotedConditions) =>
        batchGetVoteTypes(
            userLogedInVotedConditions as UserLogedInVotedCondition[]
        )
    ),
});
