import React, { ReactNode } from "react";

export default function TableWrapper({
  filterSection,
  tableSection,
}: {
  filterSection?: ReactNode;
  tableSection: ReactNode;
}) {
  return (
    <>
      <div className="mt-6">
        {filterSection && filterSection}
        <div className="mt-6 overflow-x-scroll">{tableSection}</div>
      </div>
    </>
  );
}
