import React, { type ReactNode } from "react";
import {
  getDynamicEntityProps,
  type GetDynamicEntityPropsOptions,
  type GetDynamicEntityPropsParams,
} from "../content";
import type { DynamicEntityProps, EntityType } from "../types";
import Debug from "./debug";

export type DynamicEntityPropsRenderProps<T = {}, P = {}> = {
  entityProps: DynamicEntityProps<T>;
  params?: GetDynamicEntityPropsParams<P>;
};

export type EntityProps<T, P> = {
  entityId?: number;
  entityType?: EntityType;
  options?: GetDynamicEntityPropsOptions;
  Render?: (props: DynamicEntityPropsRenderProps<T, P>) => ReactNode;
};

function makeDynamicEntity(wpURL: string) {
  const DynamicEntity = async <T = {}, P = {}>({
    entityId = 0,
    entityType = "post",
    options = {},
    Render = (props) => (
      <div className="border">
        <Debug value={props} />
      </div>
    ),
  }: EntityProps<T, P>) => {
    const { entityProps, params } = await getDynamicEntityProps<T, P>(
      wpURL,
      entityId,
      entityType,
      options,
    );
    if (!entityProps) {
      return null;
    }

    return <Render entityProps={entityProps} params={params} />;
  };

  return DynamicEntity;
}

export default makeDynamicEntity;
