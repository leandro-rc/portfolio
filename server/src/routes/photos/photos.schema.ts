import { Type } from "@sinclair/typebox";

export const Photo = Type.Object({
  id: Type.String(),
  url: Type.String(),
  title: Type.Optional(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const PhotosResponse = Type.Object({
  message: Type.String(),
  photos: Type.Array(Photo),
});
