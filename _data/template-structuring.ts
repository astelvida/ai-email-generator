import { nanoid } from "nanoid";

export const SAMPLE_TEMPLATE = {
  name: "Root",
  type: "root",
  id: "2358218",
  rows: [
    {
      uuid: "0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5",
      id: "row-0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5",
      style: {},
      type: "one-column-empty", // ENDS IN EMPTY
      columns: [
        {
          uuid: "0947b2c1-9d51-43de-8464-970e95afb7f9",
          id: "column-0947b2c1-9d51-43de-8464-970e95afb7f9",
          type: "column",
          style: {},
          gridColumn: 12, // has grid-columns
          blocks: [
            {
              id: "block-0947b2c1-9d51-43de-8464-970e95afb7f9",
              label: "Heading",
              type: "block-heading",
              descriptor: {
                text: "HEADING TEXT",
              },
              style: {},
            },
            {
              label: "Paragraph",
              type: "block-paragraph",
              descriptor: {
                text: "PARAGRAPH TEXT",
              },
              style: {},
              id: "block-39bdf784-e4ac-4bce-a2d9-3c77fe3083fa",
            },
            {
              label: "Button",
              type: "block-button",
              descriptor: {
                text: "BUTTON TEXT",
              },
              style: {},
              id: "block-214597b0-5b56-40ae-bdce-c5b6617f281c",
            },
          ],
        },
      ],
    },
    {
      style: {},
      type: "three-columns-empty",
      id: "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499",
      columns: [
        {
          type: "column",
          gridColumn: 4,
          blocks: [],
          style: {},
          id: "column-b0151db5-9525-42ad-b9b0-6baf37693d1f",
        },
        {
          type: "column",
          gridColumn: 4,
          blocks: [],
          style: {},
          id: "column-fce8bc42-25e9-44d8-9fbf-3ea7bce2fa17",
        },
        {
          type: "column",
          gridColumn: 4,
          blocks: [],
          style: {},
          id: "column-581f6452-749b-4ebb-aa62-70c36551c65e",
        },
      ],
    },
    {
      style: {},
      id: "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d",
      type: "three-columns-6-3-3-empty",
      columns: [
        {
          type: "column",
          gridColumn: 6,
          blocks: [
            {
              label: "Heading",
              type: "block-heading",
              descriptor: {
                text: "HEADING TEXT",
              },
              style: {},
              id: "block-9f078046-1abf-4b97-8609-2db631e867e4",
            },
          ],
          style: {},
          id: "column-9f058046-1abf-4b97-8609-2db631e8a67e3",
        },
        {
          type: "column",
          gridColumn: 3,
          blocks: [
            {
              label: "Heading",
              type: "block-heading",
              descriptor: {
                text: "HEADING TEXT",
              },
              style: {},
              id: "block-20e23ba1-77e2-4d35-bef8-a5f30878a076",
            },
            {
              label: "Paragraph",
              type: "block-paragraph",
              descriptor: {
                text: "PARAGRAPH TEXT",
              },
              style: {},
              id: "block-01678773-0417-4c91-8bfa-68eadd2db8d3",
            },
          ],
          style: {},
          id: "column-20e23ba1-77e2-4d35-bef8-a5f30878a076",
        },
        {
          gridColumn: 3,
          type: "column",
          blocks: [
            {
              label: "Button",
              type: "block-button",
              descriptor: {
                text: "BUTTON TEXT",
              },
              style: {},
              id: "block-01678773-0417-4c91-8bfa-68eadd2db8r4",
            },
          ],
          style: {},
          id: "column-01678773-0417-4c91-8bfa-68eadd2db8d3",
        },
      ],
    },
  ],
};

function normalizeTemplate(obj) {
  const SAMPLE_TEMPLATE_NORMALIZED = {
    root: {
      id: "root",
      type: "root",
      index: 0,
      depth: 0,
      childrenIds: obj.rows.map((row) => row.id),
    },
  };

  obj.rows.forEach(({ columns, type, ...row }, index) => {
    // const rowId = `${nanoid()}-row`;
    SAMPLE_TEMPLATE_NORMALIZED[row.id] = {
      type: `layout-${type}`,
      index: index,
      depth: 1,
      ...row,
      parentId: "root",
      childrenIds: columns.map((column) => column.id),
    };

    columns.forEach(({ type, blocks, ...column }, index) => {
      SAMPLE_TEMPLATE_NORMALIZED[column.id] = {
        type: type || "column",
        index: index,
        depth: 2,
        ...column,
        parentId: row.id,
        childrenIds: blocks.map((block) => block.id),
      };

      blocks.forEach(({ type, ...block }, index) => {
        SAMPLE_TEMPLATE_NORMALIZED[block.id] = {
          type: type,
          index: index,
          depth: 3,
          ...block,
          parentId: column.id,
        };
      });
    });
  });
  return SAMPLE_TEMPLATE_NORMALIZED;
}

export const SAMPLE_TEMPLATE_NORMALIZED = {
  root: {
    id: "root",
    type: "root",
    index: 0,
    depth: 0,
    childrenIds: [
      "row-0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5",
      "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499",
      "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d",
    ],
  },
  "row-0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5": {
    type: "layout-one-column-empty",
    index: 0,
    depth: 1,
    uuid: "0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5",
    id: "row-0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5",
    style: {},
    parentId: "root",
    childrenIds: ["column-0947b2c1-9d51-43de-8464-970e95afb7f9"],
  },
  "column-0947b2c1-9d51-43de-8464-970e95afb7f9": {
    type: "column",
    index: 0,
    depth: 2,
    uuid: "0947b2c1-9d51-43de-8464-970e95afb7f9",
    id: "column-0947b2c1-9d51-43de-8464-970e95afb7f9",
    style: {},
    gridColumn: 12,
    parentId: "row-0922fb70-f97e-4ae8-bcfe-0be9fd09a0d5",
    childrenIds: [
      "block-0947b2c1-9d51-43de-8464-970e95afb7f9",
      "block-39bdf784-e4ac-4bce-a2d9-3c77fe3083fa",
      "block-214597b0-5b56-40ae-bdce-c5b6617f281c",
    ],
  },
  "block-0947b2c1-9d51-43de-8464-970e95afb7f9": {
    type: "block-heading",
    index: 0,
    depth: 3,
    id: "block-0947b2c1-9d51-43de-8464-970e95afb7f9",
    label: "Heading",
    descriptor: { text: "HEADING TEXT" },
    style: {},
    parentId: "column-0947b2c1-9d51-43de-8464-970e95afb7f9",
  },
  "block-39bdf784-e4ac-4bce-a2d9-3c77fe3083fa": {
    type: "block-paragraph",
    index: 1,
    depth: 3,
    label: "Paragraph",
    descriptor: { text: "PARAGRAPH TEXT" },
    style: {},
    id: "block-39bdf784-e4ac-4bce-a2d9-3c77fe3083fa",
    parentId: "column-0947b2c1-9d51-43de-8464-970e95afb7f9",
  },
  "block-214597b0-5b56-40ae-bdce-c5b6617f281c": {
    type: "block-button",
    index: 2,
    depth: 3,
    label: "Button",
    descriptor: { text: "BUTTON TEXT" },
    style: {},
    id: "block-214597b0-5b56-40ae-bdce-c5b6617f281c",
    parentId: "column-0947b2c1-9d51-43de-8464-970e95afb7f9",
  },
  "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499": {
    type: "layout-three-columns-empty",
    index: 1,
    depth: 1,
    style: {},
    id: "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499",
    parentId: "root",
    childrenIds: [
      "column-b0151db5-9525-42ad-b9b0-6baf37693d1f",
      "column-fce8bc42-25e9-44d8-9fbf-3ea7bce2fa17",
      "column-581f6452-749b-4ebb-aa62-70c36551c65e",
    ],
  },
  "column-b0151db5-9525-42ad-b9b0-6baf37693d1f": {
    type: "column",
    index: 0,
    depth: 2,
    gridColumn: 4,
    style: {},
    id: "column-b0151db5-9525-42ad-b9b0-6baf37693d1f",
    parentId: "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499",
    childrenIds: [],
  },
  "column-fce8bc42-25e9-44d8-9fbf-3ea7bce2fa17": {
    type: "column",
    index: 1,
    depth: 2,
    gridColumn: 4,
    style: {},
    id: "column-fce8bc42-25e9-44d8-9fbf-3ea7bce2fa17",
    parentId: "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499",
    childrenIds: [],
  },
  "column-581f6452-749b-4ebb-aa62-70c36551c65e": {
    type: "column",
    index: 2,
    depth: 2,
    gridColumn: 4,
    style: {},
    id: "column-581f6452-749b-4ebb-aa62-70c36551c65e",
    parentId: "row-6f1d7cd5-9daf-4684-a35e-0b8e7bfa7499",
    childrenIds: [],
  },
  "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d": {
    type: "layout-three-columns-6-3-3-empty",
    index: 2,
    depth: 1,
    style: {},
    id: "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d",
    parentId: "root",
    childrenIds: [
      "column-9f058046-1abf-4b97-8609-2db631e8a67e3",
      "column-20e23ba1-77e2-4d35-bef8-a5f30878a076",
      "column-01678773-0417-4c91-8bfa-68eadd2db8d3",
    ],
  },
  "column-9f058046-1abf-4b97-8609-2db631e8a67e3": {
    type: "column",
    index: 0,
    depth: 2,
    gridColumn: 6,
    style: {},
    id: "column-9f058046-1abf-4b97-8609-2db631e8a67e3",
    parentId: "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d",
    childrenIds: ["block-9f078046-1abf-4b97-8609-2db631e867e4"],
  },
  "block-9f078046-1abf-4b97-8609-2db631e867e4": {
    type: "block-heading",
    index: 0,
    depth: 3,
    label: "Heading",
    descriptor: { text: "HEADING TEXT" },
    style: {},
    id: "block-9f078046-1abf-4b97-8609-2db631e867e4",
    parentId: "column-9f058046-1abf-4b97-8609-2db631e8a67e3",
  },
  "column-20e23ba1-77e2-4d35-bef8-a5f30878a076": {
    type: "column",
    index: 1,
    depth: 2,
    gridColumn: 3,
    style: {},
    id: "column-20e23ba1-77e2-4d35-bef8-a5f30878a076",
    parentId: "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d",
    childrenIds: [
      "block-20e23ba1-77e2-4d35-bef8-a5f30878a076",
      "block-01678773-0417-4c91-8bfa-68eadd2db8d3",
    ],
  },
  "block-20e23ba1-77e2-4d35-bef8-a5f30878a076": {
    type: "block-heading",
    index: 0,
    depth: 3,
    label: "Heading",
    descriptor: { text: "HEADING TEXT" },
    style: {},
    id: "block-20e23ba1-77e2-4d35-bef8-a5f30878a076",
    parentId: "column-20e23ba1-77e2-4d35-bef8-a5f30878a076",
  },
  "block-01678773-0417-4c91-8bfa-68eadd2db8d3": {
    type: "block-paragraph",
    index: 1,
    depth: 3,
    label: "Paragraph",
    descriptor: { text: "PARAGRAPH TEXT" },
    style: {},
    id: "block-01678773-0417-4c91-8bfa-68eadd2db8d3",
    parentId: "column-20e23ba1-77e2-4d35-bef8-a5f30878a076",
  },
  "column-01678773-0417-4c91-8bfa-68eadd2db8d3": {
    type: "column",
    index: 2,
    depth: 2,
    gridColumn: 3,
    style: {},
    id: "column-01678773-0417-4c91-8bfa-68eadd2db8d3",
    parentId: "row-6ffee72d-8ec1-4db3-bdfd-b92e9d5e155d",
    childrenIds: ["block-01678773-0417-4c91-8bfa-68eadd2db8r4"],
  },
  "block-01678773-0417-4c91-8bfa-68eadd2db8r4": {
    type: "block-button",
    index: 0,
    depth: 3,
    label: "Button",
    descriptor: { text: "BUTTON TEXT" },
    style: {},
    id: "block-01678773-0417-4c91-8bfa-68eadd2db8r4",
    parentId: "column-01678773-0417-4c91-8bfa-68eadd2db8d3",
  },
};

// const buildTree = ({ childrenIds, ...currNode }) => {
//   if (!childrenIds || childrenIds.length === 0) {
//     return currNode;
//   }

//   const children = [];

//   for (const currChildId of childrenIds) {
//     const result = buildTree(HASH[currChildId]);
//     children.push(result);
//   }

//   return { ...currNode, children };
// };

// function buildArray(data) {
//   const nodes = [];

//   // Convert object to array and keep track of child relationships
//   for (const key in data) {
//     const node = { ...data[key] };
//     if (node.childrenIds) {
//       node.children = node.childrenIds;
//       delete node.childrenIds;
//     }
//     nodes.push(node);
//   }

//   return nodes;
// }

// // Example usage
// // const result = buildTree(HASH["root"]);
// // console.log(JSON.stringify(result, null, 2));
// // const array = buildArray(result.children);
// // console.log(JSON.stringify(array, null, 2));

// const kschd = {
//   rows: "children",
//   columns: "children",
//   modules: "children",
// };

// function dfs(currentNode) {
//   const visited = {};

//   const nodesList = [];
//   const stack = [];

//   stack.push(currentNode);

//   while (stack.length) {
//     const nextNode = stack.pop();

//     if (visited[nextNode.uuid]) {
//       continue;
//     }

//     visited[nextNode.uuid] = true;

//     const key =
//       "children" in nextNode
//         ? "children"
//         : "rows" in nextNode
//           ? "rows"
//           : "columns" in nextNode
//             ? "columns"
//             : "modules" in nextNode
//               ? "modules"
//               : null;

//     if (!key) {
//       continue;
//     }

//     nodesList.push(nextNode);
//     console.log(key, nextNode[key]?.length, nextNode.uuid);

//     for (let i = nextNode[key].length - 1; i >= 0; i--) {
//       stack.push(nextNode[key][i]);
//     }
//   }

//   console.log("nodesList", nodesList);

//   console.log("visited", visited);
//   return nodesList;
// }
