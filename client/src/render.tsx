import React, { FC } from "react";
import type { BringNode } from "./types";

interface ErrorComponentInterface {
  name: string;
}

const Error: FC<ErrorComponentInterface> = ({ name }) => (
  <div>Error while rendering {name}</div>
);

export function createBringElement(
  nodes: BringNode[],
  componentMap: Map<string, FC<any>>,
  isPostContentAllowed: boolean = false
): (
  | React.FunctionComponentElement<ErrorComponentInterface>
  | React.DetailedReactHTMLElement<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
)[] {
  let result = [];
  for (const node of nodes) {
    // check if component is a function
    const component = componentMap.get(node.component);

    if (component === undefined) {
      result.push(
        React.createElement(Error, { name: node.component, key: node.key }, [])
      );
      console.log(
        'Component is not a function, inserting "Error" component instead...'
      );
      continue;
    }

    // render children
    let children: (
      | React.FunctionComponentElement<ErrorComponentInterface>
      | React.DetailedReactHTMLElement<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >
    )[] = [];
    if (node.children?.length) {
      children = createBringElement(
        node.children,
        componentMap,
        isPostContentAllowed
      );
    }

    // if PostContent is not allowed skip PostContent
    if (!isPostContentAllowed && node.component === "PostContent") {
      continue;
    }

    // create and push element
    result.push(
      React.createElement(component, { key: node.key, ...node.props }, children)
    );
  }

  return result;
}
