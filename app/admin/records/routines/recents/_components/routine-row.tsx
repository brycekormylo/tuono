"use client";

import { useRoutineList, Routine } from "@/contexts/routine-list";
import { useEffect, useState, useMemo } from "react";
import { LuTrash2, LuPencil, LuEye, LuCheck, LuUndo } from "react-icons/lu";
import Link from "next/link";

interface RoutineRowProps {
  routine: Routine;
}

export default function RoutineRow({ routine }: RoutineRowProps) {
  const { edit, setEdit, remove, selected, setSelected } = useRoutineList();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    selected && setIsExpanded(selected.id == routine.id);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDeleteMode(false);
  }, [isExpanded]);

  const handleClick = () => {
    if (selected?.id == routine.id) {
      setSelected(null);
    } else {
      setSelected(routine);
    }
  };

  const handleDelete = () => {
    setDeleteMode(false);
    const selectedRow = selected;
    setSelected(null);
    selectedRow && remove(selectedRow);
  };

  const handleEdit = () => {
    setEdit(true);
    setSelected(routine);
    setIsExpanded(false);
  };

  return (
    <div className="w-full h-14 stack">
      <div className="flex z-10 w-full">
        <div className="grid group h-14 w-full rounded-md overflow-clip bg-transparent grid-cols-[1fr,2fr,1.5fr] items-center">
          <div
            className={`flex col-start-1 row-start-1 justify-self-start items-center w-full h-full group-hover:bg-gray-200 ps-4 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
          >
            <h2 className="text-lg font-medium select-none">{routine.name}</h2>
          </div>
          <div
            className={`flex flex-wrap col-start-2 row-start-1 gap-2 justify-end pe-2 items-center w-full h-full  group-hover:bg-gray-200 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
          ></div>
          <div
            className={`${isExpanded ? " pe-[10rem]" : ""} flex col-start-3 row-start-1 gap-2 justify-end  w-full h-full justify-items-end items-center min-w-40`}
          >
            <div
              className={`flex gap-2 justify-end items-center w-full h-full group-hover:bg-gray-200 pe-4 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
            ></div>
          </div>
          <button
            className={`${isExpanded ? "me-[10rem]" : ""} col-start-1 col-end-4 row-start-1 h-full grow bg-transparent`}
            onMouseDown={handleClick}
          />
        </div>
      </div>

      <div
        className={`${isExpanded ? "z-10" : "z-0"} flex justify-evenly justify-self-end items-center h-full rounded-r-md bg-gray-300/75 min-w-[10rem]`}
      >
        {deleteMode ? (
          <>
            <button onClick={() => setDeleteMode(false)}>
              <LuUndo size={24} />
            </button>
            <div>
              <label className="text-sm text-wrap">Delete?</label>
            </div>
            <button onClick={handleDelete} className="text-red-500">
              <LuTrash2 size={24} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setDeleteMode(true)}
              className="text-red-500"
            >
              <LuTrash2 size={24} />
            </button>
            <button onClick={handleEdit} className="">
              <LuPencil size={24} />
            </button>
            <Link href={"/routines"} className="">
              <LuEye size={24} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
