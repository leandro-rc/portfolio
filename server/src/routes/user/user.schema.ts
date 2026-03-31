import { Type } from '@sinclair/typebox';

const UserSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    email: Type.String(),
});

const UsersResponseSchema = Type.Object({
    message: Type.String(),
    users: Type.Array(UserSchema),
});

export { UserSchema, UsersResponseSchema };
