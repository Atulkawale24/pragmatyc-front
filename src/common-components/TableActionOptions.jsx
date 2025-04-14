import React from "react";

const TableActionOptions = ({ data }) => {
  const {
    actionOptions,
    selectedAction,
    setSelectedAction,
    toggleAction,
    setToggleAction,
  } = data;
  return (
    <div className="absolute top-0 mr-40 bg-white p-1 shadow-md rounded">
      {actionOptions?.map((ele, index) => {
        return (
          <button
            className={`flex items-center gap-2 my-1 w-full py-0.5 px-3 rounded-sm ${
              selectedAction === ele?.name ? "bg-blue" : "bg-white"
            } ${selectedAction === ele?.name ? "text-white" : "text-black"}`}
            style={{ fontSize: 15 }}
            onClick={() => {
              setSelectedAction(ele?.name);
              setToggleAction({ ...toggleAction, state: !toggleAction?.state });
            }}
            key={index}
          >
            {ele?.icon}
            {ele?.name}
          </button>
        );
      })}
    </div>
  );
};

export default TableActionOptions;
