import React from "react";
import type { FC } from "react";
import { createBringElement } from "../render";
import { useBringContext } from "../context/bring-context";

export const PostContent: FC = () => {
  const { entityContent, componentMap } = useBringContext();
  return <>{createBringElement(entityContent.main, componentMap)}</>;
};

export const postContent = {
  Component: PostContent,
  componentName: "PostContent",
};
